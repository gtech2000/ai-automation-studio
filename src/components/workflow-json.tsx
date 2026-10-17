"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Braces,
  ChevronDown,
  ChevronRight,
  Download,
  FileJson,
  ShieldAlert,
} from "lucide-react";
import type { Project } from "@/data/projects";

interface N8nNode {
  name?: string;
  type?: string;
}

/* Lightweight JSON syntax highlighter — tokenizes the pretty-printed
   string into colored spans (no heavy dependencies). */
const JSON_TOKEN =
  /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;

function highlight(json: string) {
  const parts: { text: string; cls: string }[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = JSON_TOKEN.exec(json)) !== null) {
    if (m.index > last)
      parts.push({ text: json.slice(last, m.index), cls: "text-text-primary" });
    if (m[1] !== undefined) {
      const isKey = m[2] !== undefined;
      parts.push({
        text: m[1],
        cls: isKey ? "text-accent-1" : "text-[#0E9F6E]",
      });
      if (m[2]) parts.push({ text: m[2], cls: "text-text-primary" });
    } else if (m[3] !== undefined) {
      parts.push({ text: m[3], cls: "text-[#D97706]" });
    } else if (m[4] !== undefined) {
      parts.push({ text: m[4], cls: "text-[#0284C7]" });
    }
    last = m.index + m[0].length;
  }
  if (last < json.length)
    parts.push({ text: json.slice(last), cls: "text-text-primary" });
  return parts;
}

function nodeTypeLabel(type?: string) {
  if (!type) return "Node";
  const base = type.split(".").pop() ?? type;
  return base.replace(/^n8n-nodes-base\./, "");
}

export function WorkflowJson({ project }: { project: Project }) {
  const [workflow, setWorkflow] = useState<Record<string, unknown> | null>(
    null,
  );
  const [loadError, setLoadError] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  useEffect(() => {
    if (!project.workflowFile) return;
    fetch(project.workflowFile)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => setWorkflow(data))
      .catch(() => setLoadError(true));
  }, [project.workflowFile]);

  const nodes = (workflow?.nodes as N8nNode[] | undefined) ?? [];
  const connections = workflow?.connections;
  const connectionCount = connections
    ? Object.values(connections as Record<string, unknown>).filter(Boolean)
        .length
    : 0;
  const rawJson = workflow ? JSON.stringify(workflow, null, 2) : "";
  const tokens = showRaw ? highlight(rawJson) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="card overflow-hidden"
    >
      {/* Header */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-6 py-4"
        style={{ backgroundColor: `${project.accent}10` }}
      >
        <div className="flex items-center gap-2.5">
          <FileJson
            className="h-5 w-5"
            style={{ color: project.accent }}
            aria-hidden="true"
          />
          <span className="text-sm font-semibold text-text-primary">
            n8n workflow export
          </span>
        </div>
        {project.workflowFile && (
          <a
            href={project.workflowFile}
            download
            className="inline-flex items-center gap-1.5 rounded-lg border border-stroke bg-bg px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:bg-layer-1"
            aria-label={`Download ${project.title} workflow JSON`}
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Download .json
          </a>
        )}
      </div>

      <div className="p-6">
        {loadError ? (
          <p className="body">
            Workflow file not found — add the export to{" "}
            <code className="rounded bg-layer-1 px-1.5 py-0.5 font-mono text-xs">
              public/workflows/
            </code>
          </p>
        ) : workflow ? (
          <>
            {/* Summary */}
            <dl className="mb-5 grid grid-cols-3 gap-4">
              <div>
                <dt className="text-xs text-grey">Nodes</dt>
                <dd className="mt-1 text-2xl font-semibold text-text-primary">
                  {nodes.length}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-grey">Connections</dt>
                <dd className="mt-1 text-2xl font-semibold text-text-primary">
                  {connectionCount}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-grey">File size</dt>
                <dd className="mt-1 text-2xl font-semibold text-text-primary">
                  {(new Blob([rawJson]).size / 1024).toFixed(1)} KB
                </dd>
              </div>
            </dl>

            {/* Node map */}
            <p className="eyebrow mb-3">Node map</p>
            <ol className="flex flex-wrap gap-2">
              {nodes.map((node, i) => (
                <li
                  key={`${node.name}-${i}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-stroke bg-layer-1 px-2.5 py-1 font-mono text-xs text-text-secondary"
                >
                  <Braces className="h-3 w-3 text-accent-1" aria-hidden="true" />
                  {node.name ?? "Unnamed"}
                  <span className="text-grey">·</span>
                  <span className="text-grey">
                    {nodeTypeLabel(node.type)}
                  </span>
                </li>
              ))}
            </ol>

            {/* Raw JSON toggle */}
            <button
              type="button"
              onClick={() => setShowRaw((v) => !v)}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-1 hover:underline"
              aria-expanded={showRaw}
            >
              {showRaw ? (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              )}
              {showRaw ? "Hide raw JSON" : "View raw JSON"}
            </button>

            {showRaw && (
              <pre className="mt-3 max-h-96 overflow-auto rounded-xl border border-stroke bg-[#1C1C1C] p-4 font-mono text-xs leading-relaxed text-[#E5E5E5]">
                <code>
                  {tokens.map((t, i) => (
                    <span key={i} className={t.cls}>
                      {t.text}
                    </span>
                  ))}
                </code>
              </pre>
            )}

            {/* Security note */}
            <p className="mt-5 flex items-start gap-2 rounded-xl border border-warning/30 bg-[#FFF8E6] px-4 py-3 text-xs text-warning">
              <ShieldAlert
                className="mt-0.5 h-4 w-4 shrink-0"
                aria-hidden="true"
              />
              This export was sanitized before publishing — credentials are
              stripped. Always run the sanitizer before adding a new export:{" "}
              <code className="rounded bg-white px-1 py-0.5 font-mono">
                node scripts/sanitize-n8n-json.js input.json
              </code>
            </p>
          </>
        ) : (
          <p className="body">Loading workflow…</p>
        )}
      </div>
    </motion.div>
  );
}
