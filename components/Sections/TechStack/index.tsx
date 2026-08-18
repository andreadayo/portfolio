import styles from "./styles.module.scss";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";

export default function TechStack() {
  return (
    <Container>
      <div className={styles.techstack}>
        <SectionHeader headerIcon="tech-stack" headerLabel="Tech Stack" />

        <div className={styles.techList}>
          <div className={styles.techItem}>
            <h2 className={styles.title}>Web</h2>
            <span className={styles.subtitle}>
              JavaScript, TypeScript, React, Next.js, Bootstrap, Tailwind CSS,
              Motion (Framer), GSAP, Node.js, PHP, SQL
            </span>
          </div>

          <div className={styles.techItem}>
            <h2 className={styles.title}>Web</h2>
            <span className={styles.subtitle}>
              JavaScript, TypeScript, React, Next.js, Bootstrap, Tailwind CSS,
              Motion (Framer), GSAP, Node.js, PHP, SQL
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}
