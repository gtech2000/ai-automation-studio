"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Workflow,
  Plug,
  BarChart3,
  ClipboardCheck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { CONTACT_EMAIL } from "@/data/projects";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  deliverable: string;
}

const SERVICES: Service[] = [
  {
    icon: Bot,
    title: "AI Agents & Assistants",
    description:
      "Agents that answer questions, qualify leads, and draft replies — grounded in your documents and your rules.",
    deliverable: "RAG agent, tool-calling agent, approval-gated assistant",
  },
  {
    icon: Workflow,
    title: "Business Workflow Automation",
    description:
      "Multi-step n8n workflows that move data between your tools, with branching logic, retries, and error handling.",
    deliverable: "Documented, tested, deployable workflow",
  },
  {
    icon: Plug,
    title: "API & System Integrations",
    description:
      "Connect CRMs, sheets, email, and messaging tools so data flows automatically between systems.",
    deliverable: "Webhook, REST, and scheduled integrations",
  },
  {
    icon: BarChart3,
    title: "AI Reporting & Insights",
    description:
      "Scheduled reports that summarize trends, flag anomalies, and land in your inbox before you open your laptop.",
    deliverable: "Automated report with plain-language summary",
  },
  {
    icon: ClipboardCheck,
    title: "Automation Audits",
    description:
      "Review existing automations for failure points, cost, and security — then harden them.",
    deliverable: "Audit report with prioritized fixes",
  },
];

export function Services() {
  return (
    <section id="services" className="section-pad scroll-mt-20 bg-layer-1">
      <div className="container-page">
        <SectionHeading
          eyebrow="Services"
          title="What I can automate for you"
          description="From a single workflow to a full automation system — scoped, built, and handed over with documentation."
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.35,
                delay: i * 0.06,
                ease: "easeOut",
              }}
              className="card flex flex-col p-6 transition-shadow hover:shadow-lg hover:shadow-black/5"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-1-bg text-accent-1">
                <service.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="h3 !text-lg">{service.title}</h3>
              <p className="body mt-2 flex-1">{service.description}</p>
              <p className="mt-4 border-t border-stroke pt-3 font-mono text-xs text-grey">
                → {service.deliverable}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-10 flex justify-center"
        >
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Automation%20project%20inquiry`}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-1 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-1/90"
          >
            Discuss your process
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
