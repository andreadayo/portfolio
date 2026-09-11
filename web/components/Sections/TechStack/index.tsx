import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { getTechStack, type TechStackItem } from "@/lib/sanity";
import styles from "./styles.module.scss";

export default async function TechStack() {
  const techStack: TechStackItem[] = await getTechStack();

  return (
    <Container>
      <Reveal>
        <div className={styles.techstack}>
          <SectionHeader headerIcon="tech-stack" headerLabel="Tech Stack" />
          <div className={styles.techList}>
            {techStack.map((tech: TechStackItem) => (
              <div className={styles.techItem} key={tech._id}>
                <h2 className={styles.title}>{tech.title}</h2>
                <span className={styles.subtitle}> {tech.description} </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
