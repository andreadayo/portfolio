import styles from "./styles.module.scss";
import ActionLink from "@/components/ActionLink";
import Container from "@/components/Container";
import SvgIcon from "@/components/SvgIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.contact}>
          <div className={styles.left}>
            <div className={styles.header}>
              <h2 className={styles.title}>Get in touch</h2>
              <SvgIcon
                src="/icons/handshake.svg"
                color="var(--text-primary)"
                size="1.5em"
              />
            </div>
            <span className={styles.subtitle}>
              Let&apos;s build something new together.
            </span>
          </div>
          <div className={styles.right}>
            <span className={styles.link}>Email</span>
            <span className={styles.link}>LinkedIn</span>
            <span className={styles.link}>GitHub</span>
          </div>
        </div>
      </Container>
      <Container smallPadding isLast>
        <span className={styles.copyright}>© {currentYear} Andrea Dayo</span>
        <ActionLink label="Back to top" icon="arrow-up" side="right" />
      </Container>
    </div>
  );
}
