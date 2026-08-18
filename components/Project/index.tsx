import Link from "next/link";
import styles from "./styles.module.scss";

interface ProjectProps {
  //   TODO: Add image
  title: string;
  subtitle: string;
  href: string;
}

export default function Projects({ title, subtitle, href }: ProjectProps) {
  return (
    <Link href={`/projects/${href}`} className={styles.projectItem}>
      <div className={styles.imageContainer}>{/* TODO: Add image */}</div>
      <div className={styles.text}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
    </Link>
  );
}
