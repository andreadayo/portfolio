import styles from "./styles.module.scss";
import Container from "@/components/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.footer}>
      <Container>
        <span>get in touch</span>
      </Container>
      <Container smallPadding isLast>
        <span>© {currentYear} Andrea Dayo</span>
        <span>Back to top</span>
      </Container>
    </div>
  );
}
