import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const projectId =
  process.env.SANITY_PROJECT_ID ?? process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? process.env.SANITY_STUDIO_DATASET;

export const sanityClient =
  projectId && dataset
    ? createClient({
        projectId,
        dataset,
        apiVersion: "2026-01-01",
        useCdn: true,
      })
    : null;

export const imageUrlBuilder =
  projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

export function sanityImageUrl(source: SanityImageSource | null | undefined) {
  return source && imageUrlBuilder
    ? imageUrlBuilder
        .image(source as SanityImageSource)
        .auto("format")
        .fit("max")
        .url()
    : null;
}

export async function getAbout() {
  if (!sanityClient) {
    return null;
  }

  return sanityClient.fetch(
    `*[_type == "about" && _id == "about"][0]{
      name,
      role,
      location,
      icon,
      description
    }`,
  );
}
