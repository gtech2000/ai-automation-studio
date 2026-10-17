"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export function DemoPanel({ project }: { project: Project }) {
  const isInteractive = project.demoType === "interactive";
  const media = project.media ?? [];
  const videos = media.filter((m) => m.type === "video");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="card overflow-hidden"
    >
      <div
        className="flex items-center justify-between border-b border-stroke px-6 py-4"
        style={{ backgroundColor: `${project.accent}10` }}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: project.accent }}
            aria-hidden="true"
          />
          <span className="text-sm font-semibold text-text-primary">
            {project.demoLabel}
          </span>
          <span className="rounded-full border border-stroke bg-bg px-2 py-0.5 text-xs text-grey">
            {isInteractive ? "testable" : "video"}
          </span>
        </div>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-layer-2" />
          <span className="h-2.5 w-2.5 rounded-full bg-layer-2" />
          <span className="h-2.5 w-2.5 rounded-full bg-layer-2" />
        </span>
      </div>

      {videos.length > 0 ? (
        <div className="grid gap-4 p-6 sm:grid-cols-2">
          {videos.map((v) => (
            <figure
              key={v.src}
              className="overflow-hidden rounded-xl border border-stroke bg-black"
            >
              <video
                src={v.src}
                controls
                playsInline
                preload="metadata"
                aria-label={v.alt}
                className="aspect-video w-full object-cover"
              />
              {v.caption && (
                <figcaption className="bg-bg px-3 py-2 text-xs text-text-secondary">
                  {v.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      ) : (
        <div className="bg-grid relative flex min-h-[280px] flex-col items-center justify-center gap-4 p-10 text-center">
          {isInteractive ? (
            <>
              <p className="body max-w-md">{project.demoHint}</p>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-dashed border-accent-1/40 bg-accent-1-bg px-5 py-3">
                <span className="text-sm font-medium text-accent-1">
                  Demo endpoint coming online — recorded walkthrough available
                  below
                </span>
              </div>
            </>
          ) : (
            <p className="body max-w-md">
              Recorded walkthrough: watch the full workflow run end to end,
              including the failure and retry paths.
            </p>
          )}
        </div>
      )}

      <div className="border-t border-stroke bg-layer-1 px-6 py-3">
        <p className="font-mono text-xs text-grey">
          status: {project.status} · demo: {project.demoType} · stack:{" "}
          {project.stack.join(" · ")}
          {videos.length > 0 && ` · ${videos.length} walkthrough video(s)`}
        </p>
      </div>
    </motion.div>
  );
}
