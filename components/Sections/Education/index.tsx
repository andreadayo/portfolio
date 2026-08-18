import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import styles from "../Experience/styles.module.scss";

export default function Education() {
  return (
    <Container>
      <div className={styles.experience}>
        <SectionHeader headerIcon="education" headerLabel="Education" />

        <div className={styles.workList}>
          <div className={styles.workItem}>
            <h2 className={styles.title}>University of Santo Tomas</h2>
            <p className={styles.subtitle}>
              <span className={styles.role}>
                BS Computer Science (Core Computer Science)
              </span>
              <span className={styles.duration}>
                Aug &apos;21 - Jun &apos;25
              </span>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
