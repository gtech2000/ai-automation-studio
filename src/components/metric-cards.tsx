"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export function MetricCards({
  metrics,
}: {
  metrics: Project["metrics"];
}) {
  return (
    <dl className="grid gap-4 sm:grid-cols-3">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.35,
            delay: i * 0.07,
            ease: "easeOut",
          }}
          className="card p-5 text-center"
        >
          <dt className="text-sm text-grey">{metric.label}</dt>
          <dd className="mt-1.5 text-3xl font-semibold tracking-tight text-accent-1">
            {metric.value}
          </dd>
        </motion.div>
      ))}
    </dl>
  );
}
