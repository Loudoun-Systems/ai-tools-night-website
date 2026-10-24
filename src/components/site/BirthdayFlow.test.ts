import { describe, expect, it } from "vitest";
import { FLOW_TOTAL, FLOW_TIMES, CHUNK_TIMES, stepAt, loopTime } from "./BirthdayFlow";
describe("birthday loop", () => {
  it("dwells on four readable stages across 23 seconds", () => {
    expect(FLOW_TOTAL).toBe(23);
    expect(FLOW_TIMES).toEqual([4.5, 9, 15, 23]);
    expect([0, 4.49, 4.5, 9, 15, 22.99].map(stepAt)).toEqual([0, 0, 1, 2, 3, 3]);
  });
  it("resets stage after the loop boundary, including repeated loops", () => {
    expect(loopTime(23)).toBe(0);
    expect(stepAt(loopTime(46.2))).toBe(0);
    expect(loopTime(22.99 + 0.05)).toBeCloseTo(0.04);
  });
  it("reveals all three chunks at the approved times", () => {
    expect(CHUNK_TIMES).toEqual([10.3, 12.4, 14.4]);
    expect(CHUNK_TIMES.filter((t) => t <= 14.4)).toHaveLength(3);
  });
});
