import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { getEducation, type EducationItem } from "@/lib/sanity";
import { formatRange } from "@/lib/format";
import styles from "../Experience/styles.module.scss";

interface EducationProps {
  delay?: number;
}

export default async function Education({ delay = 0 }: EducationProps) {
  const education: EducationItem[] = await getEducation();

  return (
    <Container>
      <Reveal delay={delay}>
        <div className={styles.experience}>
          <SectionHeader headerIcon="education" headerLabel="Education" />
          <div className={styles.workList}>
            {education.map((item: EducationItem) => (
              <div className={styles.workItem} key={item._id}>
                <h2 className={styles.title}>{item.school}</h2>
                <p className={styles.subtitle}>
                  <span className={styles.role}>{item.program}</span>
                  <span className={styles.duration}>
                    {formatRange(item.startDate, item.endDate, item.isCurrent)}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
