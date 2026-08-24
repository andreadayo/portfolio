import Image from "next/image";
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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projects = await getProjects();

  const otherProjects = projects.filter((item) => item._id !== project._id);

  const featuredImageUrl = sanityImageUrl(project.featuredImage);

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
            <span className={styles.active}>{project.title}</span>
          </div>

          {/* Project Header */}
          <div className={styles.projectHeader}>
            <div className={styles.projectDetails}>
              <h1 className={styles.projectTitle}>{project.title}</h1>

              {project.subtitle && (
                <p className={styles.projectDescription}>{project.subtitle}</p>
              )}

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
            {otherProjects.map((otherProject) => (
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
