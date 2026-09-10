import styles from "./styles.module.scss";
import ActionLink from "@/components/ActionLink";
import Container from "@/components/Container";
import SmartLink from "@/components/SmartLink";
import SvgIcon from "@/components/SvgIcon";
import { getFooter, getContact, type ContactLink } from "@/lib/sanity";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const contactLinks: ContactLink[] = await getContact();
  const footer = await getFooter();

  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.contact}>
          <div className={styles.left}>
            <div className={styles.header}>
              {/* Title */}
              <h2 className={styles.title}>{footer?.title}</h2>
              <SvgIcon
                src="/icons/handshake.svg"
                color="var(--text-primary)"
                size="1.5em"
              />
            </div>
            {/* Subtitle */}
            <span className={styles.subtitle}>{footer?.subtitle}</span>
          </div>
          <div className={styles.right}>
            {(contactLinks ?? []).map((contact: ContactLink) => (
              <SmartLink
                key={contact._key}
                className={styles.link}
                href={contact.link ?? undefined}
              >
                {contact.name}
              </SmartLink>
            ))}
          </div>
        </div>
      </Container>
      <Container smallPadding isLast>
        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © {currentYear} {footer?.copyright}
          </span>
          <a className={styles.action} href="#top">
            <ActionLink label="Back to top" icon="arrow-up" side="right" />
          </a>
        </div>
      </Container>
    </div>
  );
}
