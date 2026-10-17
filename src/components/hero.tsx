"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot } from "lucide-react";
import Link from "next/link";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-stroke">
      {/* Automation background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/media/hero-automation.jpg')" }}
      />
      {/* Readability overlay — adapts to light/dark mode via tokens */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-bg/95 via-bg/85 to-bg"
      />
      {/* Tech grid, masked to a soft pool */}
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />
      <div className="container-page relative section-pad text-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-accent-1/20 bg-accent-1-bg px-4 py-1.5 normal-case tracking-normal text-accent-1"
          >
            <Bot className="h-4 w-4" aria-hidden="true" />
            n8n AI Automation Expert
          </motion.p>

          <motion.h1 variants={item} className="h1 mx-auto max-w-3xl">
            I Build AI Systems That Automate Business Work.
          </motion.h1>

          <motion.p variants={item} className="body-lg mx-auto mt-6 max-w-2xl">
            AI agents, intelligent workflows, and business automation built with
            n8n — designed to save hours, cut errors, and scale without adding
            headcount.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="#projects"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-1 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-accent-1/90 sm:w-auto"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-xl border border-stroke bg-bg px-7 py-3.5 text-base font-medium text-text-primary transition-colors hover:bg-layer-1 sm:w-auto"
            >
              Get in touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
