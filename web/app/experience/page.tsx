import Link from "next/link";
import Container from "@/components/Container";
import RichText from "@/components/RichText";
import Reveal from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";
import {
  getPageDescriptions,
  getExperience,
  type ExperienceItem,
} from "@/lib/sanity";
import type { PortableTextBlock } from "@portabletext/types";
import { formatRange, formatLabel } from "@/lib/format";
import styles from "./page.module.scss";

export default async function ExperiencePage() {
  const pageDescriptions = await getPageDescriptions();
  const experiences: ExperienceItem[] = await getExperience();

  return (
    <Container>
      <div className={styles.page}>
        <Reveal>
          <div className={styles.nav}>
            <Link href="/">
              <ScrambleText>Home</ScrambleText>
            </Link>
            <span>/</span>
            <Link href="/experience">
              <span className={styles.active}>
                <ScrambleText>Experience</ScrambleText>
              </span>
            </Link>
          </div>
        </Reveal>

        {pageDescriptions?.experienceDescription && (
          <Reveal>
            <div className={styles.expDescription}>
              <RichText value={pageDescriptions.experienceDescription} />
            </div>
          </Reveal>
        )}

        <div className={styles.companyList}>
          {experiences.map((experience: ExperienceItem, index: number) => (
            <Reveal key={experience._id} delay={index * 0.08}>
              <div className={styles.companyItem}>
                <div className={styles.header}>
                  <div className={styles.icon}>
                    {(experience.icon ?? "?").slice(0, 2).toUpperCase()}
                  </div>
                  <div className={styles.text}>
                    <h2 className={styles.title}>{experience.company}</h2>
                    <span className={styles.subtitle}>
                      {[
                        experience.employmentType
                          ? experience.employmentType.charAt(0).toUpperCase() +
                            experience.employmentType.slice(1)
                          : null,
                        experience.location,
                        formatLabel(experience.workMode),
                      ]
                        .filter(Boolean)
                        .join(" • ")}
                    </span>
                  </div>
                </div>

                {(experience.positions ?? []).map((position, positionIndex) => (
                  <Reveal
                    key={`${experience._id}-${position.title}-${positionIndex}`}
                    delay={positionIndex * 0.08}
                  >
                    <div className={styles.roleItem}>
                      <div className={styles.roleInner}>
                        <div className={styles.header}>
                          <div className={styles.role}>{position.title}</div>
                          <div className={styles.duration}>
                            {formatRange(
                              position.startDate,
                              position.endDate,
                              position.isCurrent,
                            )}
                          </div>
                        </div>

                        {position.description && (
                          <div className={styles.description}>
                            <RichText
                              value={
                                position.description as PortableTextBlock[]
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
