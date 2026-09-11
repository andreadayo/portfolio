import styles from "./styles.module.scss";
import Reveal from "@/components/Reveal";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import Project from "@/components/Project";
import { getProjects, sanityImageUrl, type ProjectItem } from "@/lib/sanity";

interface ProjectsProps {
  delay?: number;
}

export default async function Projects({ delay = 0 }: ProjectsProps) {
  const projects: ProjectItem[] = await getProjects();

  const featuredProjects = projects.filter(
    (project) => project.isShown && project.isFeatured,
  );

  return (
    <Container>
      <Reveal delay={delay}>
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
              {featuredProjects.map((project, index) => (
                <Reveal key={project._id} delay={index * 0.12}>
                  <Project
                    title={project.title ?? ""}
                    subtitle={project.subtitle ?? ""}
                    href={project.slug?.current ?? ""}
                    featuredImage={sanityImageUrl(project.featuredImage)}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <span className={styles.empty}>No featured projects.</span>
          )}
        </div>
      </Reveal>
    </Container>
  );
}
