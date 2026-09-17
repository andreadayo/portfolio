import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import ProjectList from "@/components/ProjectList";
import RichText from "@/components/RichText";
import Reveal from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";
import {
  getPageDescriptions,
  getProjects,
  getSEO,
  sanityImageUrl,
} from "@/lib/sanity";
import styles from "./page.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO();

  return {
    title: "Projects",
    alternates: {
      canonical: seo?.siteUrl
        ? new URL("/projects", seo.siteUrl).toString()
        : "/projects",
    },
  };
}

export default async function Projects() {
  const pageDescriptions = await getPageDescriptions();
  const projects = await getProjects();
  const projectsWithImages = projects.map((project) => ({
    ...project,
    featuredImageUrl: sanityImageUrl(project.featuredImage),
  }));

  return (
    <div className={styles.page}>
      <Container fillHeight>
        <div className={styles.projects}>
          <Reveal delay={0}>
            <div className={styles.nav}>
              <Link href="/">
                <ScrambleText>Home</ScrambleText>
              </Link>
              <span>/</span>

              <Link href="/projects">
                <span className={styles.active}>
                  <ScrambleText>Projects</ScrambleText>
                </span>
              </Link>
            </div>
          </Reveal>

          {/* Description */}
          {pageDescriptions?.projectListDescription && (
            <Reveal delay={0.12}>
              <div className={styles.expDescription}>
                <RichText value={pageDescriptions.projectListDescription} />
              </div>
            </Reveal>
          )}

          {/* Project List */}
          <Reveal delay={0.24}>
            <ProjectList projects={projectsWithImages} />
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
