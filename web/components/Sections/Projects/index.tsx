import styles from "./styles.module.scss";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import Project from "@/components/Project";

export default function Projects() {
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

        <div className={styles.projectsList}>
          <Project title="Project 1" subtitle="Website" href="project-1" />
          <Project title="Project 2" subtitle="Design" href="project-2" />
        </div>
      </div>
    </Container>
  );
}
