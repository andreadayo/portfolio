import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";

export type PageDescriptions = {
  experienceDescription?: PortableTextBlock[] | null;
  projectListDescription?: PortableTextBlock[] | null;
};

export type ExperiencePosition = {
  title?: string | null;
  startDate?: string | null;
  isCurrent?: boolean | null;
  endDate?: string | null;
  description?: PortableTextBlock[] | null;
};

export type ExperienceItem = {
  _id: string;
  company?: string | null;
  employmentType?: string | null;
  location?: string | null;
  workMode?: string | null;
  icon?: string | null;
  positions?: ExperiencePosition[] | null;
};

export type EducationItem = {
  _id: string;
  school?: string | null;
  program?: string | null;
  startDate?: string | null;
  isCurrent?: boolean | null;
  endDate?: string | null;
};

export type TechStackItem = {
  _id: string;
  title?: string | null;
  description?: string | null;
};

export type ProjectItem = {
  _id: string;
  slug?: { current?: string | null } | null;
  title?: string | null;
  subtitle?: string | null;
  type?: "website" | "design" | "playground" | null;
  isShown?: boolean | null;
  isFeatured?: boolean | null;
  techStack?: string[] | null;
  liveLink?: string | null;
  githubLink?: string | null;
  figmaLink?: string | null;
  featuredImage?: SanityImageSource | null;
  description?: PortableTextBlock[] | null;
};

export type ContactLink = {
  _key: string;
  name?: string | null;
  link?: string | null;
};

export type Contact = {
  _id: string;
  links?: ContactLink[] | null;
};

const projectId =
  process.env.SANITY_PROJECT_ID ?? process.env.SANITY_STUDIO_PROJECT_ID;

const dataset = process.env.SANITY_DATASET ?? process.env.SANITY_STUDIO_DATASET;

export const sanityClient =
  projectId && dataset
    ? createClient({
        projectId,
        dataset,
        apiVersion: "2026-08-29",
        useCdn: false,
      })
    : null;

export const imageUrlBuilder =
  projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

export function sanityImageUrl(
  source: SanityImageSource | SEOImage | null | undefined,
) {
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
    {},
    {
      next: {
        tags: ["about"],
      },
    },
  );
}

export async function getPageDescriptions() {
  if (!sanityClient) {
    return null;
  }

  return sanityClient.fetch(
    `*[_type == "pageDescription" && _id == "pageDescription"][0]{
      experienceDescription,
      projectListDescription,
    }`,
    {},
    {
      next: {
        tags: ["pageDescription"],
      },
    },
  );
}

export async function getExperience(): Promise<ExperienceItem[]> {
  if (!sanityClient) {
    return [];
  }

  return sanityClient.fetch<ExperienceItem[]>(
    `*[_type == "experience"] | order(orderRank asc) {
      _id,
      company,
      employmentType,
      location,
      workMode,
      icon,
      positions[] {
        title,
        startDate,
        isCurrent,
        endDate,
        description
      }
    }`,
    {},
    {
      next: {
        tags: ["experience"],
      },
    },
  );
}

export async function getEducation(): Promise<EducationItem[]> {
  if (!sanityClient) {
    return [];
  }

  return sanityClient.fetch<EducationItem[]>(
    `*[_type == "education"] | order(orderRank asc) {
      _id,
      school,
      program,
      startDate,
      isCurrent,
      endDate
    }`,
    {},
    {
      next: {
        tags: ["education"],
      },
    },
  );
}

export async function getTechStack(): Promise<TechStackItem[]> {
  if (!sanityClient) {
    return [];
  }

  return sanityClient.fetch<TechStackItem[]>(
    `*[_type == "techStack"] | order(orderRank asc) {
      _id,
      title,
      description
    }`,
    {},
    {
      next: {
        tags: ["techStack"],
      },
    },
  );
}

export async function getProjects(): Promise<ProjectItem[]> {
  if (!sanityClient) {
    return [];
  }

  return sanityClient.fetch<ProjectItem[]>(
    `*[_type == "projects"] | order(orderRank asc) {
      _id,
      slug,
      title,
      subtitle,
      type,
      isShown,
      isFeatured,
      techStack,
      liveLink,
      githubLink,
      figmaLink,
      featuredImage,
      description
    }`,
    {},
    {
      next: {
        tags: ["projects"],
      },
    },
  );
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectItem | null> {
  if (!sanityClient) {
    return null;
  }

  return sanityClient.fetch<ProjectItem | null>(
    `*[_type == "projects" && slug.current == $slug][0] {
      _id,
      title,
      subtitle,
      type,
      techStack,
      liveLink,
      githubLink,
      figmaLink,
      featuredImage,
      description,
      slug
    }`,
    { slug },
    {
      next: {
        tags: ["projects"],
      },
    },
  );
}

export async function getContact(): Promise<ContactLink[]> {
  if (!sanityClient) {
    return [];
  }

  return sanityClient.fetch<ContactLink[]>(
    `*[_type == "contact" && _id == "contact"][0].links[] {
      name,
      link
    }`,
    {},
    {
      next: {
        tags: ["contact"],
      },
    },
  );
}

export async function getFooter() {
  if (!sanityClient) {
    return null;
  }

  return sanityClient.fetch(
    `*[_type == "footer" && _id == "footer"][0]{
      title,
      subtitle,
      copyright,
    }`,
    {},
    {
      next: {
        tags: ["footer"],
      },
    },
  );
}

export type SEOImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string | null;
};

export type SEO = {
  title?: string | null;
  description?: string | null;
  keywords?: string[] | null;
  image?: SEOImage | null;
  author?: string | null;
  siteUrl?: string | null;
};

export async function getSEO(): Promise<SEO | null> {
  if (!sanityClient) {
    return null;
  }

  return sanityClient.fetch<SEO | null>(
    `*[_type == "seo"][0]{
      title,
      description,
      keywords,
      image,
      author,
      siteUrl
    }`,
    {},
    {
      next: {
        tags: ["seo"],
      },
    },
  );
}
