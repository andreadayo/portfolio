import styles from "./styles.module.scss";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import Project from "@/components/Project";
import { getProjects, sanityImageUrl, type ProjectItem } from "@/lib/sanity";

export default async function Projects() {
  const projects: ProjectItem[] = await getProjects();

  const featuredProjects = projects.filter(
    (project) => project.isShown && project.isFeatured,
  );

  return (
    <Container>
      <div className={styles.projects}>
        <SectionHeader
          headerIcon="projects"
          headerLabel="Projects"
          actionIcon="arrow-right"
          actionLabel="View All"
          actionLink="/projects"
        />

        {featuredProjects.length > 0 ? (
          <div className={styles.projectsList}>
            {featuredProjects.map((project) => (
              <Project
                key={project._id}
                title={project.title ?? ""}
                subtitle={project.subtitle ?? ""}
                href={project.slug?.current ?? ""}
                featuredImage={sanityImageUrl(project.featuredImage)}
              />
            ))}
          </div>
        ) : (
          <span className={styles.empty}>No featured projects.</span>
        )}
      </div>
    </Container>
  );
}
