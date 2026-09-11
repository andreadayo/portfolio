import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { getTechStack, type TechStackItem } from "@/lib/sanity";
import styles from "./styles.module.scss";

interface TechStackProps {
  delay?: number;
}

export default async function TechStack({ delay = 0 }: TechStackProps) {
  const techStack: TechStackItem[] = await getTechStack();

  return (
    <Container>
      <Reveal delay={delay}>
        <div className={styles.techstack}>
          <SectionHeader headerIcon="tech-stack" headerLabel="Tech Stack" />
          <div className={styles.techList}>
            {techStack.map((tech: TechStackItem, index) => (
              <Reveal key={tech._id} delay={index * 0.12}>
                <div className={styles.techItem}>
                  <h2 className={styles.title}>{tech.title}</h2>
                  <span className={styles.subtitle}> {tech.description} </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
