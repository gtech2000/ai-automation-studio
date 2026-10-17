import { SectionHeading } from "@/components/section-heading";
import { AUTHOR_NAME, CONTACT_EMAIL } from "@/data/projects";

const TOOLS = [
  "n8n",
  "OpenAI",
  "Google Workspace",
  "Telegram",
  "Notion",
  "Gmail",
  "Google Sheets",
  "Webhooks",
  "Slack",
  "REST APIs",
];

export function About() {
  return (
    <section id="about" className="section-pad scroll-mt-20">
      <div className="container-page">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <SectionHeading
              eyebrow="About"
              title={`${AUTHOR_NAME} — Automation engineer, n8n specialist`}
              align="left"
            />
            <p className="body-lg mt-6">
              I design and build AI automation systems for businesses that are
              ready to stop doing repetitive work by hand. My focus is
              practical: workflows that run reliably, agents that know their
              limits, and automations that pay for themselves.
            </p>
            <p className="body mt-4">
              Every project in this portfolio is a real automation pattern —
              each one shows the architecture, the tools involved, and the
              business outcome it produces. Where a live demo isn't possible,
              I document the workflow so you can see exactly how it works.
            </p>

            <div className="mt-8">
              <p className="eyebrow mb-3">Tools I automate with</p>
              <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
                {TOOLS.map((tool) => (
                  <li key={tool} className="chip">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center justify-center rounded-xl bg-accent-1 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-1/90"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div
            className="bg-grid relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-2xl border border-stroke"
            aria-hidden="true"
          >
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
            <div className="relative flex flex-col items-center gap-4 p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-1 text-white shadow-lg shadow-accent-1/30">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                    <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10.5H13l1-8.5Z" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-1/30 bg-accent-1-bg text-accent-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="rounded-xl border border-stroke bg-bg/80 px-5 py-3 font-mono text-xs text-text-secondary shadow-sm backdrop-blur">
                trigger → retrieve → reason → act → log
              </div>
              <p className="max-w-xs text-center text-sm text-grey">
                Every automation follows the same discipline: trigger, context,
                decision, action, audit trail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
