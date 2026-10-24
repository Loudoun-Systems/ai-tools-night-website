import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/lib/i18n";
import { InquiryForm } from "./InquiryForm";

const kinds = ["contact", "cohost-speaker", "host-an-event", "invite-us"] as const;
const ui = (initial: (typeof kinds)[number] = "contact") => (
  <LocaleProvider>
    <InquiryForm kinds={[...kinds]} initial={initial} />
  </LocaleProvider>
);
function fill() {
  fireEvent.change(screen.getByLabelText(/First name/), { target: { value: "Alex" } });
  fireEvent.change(screen.getByLabelText(/Last name/), { target: { value: "Example" } });
  fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: "alex@example.com" } });
  fireEvent.change(screen.getByLabelText(/^Message/), {
    target: { value: "A test message here." },
  });
}
afterEach(() => vi.unstubAllGlobals());

describe("InquiryForm (no real sends)", () => {
  it("keeps typed values when the intent changes, including via URL (prop) change", () => {
    const { rerender } = render(ui());
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Co-host or speak" }));
    expect((screen.getByLabelText(/^Message/) as HTMLTextAreaElement).value).toBe(
      "A test message here.",
    );
    rerender(ui("invite-us"));
    expect(
      screen.getByRole("button", { name: "Invite us to your team" }).getAttribute("aria-pressed"),
    ).toBe("true");
    expect((screen.getByLabelText(/First name/) as HTMLInputElement).value).toBe("Alex");
  });
  it("locks fields and intent tabs while pending and keeps values on failure", async () => {
    let resolve: (r: Response) => void = () => {};
    const fetchMock = vi.fn(() => new Promise<Response>((r) => (resolve = r)));
    vi.stubGlobal("fetch", fetchMock);
    render(ui());
    fill();
    const form = screen.getByLabelText(/^Message/).closest("form");
    if (!form) throw new Error("Missing inquiry form");
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(
      (screen.getByLabelText(/First name/) as HTMLInputElement).closest("fieldset")?.disabled,
    ).toBe(true);
    expect(
      (screen.getByRole("button", { name: "Co-host or speak" }) as HTMLButtonElement).disabled,
    ).toBe(true);
    const body = JSON.parse(
      (fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1].body as string,
    );
    expect(body).not.toHaveProperty("subject");
    expect(body).not.toHaveProperty("to");
    await act(async () => {
      resolve(new Response(JSON.stringify({ ok: false, error: "unavailable" }), { status: 503 }));
    });
    expect(screen.getByRole("status").textContent).toMatch(/temporarily unavailable/);
    expect((screen.getByLabelText(/^Message/) as HTMLTextAreaElement).value).toBe(
      "A test message here.",
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
