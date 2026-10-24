export type TouchPoint = { x: number; y: number };

export function swipeDirection(start: TouchPoint, end: TouchPoint) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  return Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 1 : -1) : 0;
}

/** No slide switch until the actual rendered image has decoded successfully. */
export async function posterReady(image: HTMLImageElement | null) {
  if (!image) return false;
  try {
    await image.decode();
    return image.complete && image.naturalWidth > 0;
  } catch {
    return false;
  }
}
