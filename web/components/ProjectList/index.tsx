"use client";
import { useState } from "react";
import Project from "@/components/Project";
import type { ProjectItem } from "@/lib/sanity";
import styles from "./styles.module.scss";
type Filter = "all" | "website" | "design" | "playground";
type ProjectWithImage = ProjectItem & { featuredImageUrl: string | null };
interface Props {
  projects: ProjectWithImage[];
}
export default function ProjectList({ projects }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.type === filter);

  return (
    <>
      <div className={styles.filter}>
        <button
          className={filter === "all" ? styles.active : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <span>•</span>
        <button
          className={filter === "website" ? styles.active : ""}
          onClick={() => setFilter("website")}
        >
          Website
        </button>
        <span>•</span>
        <button
          className={filter === "design" ? styles.active : ""}
          onClick={() => setFilter("design")}
        >
          Design
        </button>
        <span>•</span>
        <button
          className={filter === "playground" ? styles.active : ""}
          onClick={() => setFilter("playground")}
        >
          Playground
        </button>
      </div>
      <div className={styles.projectsList}>
        {filteredProjects.map((project) => (
          <Project
            key={project._id}
            title={project.title ?? ""}
            subtitle={project.type ?? ""}
            href={project.slug?.current ?? ""}
            featuredImage={project.featuredImageUrl}
          />
        ))}
      </div>
    </>
  );
}
