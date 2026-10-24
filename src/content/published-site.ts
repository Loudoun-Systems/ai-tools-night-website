import workshopSocial from "@/assets/workshop-social-1200.webp.asset.json";

// The origin was returned by the first real Lovable publish, not inferred from the preview.
export const PUBLISHED_ORIGIN =
  import.meta.env["VITE_PUBLIC_SITE_ORIGIN"] ?? "https://now-we-make-together.lovable.app";
export const WORKSHOP_SOCIAL_URL = `${PUBLISHED_ORIGIN}${workshopSocial.url}`;

export const siteUrl = (pathname: string) => new URL(pathname, PUBLISHED_ORIGIN).href;
