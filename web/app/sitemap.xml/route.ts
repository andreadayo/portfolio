import type { SanityImageSource } from "@sanity/image-url";

import { getSEO, sanityClient, sanityImageUrl } from "@/lib/sanity";

const PROJECTS_QUERY = `
	*[
		_type == "projects" &&
		isShown == true &&
		defined(slug.current)
	] {
		"slug": slug.current,
		_updatedAt,
		featuredImage
	}
`;

type SitemapProject = {
  slug: string;
  _updatedAt: string;
  featuredImage?: SanityImageSource | null;
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const seo = await getSEO();
  const baseUrl = seo?.siteUrl?.replace(/\/$/, "");

  if (!baseUrl || !sanityClient) {
    return new Response("", {
      status: 500,
      headers: { "Content-Type": "application/xml" },
    });
  }

  const projects = await sanityClient.fetch<SitemapProject[]>(
    PROJECTS_QUERY,
    {},
    {
      next: {
        tags: ["projects"],
      },
    },
  );

  const urls = [
    { url: baseUrl, lastModified: new Date(), image: undefined },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      image: undefined,
    },
    { url: `${baseUrl}/projects`, lastModified: new Date(), image: undefined },
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project._updatedAt),
      image: sanityImageUrl(project.featuredImage)?.split("?")[0],
    })),
  ]
    .map(
      ({ url, lastModified, image }) => `
		<url>
			<loc>${escapeXml(url)}</loc>
			<lastmod>${lastModified.toISOString()}</lastmod>
			${image ? `<image:image><image:loc>${escapeXml(image)}</image:loc></image:image>` : ""}
		</url>`,
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
