import type { ClaimResult, InquiryGuard } from "./inquiry-handler";

export const GUARD_LIMITS = {
  records: 1000,
  scopes: 1000,
  global: 30,
  burst: 10,
  burstSeconds: 60,
} as const;
type RecordState = {
  hash: string;
  ticketId: string;
  state: "in_flight" | "accepted" | "failed";
  expires: number;
};
type Bucket = { count: number; expires: number };
/** Best effort ONLY: process-local, lost on restart, not shared across instances.
 * All mutations are synchronous before returning a Promise. Never evict a live
 * record to admit a new send; capacity exhaustion rejects instead.
 */
export class InstanceInquiryGuard implements InquiryGuard {
  private records = new Map<string, RecordState>();
  private scopes = new Map<string, Bucket>();
  private global: Bucket = { count: 0, expires: 0 };
  private burst: Bucket = { count: 0, expires: 0 };
  constructor(private clock: () => number = Date.now) {}
  private sweep(now: number) {
    for (const [key, r] of this.records) if (r.expires <= now) this.records.delete(key);
    for (const [key, r] of this.scopes) if (r.expires <= now) this.scopes.delete(key);
  }
  claim(key: string, hash: string, ticketId: string, ttlSeconds: number): Promise<ClaimResult> {
    const now = this.clock();
    this.sweep(now);
    const r = this.records.get(key);
    if (r) {
      if (r.hash !== hash) return Promise.resolve({ state: "conflict" });
      if (r.state === "accepted")
        return Promise.resolve({ state: "accepted", ticketId: r.ticketId });
      return Promise.resolve({ state: r.state === "in_flight" ? "in_flight" : "failed" });
    }
    if (this.records.size >= GUARD_LIMITS.records) return Promise.resolve({ state: "capacity" });
    this.records.set(key, {
      hash,
      ticketId,
      state: "in_flight",
      expires: now + Math.min(ttlSeconds, 86400) * 1000,
    });
    return Promise.resolve({ state: "claimed" });
  }
  finish(key: string, outcome: "accepted" | "rejected" | "unknown"): Promise<void> {
    const r = this.records.get(key);
    if (r) r.state = outcome === "accepted" ? "accepted" : "failed";
    return Promise.resolve();
  }
  hit(scope: string, limit: number, windowSeconds: number): Promise<boolean> {
    const now = this.clock();
    this.sweep(now);
    if (this.global.expires <= now) this.global = { count: 0, expires: now + 600000 };
    if (this.burst.expires <= now)
      this.burst = { count: 0, expires: now + GUARD_LIMITS.burstSeconds * 1000 };
    this.global.count++;
    this.burst.count++;
    let bucket = this.scopes.get(scope);
    if (!bucket) {
      if (this.scopes.size >= GUARD_LIMITS.scopes) return Promise.resolve(false);
      bucket = { count: 0, expires: now + windowSeconds * 1000 };
      this.scopes.set(scope, bucket);
    }
    bucket.count++;
    return Promise.resolve(
      bucket.count <= limit &&
        this.global.count <= GUARD_LIMITS.global &&
        this.burst.count <= GUARD_LIMITS.burst,
    );
  }
}
