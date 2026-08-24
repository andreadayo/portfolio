import Image from "next/image";
import Container from "@/components/Container";
import RichText from "@/components/RichText";
import { getAbout, sanityImageUrl } from "@/lib/sanity";
import styles from "./styles.module.scss";

export default async function About() {
  const about = await getAbout();
  const iconUrl = sanityImageUrl(about?.icon);

  return (
    <Container>
      <div className={styles.about}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            {iconUrl && (
              <Image
                className={styles.icon}
                src={iconUrl}
                alt={about?.name ? `${about.name} profile` : "Profile Icon"}
                width={400}
                height={400}
              />
            )}
          </div>
          <div className={styles.text}>
            <h1 className={styles.name}>{about?.name}</h1>
            <p className={styles.subtitle}>
              {about?.role} {about?.location && `based in ${about.location}`}
            </p>
          </div>
        </div>
        {about?.description && <RichText value={about.description} />}
      </div>
    </Container>
  );
}
