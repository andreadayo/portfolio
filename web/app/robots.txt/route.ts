import { getSEO, sanityClient } from "@/lib/sanity";

export async function GET() {
  const seo = await getSEO();
  const baseUrl = seo?.siteUrl?.replace(/\/$/, "");

  if (!baseUrl || !sanityClient) {
    return new Response("", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const hostname = new URL(baseUrl).hostname;
  const robots = [
    `# Robots.txt for ${hostname}`,
    ``,
    `User-agent: *`,
    `Allow: /`,
    ``,
    `# Sitemap`,
    `Sitemap: ${baseUrl}/sitemap.xml`,
  ].join("\n");

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
