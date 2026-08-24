import Container from "@/components/Container";
import ProjectList from "@/components/ProjectList";
import { getProjects, sanityImageUrl } from "@/lib/sanity";
import styles from "./page.module.scss";

export default async function Projects() {
  const projects = await getProjects();
  const projectsWithImages = projects.map((project) => ({
    ...project,
    featuredImageUrl: sanityImageUrl(project.featuredImage),
  }));

  return (
    <div className={styles.page}>
      <Container fillHeight>
        <div className={styles.projects}>
          {/* Navigation */}
          <div className={styles.nav}>
            <span>Home</span> <span>/</span>
            <span className={styles.active}>Projects</span>
          </div>

          {/* Description */}
          <p className={styles.expDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            tristique elit ut est aliquet eleifend. Nulla sagittis, mauris nec.
          </p>

          {/* Project List */}
          <ProjectList projects={projectsWithImages} />
        </div>
      </Container>
    </div>
  );
}
