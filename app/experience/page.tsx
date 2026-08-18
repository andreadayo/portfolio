import Container from "@/components/Container";
import styles from "./page.module.scss";

export default function Experience() {
  return (
    <Container>
      <div className={styles.page}>
        {/* Navigation */}
        <div className={styles.nav}>
          <span>Home</span>
          <span>/</span>
          <span className={styles.active}>Experience</span>
        </div>

        {/* Description */}
        <p className={styles.expDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          tristique elit ut est aliquet eleifend. Nulla sagittis, mauris nec.
        </p>

        {/* Company List */}
        <div className={styles.companyList}>
          <div className={styles.companyItem}>
            <div className={styles.header}>
              <div className={styles.icon}>PG</div>
              <div className={styles.text}>
                <h2 className={styles.title}>Procter & Gamble</h2>
                <span className={styles.subtitle}>
                  Full-time • Taguig, National Capital Region, Philippines •
                  Hybrid
                </span>
              </div>
            </div>

            {/* Role List */}
            <div className={styles.roleItem}>
              <div className={styles.roleInner}>
                <div className={styles.header}>
                  <div className={styles.role}>SAP Software Engineer</div>
                  <div className={styles.duration}>Apr &apos;26 - Present</div>
                </div>
                <span className={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas tristique elit ut est aliquet eleifend. Nulla
                  sagittis, mauris nec.
                  <br />
                  <br />
                  Donec aliquet, odio vitae pharetra tincidunt, sem nulla
                  gravida neque, ut sagittis risus tellus quis arcu.
                </span>
              </div>
            </div>

            <div className={styles.roleItem}>
              <div className={styles.roleInner}>
                <div className={styles.header}>
                  <div className={styles.role}>SAP Software Engineer</div>
                  <div className={styles.duration}>Apr &apos;26 - Present</div>
                </div>
                <span className={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas tristique elit ut est aliquet eleifend. Nulla
                  sagittis, mauris nec.
                  <br />
                  <br />
                  Donec aliquet, odio vitae pharetra tincidunt, sem nulla
                  gravida neque, ut sagittis risus tellus quis arcu.
                </span>
              </div>
            </div>
          </div>

          <div className={styles.companyItem}>
            <div className={styles.header}>
              <div className={styles.icon}>PG</div>
              <div className={styles.text}>
                <h2 className={styles.title}>Procter & Gamble</h2>
                <span className={styles.subtitle}>
                  Full-time • Taguig, National Capital Region, Philippines •
                  Hybrid
                </span>
              </div>
            </div>

            {/* Role List */}
            <div className={styles.roleItem}>
              <div className={styles.roleInner}>
                <div className={styles.header}>
                  <div className={styles.role}>SAP Software Engineer</div>
                  <div className={styles.duration}>Apr &apos;26 - Present</div>
                </div>
                <span className={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas tristique elit ut est aliquet eleifend. Nulla
                  sagittis, mauris nec.
                  <br />
                  <br />
                  Donec aliquet, odio vitae pharetra tincidunt, sem nulla
                  gravida neque, ut sagittis risus tellus quis arcu.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
