"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, PlayCircle, FileText } from "lucide-react";
import type { Project } from "@/data/projects";

const STATUS_STYLES: Record<Project["status"], { label: string; classes: string }> = {
  "live-demo": {
    label: "Live demo",
    classes: "border-accent-1/30 bg-accent-1-bg text-accent-1",
  },
  "case-study": {
    label: "Case study",
    classes: "border-stroke bg-layer-1 text-text-secondary",
  },
  concept: {
    label: "Concept",
    classes: "border-stroke bg-layer-2 text-grey",
  },
};

function ProjectArt({ project }: { project: Project }) {
  const Icon = {
    Headset: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8">
        <path d="M4 13a8 8 0 0 1 16 0" strokeLinecap="round" />
        <rect x="3" y="13" width="4" height="6" rx="1.5" />
        <rect x="17" y="13" width="4" height="6" rx="1.5" />
        <path d="M20 19a3 3 0 0 1-3 3h-3" strokeLinecap="round" />
      </svg>
    ),
    Briefcase: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" strokeLinecap="round" />
        <path d="M3 13h18" strokeLinecap="round" />
      </svg>
    ),
    CalendarClock: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M8 2v4M16 2v4M3 10h18" strokeLinecap="round" />
        <path d="M12 14v3l2 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    UserCheck: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8">
        <circle cx="10" cy="8" r="3.5" />
        <path d="M4 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
        <path d="m16.5 14.5 2 2 3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Mail: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    PenLine: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8">
        <path d="M12 20h9" strokeLinecap="round" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    BarChart3: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8">
        <path d="M4 20V10" strokeLinecap="round" />
        <path d="M10 20V4" strokeLinecap="round" />
        <path d="M16 20v-7" strokeLinecap="round" />
        <path d="M22 20H2" strokeLinecap="round" />
      </svg>
    ),
  }[project.icon] ?? (() => null);

  return (
    <div
      className="flex h-28 items-center justify-center sm:h-36 lg:h-24"
      style={{ backgroundColor: `${project.accent}14`, color: project.accent }}
      aria-hidden="true"
    >
      <span className="transition-transform lg:scale-90">
        <Icon />
      </span>
    </div>
  );
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const status = STATUS_STYLES[project.status];
  const DemoIcon =
    project.demoType === "interactive" ? PlayCircle : FileText;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-lg hover:shadow-black/5"
    >
      <ProjectArt project={project} />

      <div className="flex flex-1 flex-col p-5 lg:p-4">
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.classes}`}
          >
            {status.label}
          </span>
        </div>

        <h3 className="h3 !text-lg lg:!text-base group-hover:text-accent-1">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="body mt-2 line-clamp-2 flex-1 lg:text-sm">
          {project.tagline}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span key={tech} className="chip !py-0.5 !text-xs">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-stroke pt-3">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary">
            <DemoIcon className="h-4 w-4" aria-hidden="true" />
            {project.demoLabel}
          </span>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-1 transition-transform group-hover:translate-x-0.5"
            aria-label={`View case study for ${project.title}`}
          >
            View case study
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function ExternalDemoLink({ project }: { project: Project }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-grey">
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
      {project.demoLabel}
    </span>
  );
}
