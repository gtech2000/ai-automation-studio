"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTABand() {
  return (
    <section className="relative overflow-hidden border-t border-stroke bg-accent-1">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="container-page relative section-pad !py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h2 className="h2 !text-white">
            Have a process you want automated?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/85">
            Tell me about the task your team repeats every week. I&apos;ll
            map it to an n8n automation and show you a working workflow.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-medium text-accent-1 transition-transform hover:-translate-y-0.5"
          >
            Let&apos;s discuss your automation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="mt-5 text-sm text-white/70">
            Typical response within 1 business day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
