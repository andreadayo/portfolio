import Button from "@/components/Button";
import Container from "@/components/Container";
import Project from "@/components/Project";
import styles from "./page.module.scss";
import SvgIcon from "@/components/SvgIcon";

export default function Projects() {
  const codeSnippet = [
    "function helloWorld() {",
    '  console.log("Hello, world!");',
    "}",
  ].join("\n");

  return (
    <div className={styles.page}>
      <Container fillHeight>
        <div className={styles.projects}>
          {/* Navigation */}
          <div className={styles.nav}>
            <span>Home</span>
            <span>/</span>
            <span>Projects</span>
            <span>/</span>
            <span className={styles.active}>Project-title</span>
          </div>

          {/* Project Header */}
          <div className={styles.projectHeader}>
            <div className={styles.projectDetails}>
              <h1 className={styles.projectTitle}>Project Title</h1>

              {/* Description */}
              <p className={styles.projectDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas tristique elit ut est aliquet eleifend. Nulla sagittis,
                mauris nec.
              </p>

              {/* Technologies */}
              <div className={styles.technologies}>
                <span>Typescript</span>
                <span>•</span>
                <span>Tailwind CSS</span>
                <span>•</span>
                <span>Node.js</span>
              </div>
            </div>
            {/* Links */}
            <div className={styles.linkContainer}>
              <Button
                label="View Live"
                icon="arrow-up-right"
                href="https://google.com"
                target="_blank"
              />
              <Button
                label="Github"
                icon="github"
                type="secondary"
                href="https://google.com"
                target="_blank"
              />
              <Button
                label="Figma"
                icon="figma"
                type="secondary"
                href="https://google.com"
                target="_blank"
              />
            </div>
          </div>

          {/* Project Content */}
          <div className={styles.projectContent}>
            {/* Fixed featured Image */}
            <div className={styles.image} />

            {/* Content */}
            {/* Paragraph */}
            <p className={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              tristique elit ut est aliquet eleifend. Nulla sagittis, mauris
              nec. Donec aliquet, odio vitae pharetra tincidunt, sem nulla
              gravida neque, ut sagittis risus tellus quis arcu. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Maecenas tristique
              elit ut est aliquet eleifend. Nulla sagittis, mauris nec. Donec
              aliquet, odio vitae pharetra tincidunt, sem nulla gravida neque,
              ut sagittis risus tellus quis arcu.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              tristique elit ut est aliquet eleifend. Nulla sagittis, mauris
              nec. Donec aliquet, odio vitae pharetra tincidunt, sem nulla
              gravida neque, ut sagittis risus tellus quis arcu.
            </p>

            {/* Image with Caption */}
            <div className={styles.imageCaption}>
              <div className={styles.image} />
              <span className={styles.caption}>caption</span>
            </div>

            {/* Header */}
            <h1 className={styles.header}>Header</h1>

            {/* Bullet */}
            <ul className={styles.bulletList}>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                sed leo sapien. Maecenas in nisl eu ligula egestas finibus.
                Maecenas sed nisi ligula.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                sed leo sapien. Maecenas in nisl eu ligula egestas finibus.
                Maecenas sed nisi ligula.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                sed leo sapien. Maecenas in nisl eu ligula egestas finibus.
                Maecenas sed nisi ligula.
              </li>
            </ul>

            <ol className={styles.bulletList}>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                sed leo sapien. Maecenas in nisl eu ligula egestas finibus.
                Maecenas sed nisi ligula.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                sed leo sapien. Maecenas in nisl eu ligula egestas finibus.
                Maecenas sed nisi ligula.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                sed leo sapien. Maecenas in nisl eu ligula egestas finibus.
                Maecenas sed nisi ligula.
              </li>
            </ol>

            {/* Quote Block */}
            <blockquote className={styles.quote}>
              <SvgIcon
                src="/icons/quote.svg"
                color="var(--text-primary)"
                size="1.5em"
              />
              <span className={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                sed leo sapien. Maecenas in nisl eu ligula egestas finibus.
                Maecenas sed nisi ligula.
              </span>
              <span className={styles.author}>John Doe, CEO of Acme Inc.</span>
            </blockquote>

            {/* Code Block */}
            <pre className={styles.codeBlock}>
              <code className={styles.code}>{codeSnippet}</code>
            </pre>

            {/* Button */}
            <Button label="Button" href="https://google.com" target="_blank" />
          </div>
        </div>
      </Container>
      <Container>
        <div className={styles.projectsList}>
          <Project title="Project 1" subtitle="Website" href="project-1" />
          <Project title="Project 2" subtitle="Design" href="project-2" />
        </div>
      </Container>
    </div>
  );
}
