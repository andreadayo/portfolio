"use client";

import { useState } from "react";
import Project from "@/components/Project";
import Reveal from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";
import type { ProjectItem } from "@/lib/sanity";
import styles from "./styles.module.scss";

type Filter = "all" | "website" | "design" | "playground";

type ProjectWithImage = ProjectItem & {
  featuredImageUrl: string | null;
};

interface Props {
  projects: ProjectWithImage[];
}

export default function ProjectList({ projects }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const shownProjects = projects.filter((project) => project.isShown);

  const filteredProjects =
    filter === "all"
      ? shownProjects
      : shownProjects.filter((project) => project.type === filter);

  return (
    <>
      <div className={styles.filter}>
        <Reveal isInline>
          <button
            className={filter === "all" ? styles.active : ""}
            onClick={() => setFilter("all")}
          >
            <ScrambleText>All</ScrambleText>
          </button>
        </Reveal>

        <Reveal isInline delay={0.06}>
          <span>•</span>
        </Reveal>

        <Reveal isInline delay={0.12}>
          <button
            className={filter === "website" ? styles.active : ""}
            onClick={() => setFilter("website")}
          >
            <ScrambleText>Website</ScrambleText>
          </button>
        </Reveal>

        <Reveal isInline delay={0.18}>
          <span>•</span>
        </Reveal>

        <Reveal isInline delay={0.24}>
          <button
            className={filter === "design" ? styles.active : ""}
            onClick={() => setFilter("design")}
          >
            <ScrambleText>Design</ScrambleText>
          </button>
        </Reveal>

        <Reveal isInline delay={0.3}>
          <span>•</span>
        </Reveal>

        <Reveal isInline delay={0.36}>
          <button
            className={filter === "playground" ? styles.active : ""}
            onClick={() => setFilter("playground")}
          >
            <ScrambleText>Playground</ScrambleText>
          </button>
        </Reveal>
      </div>

      {filteredProjects.length > 0 ? (
        <div className={styles.projectsList}>
          {filteredProjects.map((project, index) => (
            <Reveal key={project._id} delay={index * 0.12}>
              <Project
                title={project.title ?? ""}
                subtitle={project.subtitle ?? ""}
                href={project.slug?.current ?? ""}
                featuredImage={project.featuredImageUrl}
              />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className={styles.emptyState}>
          {filter === "all"
            ? "Projects coming soon."
            : `${filter.charAt(0).toUpperCase()}${filter.slice(1)} projects coming soon.`}
        </p>
      )}
    </>
  );
}
