import About from "@/components/Sections/About";
import Experience from "@/components/Sections/Experience";
import Education from "@/components/Sections/Education";
import TechStack from "@/components/Sections/TechStack";
import Projects from "@/components/Sections/Projects";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <About delay={0} />
      <Experience delay={0.12} />
      <Education delay={0.24} />
      <TechStack delay={0.36} />
      <Projects delay={0.48} />
    </div>
  );
}
