import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <section id="projects" className="section-pad scroll-mt-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Featured automations"
          title="Real workflows, real business outcomes"
          description="Each project shows the problem, the n8n workflow that solves it, and the measurable result — not just screenshots."
          align="center"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.slice(0, 4).map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-grey">
          More automations in the pipeline —{" "}
          <a
            href="/#projects"
            className="font-medium text-accent-1 hover:underline"
          >
            view all {PROJECTS.length} projects
          </a>
        </p>
      </div>
    </section>
  );
}
