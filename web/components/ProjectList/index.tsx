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
      <Reveal>
        <div className={styles.filter}>
          <button
            className={filter === "all" ? styles.active : ""}
            onClick={() => setFilter("all")}
          >
            <ScrambleText>All</ScrambleText>
          </button>

          <span>•</span>

          <button
            className={filter === "website" ? styles.active : ""}
            onClick={() => setFilter("website")}
          >
            <ScrambleText>Website</ScrambleText>
          </button>

          <span>•</span>

          <button
            className={filter === "design" ? styles.active : ""}
            onClick={() => setFilter("design")}
          >
            <ScrambleText>Design</ScrambleText>
          </button>

          <span>•</span>

          <button
            className={filter === "playground" ? styles.active : ""}
            onClick={() => setFilter("playground")}
          >
            <ScrambleText>Playground</ScrambleText>
          </button>
        </div>
      </Reveal>

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
