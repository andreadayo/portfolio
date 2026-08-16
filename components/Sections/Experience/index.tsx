import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import styles from "./styles.module.scss";

export default function Experience() {
  return (
    <Container>
      <div className={styles.experience}>
        <SectionHeader
          headerIcon="work"
          headerLabel="Experience"
          actionIcon="arrow-right"
          actionLabel="View All"
          actionLink="/experience"
        />

        <div className={styles.workList}>
          <div className={styles.workItem}>
            <h2 className={styles.title}>Procter & Gamble</h2>
            <p className={styles.subtitle}>
              <span className={styles.role}>SAP Software Engineer</span>
              <span className={styles.duration}>Apr &apos;26 - Present</span>
            </p>
            <p className={styles.subtitle}>
              <span className={styles.role}>SAP Software Engineer</span>
              <span className={styles.duration}>Apr &apos;26 - Present</span>
            </p>
          </div>

          <div className={styles.workItem}>
            <h2 className={styles.title}>Procter & Gamble</h2>
            <p className={styles.subtitle}>
              <span className={styles.role}>SAP Software Engineer</span>
              <span className={styles.duration}>Apr &apos;26 - Present</span>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
