import { describe, expect, it, vi } from "vitest";
import { posterReady, swipeDirection } from "./poster-navigation";

describe("poster navigation safety", () => {
  it("requires horizontal distance over 40px and dominant over vertical distance", () => {
    const start = { x: 100, y: 100 };
    expect(swipeDirection(start, { x: 40, y: 110 })).toBe(1);
    expect(swipeDirection(start, { x: 160, y: 110 })).toBe(-1);
    expect(swipeDirection(start, { x: 40, y: 180 })).toBe(0);
    expect(swipeDirection(start, { x: 60, y: 100 })).toBe(0);
    expect(swipeDirection(start, { x: 40, y: 160 })).toBe(0);
  });
  it("does not report ready before decode completes", async () => {
    let resolve: () => void = () => {};
    const image = {
      complete: true,
      naturalWidth: 900,
      decode: vi.fn(
        () =>
          new Promise<void>((r) => {
            resolve = r;
          }),
      ),
    };
    let ready = false;
    const waiting = posterReady(image as unknown as HTMLImageElement).then((v) => {
      ready = v;
    });
    await Promise.resolve();
    expect(ready).toBe(false);
    resolve();
    await waiting;
    expect(ready).toBe(true);
  });
  it("leaves the current artwork in place on failed or empty decode", async () => {
    expect(await posterReady(null)).toBe(false);
    expect(
      await posterReady({
        decode: async () => {
          throw new Error("not loaded");
        },
      } as unknown as HTMLImageElement),
    ).toBe(false);
    expect(
      await posterReady({
        decode: async () => {},
        complete: true,
        naturalWidth: 0,
      } as unknown as HTMLImageElement),
    ).toBe(false);
  });
});
