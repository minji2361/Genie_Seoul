const DEFAULT_SITE_URL = "https://www.genie-land.com";

/** 프로덕션 사이트 URL (sitemap, robots, OG 등) */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return url.replace(/\/$/, "");
}
