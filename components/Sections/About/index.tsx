import Image from "next/image";
import Container from "@/components/Container";
import styles from "./styles.module.scss";

export default function About() {
  return (
    <Container>
      <div className={styles.about}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <Image
              className={styles.icon}
              src="/assets/profile-icon.png"
              alt="Profile Icon"
              width={400}
              height={400}
            />
          </div>
          <div className={styles.text}>
            <h1 className={styles.name}>Andrea Dayo</h1>
            <p className={styles.subtitle}>
              Software Engineer based in Manila, PH
            </p>
          </div>
        </div>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          tristique elit ut est aliquet eleifend.
          <br />
          <br />
          Nulla sagittis, mauris nec. Donec aliquet, odio vitae pharetra
          tincidunt, sem nulla gravida neque, ut sagittis risus tellus quis
          arcu.
        </p>
      </div>
    </Container>
  );
}
