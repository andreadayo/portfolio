import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { getExperience, type ExperienceItem } from "@/lib/sanity";
import { formatExperienceRange } from "@/lib/format";
import styles from "./styles.module.scss";

interface ExperienceProps {
  delay?: number;
}

export default async function Experience({ delay = 0 }: ExperienceProps) {
  const experiences: ExperienceItem[] = await getExperience();

  return (
    <Container>
      <Reveal delay={delay}>
        <div className={styles.experience}>
          <SectionHeader
            headerIcon="work"
            headerLabel="Experience"
            actionIcon="arrow-right"
            actionLabel="View All"
            actionLink="/experience"
          />

          <div className={styles.workList}>
            {experiences
              .slice(0, 3)
              .map((experience: ExperienceItem, index) => (
                <Reveal key={experience._id} delay={index * 0.12}>
                  <div className={styles.workItem}>
                    <h2 className={styles.title}>{experience.company}</h2>
                    {(experience.positions ?? []).map(
                      (position, positionIndex: number) => (
                        <p
                          className={styles.subtitle}
                          key={`${experience._id}-${position.title}-${positionIndex}`}
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
                      ),
                    )}
                  </div>
                </Reveal>
              ))}
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
