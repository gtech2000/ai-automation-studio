import { Mail, Clock, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/fade-in";
import { CONTACT_EMAIL } from "@/data/projects";

const ASSURANCES = [
  {
    icon: Clock,
    title: "One business day",
    text: "Every inquiry is read personally and answered within one business day.",
  },
  {
    icon: ShieldCheck,
    title: "Scoped first",
    text: "Before any commitment, you get a clear scope, timeline, and fixed price.",
  },
  {
    icon: Mail,
    title: "No forms required",
    text: "Prefer email? Write directly — the form above simply saves you a typing step.",
  },
];

export const metadata = {
  title: "Contact — AI Automation Studio",
  description:
    "Discuss an AI automation project, n8n workflow, or freelance opportunity.",
};

export default function ContactPage() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="eyebrow">Contact</p>
            <h1 className="h2 mt-3">Let&apos;s automate your work</h1>
            <p className="body-lg mt-4">
              Describe the process that eats your team&apos;s time. I&apos;ll
              reply with whether n8n fits, a rough scope, and what it would
              unlock.
            </p>
          </FadeIn>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {ASSURANCES.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.07} className="card p-6">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-1-bg text-accent-1">
                <a.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="h3 !text-base">{a.title}</h2>
              <p className="body mt-2 !text-sm">{a.text}</p>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-12 flex justify-center">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 rounded-xl border border-stroke bg-bg px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-layer-1"
          >
            <Mail className="h-4 w-4 text-accent-1" aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
