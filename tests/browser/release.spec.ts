import { test, expect } from "@playwright/test";

for (const route of [
  "/",
  "/about",
  "/prompt-library",
  "/careers",
  "/contact",
  "/events/build-your-first-ai-automation-2026-11-08",
]) {
  test(`EN/ES responsive route ${route}`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
    for (const language of ["English", "Español"]) {
      await page.getByRole("button", { name: language, exact: true }).click();
      await expect(page.locator("main h1")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      expect(
        await page
          .locator("img")
          .evaluateAll((imgs) =>
            (imgs as HTMLImageElement[])
              .filter((i) => i.complete && i.naturalWidth === 0)
              .map((i) => i.alt),
          ),
      ).toEqual([]);
      await page.screenshot({ path: testInfo.outputPath(`${language}-top.png`) });
    }
    expect(errors).toEqual([]);
  });
}

test("form intent changes preserve text, without sending", async ({ page }) => {
  let requests = 0;
  await page.route("**/api/public/inquiry", async (route) => {
    requests++;
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, error: "unavailable" }),
    });
  });
  await page.goto("/contact");
  await page.getByRole("textbox", { name: "First name", exact: true }).fill("QA");
  await page.getByRole("textbox", { name: "Last name", exact: true }).fill("Only");
  await page.getByRole("textbox", { name: "Email", exact: true }).fill("qa@example.com");
  await page
    .getByRole("textbox", { name: "Message", exact: true })
    .fill("This is a simulated browser check with no email send.");
  await page.getByRole("button", { name: "Invite us to your team", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "First name", exact: true })).toHaveValue("QA");
  await expect(page.getByRole("textbox", { name: "Message", exact: true })).toHaveValue(
    "This is a simulated browser check with no email send.",
  );
  expect(requests).toBe(0);
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(/not available|unavailable|could not/i);
  await expect(page.getByRole("textbox", { name: "First name", exact: true })).toHaveValue("QA");
  expect(requests).toBe(1);
});

test("brand discovery preserves prompt workflows", async ({ page }) => {
  await page.goto("/prompt-library");
  await expect(page.getByText("Showing 37 of 37", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Our brands", exact: true }).click();
  await page.getByRole("tab", { name: "NoRepSales", exact: true }).click();
  await expect(page.getByRole("link", { name: /Visit NoRepSales/ })).toHaveAttribute(
    "href",
    "https://norepsales.com/",
  );
  await page.getByRole("button", { name: "Prompt workflows", exact: true }).click();
  await expect(page.getByText("Showing 37 of 37", { exact: true })).toBeVisible();
});

test("normal motion repeats the birthday sequence and rotates posters", async ({
  page,
}, testInfo) => {
  test.skip(
    !["desktop", "mobile"].includes(testInfo.project.name),
    "Normal-motion timing at desktop/mobile",
  );
  test.setTimeout(100_000);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const flow = page.locator(".birthday-flow");
  await flow.scrollIntoViewIfNeeded();
  await expect(flow).toHaveAttribute("data-running", "true");
  await expect(flow.getByRole("button", { name: /pause|replay/i })).toHaveCount(0);
  await expect(page.getByText(/Example workflow|fictional data/i)).toHaveCount(0);
  await expect(flow.getByRole("tab", { name: /04 Email draft/ })).toHaveAttribute(
    "aria-selected",
    "true",
    { timeout: 35_000 },
  );
  await page.screenshot({ path: testInfo.outputPath("birthday-normal-final.png") });
  await expect(flow.getByRole("tab", { name: /01 Spreadsheet row/ })).toHaveAttribute(
    "aria-selected",
    "true",
    { timeout: 18_000 },
  );
  await flow.getByRole("tab", { name: /01 Spreadsheet row/ }).press("ArrowRight");
  await expect(flow).toHaveAttribute("data-running", "false");
  await expect(flow.getByRole("tab", { name: /02 Selected photo/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await expect(flow).toHaveAttribute("data-running", "true");
  await page.goto("/about");
  const poster = page.locator(".poster-carousel");
  await poster.scrollIntoViewIfNeeded();
  await page.mouse.move(1, 1);
  await expect(poster).toHaveAttribute("data-autoplay", "true");
  const initial = await poster.locator("img[data-active='true']").getAttribute("src");
  await expect
    .poll(() => poster.locator("img[data-active='true']").getAttribute("src"), { timeout: 20_000 })
    .not.toBe(initial);
  const frame = await poster.locator(".poster-frame").boundingBox();
  const controls = await poster.locator(".poster-controls").boundingBox();
  expect(frame).not.toBeNull();
  expect(controls).not.toBeNull();
  expect(controls!.y).toBeGreaterThanOrEqual(frame!.y + frame!.height - 1);
  await page.screenshot({ path: testInfo.outputPath("poster-normal-autoplay.png") });
});

test("reduced motion permits manual workflow selection", async ({ page }) => {
  await page.goto("/");
  const flow = page.locator(".birthday-flow");
  await flow.scrollIntoViewIfNeeded();
  await expect(flow).toHaveAttribute("data-running", "false");
  await flow.getByRole("tab", { name: /01 Spreadsheet row/ }).click();
  await expect(flow.getByRole("tab", { name: /01 Spreadsheet row/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await flow.getByRole("tab", { name: /01 Spreadsheet row/ }).press("ArrowRight");
  await expect(flow.getByRole("tab", { name: /02 Selected photo/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});
