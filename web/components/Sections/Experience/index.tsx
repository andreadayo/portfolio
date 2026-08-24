import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import { getExperience, type ExperienceItem } from "@/lib/sanity";
import { formatExperienceRange } from "@/lib/format";
import styles from "./styles.module.scss";

export default async function Experience() {
  const experiences: ExperienceItem[] = await getExperience();

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
          {experiences.slice(0, 3).map((experience: ExperienceItem) => (
            <div className={styles.workItem} key={experience._id}>
              <h2 className={styles.title}>{experience.company}</h2>
              {(experience.positions ?? []).map((position, index: number) => (
                <p
                  className={styles.subtitle}
                  key={`${experience._id}-${position.title}-${index}`}
                >
                  <span className={styles.role}>{position.title}</span>
                  <span className={styles.duration}>
                    {formatExperienceRange(
                      position.startDate,
                      position.endDate,
                      position.isCurrent,
                    )}
                  </span>
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
