import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";

export const metadata = {
  title: "Page not found — AI Automation Studio",
};

export default function NotFound() {
  return (
    <section className="section-pad">
      <div className="container-page text-center">
        <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-1 text-white">
          <Zap className="h-7 w-7" aria-hidden="true" />
        </span>
        <h1 className="h1">404 — Off the workflow path</h1>
        <p className="body-lg mx-auto mt-4 max-w-md">
          This page isn&apos;t automated yet. Head back to the
          projects to see what I build.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent-1 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-1/90"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to portfolio
        </Link>
      </div>
    </section>
  );
}
