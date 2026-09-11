import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Project from "@/components/Project";
import Reveal from "@/components/Reveal";
import RichText from "@/components/RichText";
import ScrambleText from "@/components/ScrambleText";

import { getProjectBySlug, getProjects, sanityImageUrl } from "@/lib/sanity";

import styles from "./page.module.scss";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

function projectOrder(value: string) {
  return [...value].reduce(
    (hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0,
    0,
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projects = await getProjects();

  const otherProjects = projects
    .filter((item) => item._id !== project._id)
    .sort((firstProject, secondProject) => {
      const firstOrder = projectOrder(`${slug}:${firstProject._id}`);
      const secondOrder = projectOrder(`${slug}:${secondProject._id}`);

      return firstOrder - secondOrder;
    });

  const featuredImageUrl = sanityImageUrl(project.featuredImage);

  return (
    <div className={styles.page}>
      <Container fillHeight>
        <div className={styles.projects}>
          {/* Navigation */}
          <Reveal>
            <div className={styles.nav}>
              <Link href="/">
                <ScrambleText>Home</ScrambleText>
              </Link>
              <span>/</span>
              <Link href="/projects">
                <ScrambleText>Projects</ScrambleText>
              </Link>
              <span>/</span>
              <Link href={`/projects/${slug}`}>
                <span className={styles.active}>
                  <ScrambleText>{project.title}</ScrambleText>
                </span>
              </Link>
            </div>
          </Reveal>

          {/* Project Header */}
          <div className={styles.projectHeader}>
            <div className={styles.projectDetails}>
              <div className={styles.projectTitleContainer}>
                <Reveal>
                  <h1 className={styles.projectTitle}>{project.title}</h1>
                </Reveal>

                {project.subtitle && (
                  <Reveal>
                    <p className={styles.projectDescription}>
                      {project.subtitle}
                    </p>
                  </Reveal>
                )}
              </div>

              {/* Technologies */}
              {project.techStack && project.techStack.length > 0 && (
                <div className={styles.technologies}>
                  {project.techStack.map((tech, index) => (
                    <Reveal key={tech} delay={index * 0.08} isInline>
                      <span>
                        {tech}
                        {index < project.techStack!.length - 1 && (
                          <span> • </span>
                        )}
                      </span>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>

            {/* Links */}
            <div className={styles.linkContainer}>
              {project.liveLink && (
                <Reveal isInline>
                  <Button
                    label="View Live"
                    icon="arrow-up-right"
                    href={project.liveLink}
                    target="_blank"
                  />
                </Reveal>
              )}

              {project.githubLink && (
                <Reveal isInline delay={0.08}>
                  <Button
                    label="Github"
                    icon="github"
                    type="secondary"
                    href={project.githubLink}
                    target="_blank"
                  />
                </Reveal>
              )}

              {project.figmaLink && (
                <Reveal isInline delay={0.16}>
                  <Button
                    label="Figma"
                    icon="figma"
                    type="secondary"
                    href={project.figmaLink}
                    target="_blank"
                  />
                </Reveal>
              )}
            </div>
          </div>

          {/* Project Content */}
          <div className={styles.projectContent}>
            {/* Featured Image */}
            {featuredImageUrl && (
              <Reveal>
                <div className={styles.image}>
                  <Image
                    src={featuredImageUrl}
                    alt={project.title ?? ""}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className={styles.imageContent}
                    loading="eager"
                  />
                </div>
              </Reveal>
            )}

            {/* Rich Text Description */}
            {project.description && <RichText value={project.description} />}
          </div>
        </div>
      </Container>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <Container>
          <div className={styles.projectsList}>
            {otherProjects.slice(0, 2).map((otherProject, index) => (
              <Reveal key={otherProject._id} delay={index * 0.12}>
                <Project
                  title={otherProject.title ?? ""}
                  subtitle={otherProject.subtitle ?? ""}
                  href={otherProject.slug?.current ?? ""}
                  featuredImage={sanityImageUrl(otherProject.featuredImage)}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}
