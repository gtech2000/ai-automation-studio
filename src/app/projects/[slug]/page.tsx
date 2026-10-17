import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Layers,
  Lightbulb,
  Wrench,
} from "lucide-react";
import { PROJECTS, getProject } from "@/data/projects";
import { DemoPanel } from "@/components/demo-panel";
import { MediaGallery } from "@/components/media-gallery";
import { MetricCards } from "@/components/metric-cards";
import { WorkflowJson } from "@/components/workflow-json";
import { WorkflowDiagram } from "@/components/workflow-diagram";
import { CTABand } from "@/components/cta-band";
import { FadeIn } from "@/components/fade-in";

const STATUS_LABEL: Record<string, string> = {
  "live-demo": "Live demo available",
  "case-study": "Documented case study",
  concept: "Conceptual project",
};

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — AI Automation Studio`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <>
      {/* Header */}
      <section className="border-b border-stroke">
        <div className="container-page section-pad !pt-16">
          <FadeIn>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-accent-1"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All projects
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: project.accent }}
              >
                {STATUS_LABEL[project.status]}
              </span>
              <span className="text-sm text-grey">
                {project.demoLabel} · {project.stack.join(" · ")}
              </span>
            </div>

            <h1 className="h1 mt-4 max-w-3xl">{project.title}</h1>
            <p className="body-lg mt-4 max-w-2xl">{project.tagline}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Problem / Solution / Outcome */}
      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Wrench,
                title: "The problem",
                body: project.problem,
                accent: "#B42318",
              },
              {
                icon: Lightbulb,
                title: "The solution",
                body: project.solution,
                accent: project.accent,
              },
              {
                icon: Layers,
                title: "The outcome",
                body: project.outcome,
                accent: "#1A7F37",
              },
            ].map((block, i) => (
              <FadeIn
                key={block.title}
                delay={i * 0.08}
                className="card p-6"
              >
                <span
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${block.accent}14`,
                    color: block.accent,
                  }}
                >
                  <block.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="h3 !text-lg">{block.title}</h2>
                <p className="body mt-3 !text-[15px]">{block.body}</p>
              </FadeIn>
            ))}
          </div>

          {/* Metrics */}
          <div className="mt-14">
            <p className="eyebrow mb-6 text-center">Measured outcomes</p>
            <MetricCards metrics={project.metrics} />
          </div>
        </div>
      </section>

      {/* Workflow architecture */}
      <section className="border-y border-stroke bg-layer-1">
        <div className="container-page section-pad">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <p className="eyebrow">How it works</p>
              <h2 className="h2 mt-3">The n8n workflow, step by step</h2>
              <p className="body-lg mt-4">
                Each step is a logical group of n8n nodes. The full
                workflow JSON is available on request — credentials always
                excluded.
              </p>
            </FadeIn>
          </div>
          <div className="mt-14">
            <WorkflowDiagram steps={project.steps} />
          </div>
        </div>
      </section>

      {/* Workflow JSON */}
      {project.workflowFile && (
        <section className="border-b border-stroke bg-layer-1">
          <div className="container-page section-pad">
            <div className="mx-auto max-w-2xl text-center">
              <FadeIn>
                <p className="eyebrow">Under the hood</p>
                <h2 className="h2 mt-3">The real workflow JSON</h2>
                <p className="body-lg mt-4">
                  The actual n8n export — sanitized, downloadable, and
                  ready to import into your own workspace.
                </p>
              </FadeIn>
            </div>
            <div className="mx-auto mt-12 max-w-4xl">
              <FadeIn delay={0.1}>
                <WorkflowJson project={project} />
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* Screenshots */}
      {(project.media ?? []).filter((m) => m.type === "image").length >
        0 && (
        <section className="section-pad">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <FadeIn>
                <p className="eyebrow">Screenshots</p>
                <h2 className="h2 mt-3">The automation in action</h2>
                <p className="body-lg mt-4">
                  Key screens from the workflow — triggers, data
                  mapping, and the human review queue.
                </p>
              </FadeIn>
            </div>
            <div className="mt-12">
              <MediaGallery media={project.media ?? []} />
            </div>
          </div>
        </section>
      )}

      {/* Demo */}
      <section className="section-pad">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <p className="eyebrow flex items-center justify-center gap-2">
                <CalendarClock className="h-4 w-4" aria-hidden="true" />
                See it run
              </p>
              <h2 className="h2 mt-3">{project.demoLabel}</h2>
            </FadeIn>
          </div>
          <div className="mt-12">
            <DemoPanel project={project} />
          </div>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-center text-sm text-grey">
              Failure states (API timeouts, low-confidence answers,
              duplicate submissions) are handled inside the workflow —
              retries, queues, and human review paths are built in.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Project pager */}
      <section className="border-t border-stroke">
        <div className="container-page py-10">
          <nav
            aria-label="Project pager"
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <Link
              href={`/projects/${prev.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-accent-1"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              {prev.title}
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-accent-1"
            >
              {next.title}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </nav>
        </div>
      </section>

      <CTABand />
    </>
  );
}
