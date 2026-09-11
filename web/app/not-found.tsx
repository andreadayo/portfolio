import Button from "@/components/Button";
import Container from "@/components/Container";
import SvgIcon from "@/components/SvgIcon";
import Reveal from "@/components/Reveal";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <Container fillHeight>
        <div className={styles.notFound}>
          <Reveal isCentered>
            <SvgIcon src="/icons/not-found.svg" size="3.75em" />
          </Reveal>
          <Reveal isCentered>
            <div className={styles.text}>
              <h1 className={styles.title}>Page Not Found</h1>
              <span className={styles.subtitle}>
                Oops! Looks like you got lost.
              </span>
            </div>
          </Reveal>
          <Reveal isCentered>
            <Button label="Go back to home" href="/" />
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
