import Link from "next/link";
import Container from "@/components/Container";
import RichText from "@/components/RichText";
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
        <div className={styles.nav}>
          <Link href="/">Home</Link>
          <span>/</span>
          <span className={styles.active}>Experience</span>
        </div>

        {pageDescriptions?.experienceDescription && (
          <div className={styles.expDescription}>
            <RichText value={pageDescriptions.experienceDescription} />
          </div>
        )}

        <div className={styles.companyList}>
          {experiences.map((experience: ExperienceItem) => (
            <div className={styles.companyItem} key={experience._id}>
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

              {(experience.positions ?? []).map((position, index: number) => (
                <div
                  className={styles.roleItem}
                  key={`${experience._id}-${position.title}-${index}`}
                >
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
                          value={position.description as PortableTextBlock[]}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
