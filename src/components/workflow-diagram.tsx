"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { WorkflowStep } from "@/data/projects";

export function WorkflowDiagram({ steps }: { steps: WorkflowStep[] }) {
  return (
    <ol className="relative flex flex-col gap-10 md:gap-0 md:workflow-line md:flex-row md:gap-0">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="relative md:flex-1 md:first:pl-0 md:pl-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.4,
              delay: i * 0.08,
              ease: "easeOut",
            }}
            className="flex gap-4 md:flex-col md:gap-0"
          >
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent-1 bg-bg font-mono text-sm font-semibold text-accent-1 md:mb-4">
              {i + 1}
            </div>
            <div className="md:pl-0">
              <h3 className="h3 !text-base">{step.title}</h3>
              <p className="body mt-1.5 !text-sm">{step.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {step.nodes.map((node) => (
                  <span
                    key={node}
                    className="inline-flex items-center gap-1 rounded-md border border-stroke bg-layer-1 px-2 py-1 font-mono text-xs text-text-secondary"
                  >
                    <Check
                      className="h-3 w-3 text-accent-1"
                      aria-hidden="true"
                    />
                    {node}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </li>
      ))}
    </ol>
  );
}
