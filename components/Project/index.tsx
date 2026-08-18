import styles from "./styles.module.scss";

interface ProjectProps {
  //   TODO: Add image
  title: string;
  subtitle: string;
}

export default function Projects({ title, subtitle }: ProjectProps) {
  return (
    <div className={styles.projectItem}>
      <div className={styles.imageContainer}>{/* TODO: Add image */}</div>
      <div className={styles.text}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
    </div>
  );
}
