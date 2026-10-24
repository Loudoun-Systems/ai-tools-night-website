import { describe, expect, it } from "vitest";
import { prompts } from "@/content/prompts-tracks";
import { promptFamilies, inFamily } from "@/content/prompt-families";
import { filterPrompts } from "@/content/prompt-helpers";
import { events, images, WORKSHOP_SLUG, legacyEventSlugs } from "@/content/site";
import { workshop } from "@/content/workshop-data";
import { readSaved, toggleSavedIn, SAVED_PROMPTS_KEY } from "@/lib/saved-prompts";

describe("WGN release rules", () => {
  it("keeps all 37 prompts in exactly one of eight presentation families", () => {
    expect(prompts).toHaveLength(37);
    expect(promptFamilies).toHaveLength(8);
    for (const prompt of prompts)
      expect(promptFamilies.filter((f) => inFamily(prompt, f.key))).toHaveLength(1);
    expect(promptFamilies.map((f) => prompts.filter((p) => inFamily(p, f.key)).length)).toEqual([
      5, 6, 5, 5, 4, 4, 4, 4,
    ]);
  });
  it("combines canonical category, search and Saved rather than replacing them", () => {
    const saved = ["notes-to-next-steps"];
    expect(
      filterPrompts(prompts, {
        query: "notes",
        category: "Work & Planning",
        savedOnly: true,
        saved,
        locale: "en",
      }).map((p) => p.slug),
    ).toEqual(saved);
    expect(
      filterPrompts(prompts, {
        query: "notes",
        category: "Research & Strategy",
        savedOnly: true,
        saved,
        locale: "en",
      }),
    ).toHaveLength(0);
  });
  it("uses the exact historical cover for both April entries at 1536 by 1024", () => {
    const historical = events.filter((e) => e.slug.includes("april"));
    expect(historical).toHaveLength(2);
    historical.forEach((e) => expect(e.image).toEqual(images.hero));
    expect(images.hero.src).toBe(
      "/__l5e/assets-v1/5a334572-8e7c-48d3-a6c9-1cc023674b49/wgn-hero-1536.webp",
    );
    expect([images.hero.width, images.hero.height]).toEqual([1536, 1024]);
  });
  it("keeps the November workshop's distinct supplied cover", () => {
    expect(events.find((e) => e.slug === WORKSHOP_SLUG)?.image).toEqual(images.workshopCover);
    expect([images.workshopCover.width, images.workshopCover.height]).toEqual([1672, 941]);
    expect(images.workshopCover.src).not.toBe(images.hero.src);
  });
  it("declares the six supporting pictures as 1280 by 720", () => {
    for (const key of ["workshops", "events", "careers", "prompts", "projects", "about"] as const)
      expect([images[key].width, images[key].height]).toEqual([1280, 720]);
  });
  it("preserves confirmed November 8 2–4 PM Eastern facts and host attribution", () => {
    expect(workshop.event.start_iso).toBe("2026-11-08T14:00:00-05:00");
    expect(workshop.event.end_iso).toBe("2026-11-08T16:00:00-05:00");
    expect(workshop.event.host).toBe("Gus Gonzalez / MyGuyGus");
    expect(workshop.event.cohost).toBe("Haytham");
    expect(workshop.event.street_address).toBe("1920 Association Dr");
    expect(workshop.event.admission).toBe("Free first pilot");
    expect(workshop.event.exact_capacity_public).toBeNull();
    expect(workshop.agenda).toHaveLength(8);
  });
  it("keeps the old ai-workshops link pointed at the November workshop", () => {
    expect(legacyEventSlugs["ai-workshops"]).toBe("build-your-first-ai-automation-2026-11-08");
  });
  it("persists bookmarks at the existing key and rejects malformed or obsolete entries", () => {
    window.localStorage.clear();
    expect(SAVED_PROMPTS_KEY).toBe("wgn-saved-prompts-v1");
    expect(toggleSavedIn([], "notes-to-next-steps")).toEqual(["notes-to-next-steps"]);
    expect(readSaved(prompts.map((p) => p.slug))).toEqual(["notes-to-next-steps"]);
    window.localStorage.setItem(SAVED_PROMPTS_KEY, '["unknown",2,"notes-to-next-steps"]');
    expect(readSaved(prompts.map((p) => p.slug))).toEqual(["notes-to-next-steps"]);
  });
});
