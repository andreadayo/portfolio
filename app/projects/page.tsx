import Container from "@/components/Container";
import Project from "@/components/Project";
import styles from "./page.module.scss";

export default function Projects() {
  return (
    <div className={styles.page}>
      <Container fillHeight>
        <div className={styles.projects}>
          {/* Navigation */}
          <div className={styles.nav}>
            <span>Home</span>
            <span>/</span>
            <span className={styles.active}>Projects</span>
          </div>

          {/* Description */}
          <p className={styles.expDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            tristique elit ut est aliquet eleifend. Nulla sagittis, mauris nec.
          </p>

          {/* Filter */}
          <div className={styles.filter}>
            <span className={styles.active}>All</span>
            <span>•</span>
            <span>Website</span>
            <span>•</span>
            <span>Design</span>
            <span>•</span>
            <span>Playground</span>
          </div>

          {/* Project List */}
          <div className={styles.projectsList}>
            <Project title="Project 1" subtitle="Website" />
            <Project title="Project 2" subtitle="Design" />
            <Project title="Project 3" subtitle="Playground" />
            <Project title="Project 4" subtitle="Website" />
          </div>
        </div>
      </Container>
    </div>
  );
}
