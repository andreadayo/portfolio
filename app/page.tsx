import styles from "./page.module.css";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        Hello world
        <ThemeToggle />
      </main>
    </div>
  );
}
