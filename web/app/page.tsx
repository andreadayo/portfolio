import About from "@/components/Sections/About";
import Experience from "@/components/Sections/Experience";
import Education from "@/components/Sections/Education";
import TechStack from "@/components/Sections/TechStack";
import Projects from "@/components/Sections/Projects";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <About />
      <Experience />
      <Education />
      <TechStack />
      <Projects />
    </div>
  );
}
