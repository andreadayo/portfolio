import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
interface ProjectProps {
  title: string;
  subtitle: string;
  href: string;
  featuredImage?: string | null;
}
export default function Project({
  title,
  subtitle,
  href,
  featuredImage,
}: ProjectProps) {
  const formattedSubtitle =
    subtitle.charAt(0).toUpperCase() + subtitle.slice(1);

  return (
    <Link href={`/projects/${href}`} className={styles.projectItem}>
      <div className={styles.imageContainer}>
        {featuredImage && (
          <Image
            src={featuredImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
          />
        )}
      </div>
      <div className={styles.text}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.subtitle}> {formattedSubtitle} </span>
      </div>
    </Link>
  );
}
