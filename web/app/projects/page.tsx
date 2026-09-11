import Link from "next/link";
import Container from "@/components/Container";
import ProjectList from "@/components/ProjectList";
import RichText from "@/components/RichText";
import Reveal from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";
import { getPageDescriptions, getProjects, sanityImageUrl } from "@/lib/sanity";
import styles from "./page.module.scss";

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
          <Reveal>
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
            <Reveal>
              <div className={styles.expDescription}>
                <RichText value={pageDescriptions.projectListDescription} />
              </div>
            </Reveal>
          )}

          {/* Project List */}
          <ProjectList projects={projectsWithImages} />
        </div>
      </Container>
    </div>
  );
}
