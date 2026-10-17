import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { AUTHOR_NAME, CONTACT_EMAIL } from "@/data/projects";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-stroke bg-layer-1">
      <div className="container-page section-pad !py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="h3">{AUTHOR_NAME}</p>
            <p className="text-sm text-grey">AI Automation Studio</p>
            <p className="body mt-3">
              AI agents and business automation built with n8n. I help teams
              turn repetitive work into reliable workflows.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/#projects" className="body hover:text-accent-1">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#services" className="body hover:text-accent-1">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#about" className="body hover:text-accent-1">
                  About
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="body hover:text-accent-1"
                >
                  Email me
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">Follow along</p>
            <div className="flex gap-3">
              {[
                { label: "GitHub", icon: Github, href: "https://github.com" },
                { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/bolaji-gbenga-5a81871a5/" },
                { label: "Twitter / X", icon: Twitter, href: "https://x.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-stroke bg-bg text-text-secondary transition-colors hover:border-accent-1 hover:text-accent-1"
                >
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-stroke pt-6 text-sm text-grey sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} AI Automation Studio. Built with n8n-powered workflows.</p>
          <p>Designed as a living portfolio — demos labeled by project status.</p>
        </div>
      </div>
    </footer>
  );
}
