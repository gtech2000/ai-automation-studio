# AI Automation Studio

Portfolio website for an n8n AI automation expert — showcases AI agents, intelligent workflows, and business automation case studies.

## Stack

- **Next.js 15** (App Router, React 19) · **TypeScript** (strict)
- **Tailwind CSS** with a token-based design system (Default System, light mode)
- **Framer Motion 12** for entrance/scroll animations
- **Lucide** icons

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
```

## Structure

```
src/
├── app/
│   ├── layout.tsx            # shell: navbar + footer + skip link
│   ├── page.tsx              # home: hero, projects, services, about, CTA
│   ├── contact/page.tsx      # contact form with validation + email fallback
│   ├── projects/[slug]/      # case study: problem/solution/outcome, metrics,
│   │                         # n8n workflow diagram, JSON viewer, screenshots,
│   │                         # demo panel
│   └── not-found.tsx
├── components/
│   ├── fade-in.tsx           # reusable scroll-reveal wrapper (client)
│   ├── hero / project-card / services / about / cta-band / footer / navbar
│   ├── workflow-diagram.tsx  # numbered n8n node-step diagram
│   ├── workflow-json.tsx     # sanitized n8n export viewer + download
│   ├── media-gallery.tsx     # screenshot gallery
│   ├── demo-panel.tsx        # video walkthroughs + status labeling
│   └── metric-cards.tsx      # outcome metrics
└── data/
    └── projects.ts           # all 5 case studies (edit here to personalize)

public/
├── media/                    # screenshots + walkthrough videos
└── workflows/                # sanitized n8n workflow JSON exports

scripts/
└── sanitize-n8n-json.js      # strips credentials from n8n exports
```

## Personalize

1. `src/data/projects.ts` — edit projects, metrics, workflow steps, stack
2. `src/data/projects.ts` → `CONTACT_EMAIL` — your email
3. Footer social links (`src/components/footer.tsx`)
4. Contact form endpoint (`src/components/contact-form.tsx`) — wire to Formspree/Baserow/n8n webhook
5. **Add your n8n exports** — drop sanitized JSON in `public/workflows/`, set `workflowFile` on the project (see `public/workflows/README.md`)
6. **Add screenshots/videos** — drop files in `public/media/`, set `media` on the project (see `public/media/README.md`)

### Publishing an n8n export safely

```bash
# strips credentials, pinData, meta, versionId before publishing
node scripts/sanitize-n8n-json.js ~/Downloads/workflow.json public/workflows/my-workflow.json
```

## Notes

- Motion is confined to Client Components (Framer Motion 12 requires it); pages stay Server Components and animate via the `FadeIn` wrapper.
- Design tokens live in `src/app/globals.css` (`:root` RGB channels) + `tailwind.config.js`.
- Every project is labeled by status: **Live demo**, **Case study**, or **Concept** so visitors never confuse completed vs conceptual work.

See `PRD.md` for the full product requirements and Mobbin research.
