import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/lib/i18n";
import { BirthdayFlow } from "./BirthdayFlow";
import { NightStage } from "./NightStage";

vi.mock("./ui", () => ({ Img: () => null }));

function media(initial: boolean) {
  const listeners = new Set<() => void>();
  const mq = {
    matches: initial,
    addEventListener: vi.fn((_event: string, fn: () => void) => listeners.add(fn)),
    removeEventListener: vi.fn((_event: string, fn: () => void) => listeners.delete(fn)),
  };
  vi.stubGlobal("matchMedia", () => mq);
  return {
    mq,
    change(matches: boolean) {
      mq.matches = matches;
      act(() => listeners.forEach((fn) => fn()));
    },
  };
}

function visibleObserver() {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(private callback: (entries: { isIntersecting: boolean }[]) => void) {}
      observe() {
        this.callback([{ isIntersecting: true }]);
      }
      disconnect = vi.fn();
    },
  );
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("live motion preferences", () => {
  it("allows pointer and keyboard stage selection with reduced motion without scheduling animation", () => {
    media(true);
    visibleObserver();
    const raf = vi.fn();
    vi.stubGlobal("requestAnimationFrame", raf);
    const { container } = render(
      <LocaleProvider>
        <BirthdayFlow />
      </LocaleProvider>,
    );
    const tabs = screen.getAllByRole("tab");
    const first = tabs[0];
    const second = tabs[1];
    const final = tabs[3];
    if (!first || !second || !final) throw new Error("Missing stage controls");
    expect(final).toHaveAttribute("aria-selected", "true");
    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(second).toHaveAttribute("aria-selected", "true");
    expect(second).toHaveFocus();
    expect(container.querySelector(".birthday-flow")).toHaveAttribute("data-running", "false");
    expect(raf).not.toHaveBeenCalled();
  });

  it("clears scene properties, cancels a queued frame and blocks updates on a live preference change", () => {
    const preference = media(true);
    visibleObserver();
    let callback: FrameRequestCallback | undefined;
    const raf = vi.fn((fn: FrameRequestCallback) => {
      callback = fn;
      return 42;
    });
    const cancel = vi.fn();
    vi.stubGlobal("requestAnimationFrame", raf);
    vi.stubGlobal("cancelAnimationFrame", cancel);
    const { container, unmount } = render(<NightStage>Content</NightStage>);
    const scene = container.querySelector("section");
    if (!scene) throw new Error("Missing night scene");
    fireEvent.pointerMove(scene, { clientX: 100, clientY: 100 });
    act(() => callback?.(0));
    fireEvent.scroll(window);
    expect(scene.style.getPropertyValue("--scene-x")).not.toBe("");
    expect(scene.style.getPropertyValue("--scene-scroll")).not.toBe("");
    fireEvent.pointerMove(scene);
    preference.change(false);
    expect(cancel).toHaveBeenCalledWith(42);
    for (const prop of ["--scene-x", "--scene-y", "--scene-scroll"])
      expect(scene.style.getPropertyValue(prop)).toBe("");
    // Even an already queued callback cannot write stale motion values.
    act(() => callback?.(0));
    raf.mockClear();
    fireEvent.pointerMove(scene);
    fireEvent.scroll(window);
    expect(raf).not.toHaveBeenCalled();
    expect(scene.style.getPropertyValue("--scene-x")).toBe("");
    preference.change(true);
    fireEvent.pointerMove(scene);
    expect(raf).toHaveBeenCalledTimes(1);
    unmount();
    expect(preference.mq.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    raf.mockClear();
    fireEvent.pointerMove(scene);
    fireEvent.scroll(window);
    expect(raf).not.toHaveBeenCalled();
  });
});
