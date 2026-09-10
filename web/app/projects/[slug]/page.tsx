import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Project from "@/components/Project";
import RichText from "@/components/RichText";

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
          <div className={styles.nav}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/projects">Projects</Link>
            <span>/</span>
            <span className={styles.active}>{project.title}</span>
          </div>

          {/* Project Header */}
          <div className={styles.projectHeader}>
            <div className={styles.projectDetails}>
              <div className={styles.projectTitleContainer}>
                <h1 className={styles.projectTitle}>{project.title}</h1>

                {project.subtitle && (
                  <p className={styles.projectDescription}>
                    {project.subtitle}
                  </p>
                )}
              </div>

              {/* Technologies */}
              {project.techStack && project.techStack.length > 0 && (
                <div className={styles.technologies}>
                  {project.techStack.map((tech, index) => (
                    <span key={tech}>
                      {tech}
                      {index < project.techStack!.length - 1 && (
                        <span> • </span>
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Links */}
            <div className={styles.linkContainer}>
              {project.liveLink && (
                <Button
                  label="View Live"
                  icon="arrow-up-right"
                  href={project.liveLink}
                  target="_blank"
                />
              )}

              {project.githubLink && (
                <Button
                  label="Github"
                  icon="github"
                  type="secondary"
                  href={project.githubLink}
                  target="_blank"
                />
              )}

              {project.figmaLink && (
                <Button
                  label="Figma"
                  icon="figma"
                  type="secondary"
                  href={project.figmaLink}
                  target="_blank"
                />
              )}
            </div>
          </div>

          {/* Project Content */}
          <div className={styles.projectContent}>
            {/* Featured Image */}
            {featuredImageUrl && (
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
            {otherProjects.slice(0, 2).map((otherProject) => (
              <Project
                key={otherProject._id}
                title={otherProject.title ?? ""}
                subtitle={otherProject.type ?? ""}
                href={otherProject.slug?.current ?? ""}
                featuredImage={sanityImageUrl(otherProject.featuredImage)}
              />
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}
