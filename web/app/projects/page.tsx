import Link from "next/link";
import Container from "@/components/Container";
import ProjectList from "@/components/ProjectList";
import { getPageDescriptions, getProjects, sanityImageUrl } from "@/lib/sanity";
import RichText from "@/components/RichText";
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
          <div className={styles.nav}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span className={styles.active}>Projects</span>
          </div>

          {/* Description */}
          <p className={styles.expDescription}>
            {pageDescriptions?.projectListDescription && (
              <div className={styles.expDescription}>
                <RichText value={pageDescriptions.projectListDescription} />
              </div>
            )}
          </p>

          {/* Project List */}
          <ProjectList projects={projectsWithImages} />
        </div>
      </Container>
    </div>
  );
}
