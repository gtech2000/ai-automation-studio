# PRD — AI Automation Studio Portfolio (n8n AI Automation Expert)

> Product Requirements Document + Mobbin Research Summary
> Date: 2026-10-10 · Status: Ready for build

---

## 1. Product Overview

**Product**: A professional portfolio website for an n8n AI automation expert.
**Purpose**: Showcase real AI automation projects (built with n8n), attract freelance clients, jobs, and agency opportunities.
**Audience**:
- Primary: business owners, freelance clients, recruiters
- Secondary: developers, automation agencies, technical collaborators

**Core promise** (from problem statement): demonstrate *what I build*, *how it works*, and *what business problem it solves* — not just workflow screenshots.

---

## 2. Mobbin Research Summary

### Research Goal
Identify UI patterns for a personal portfolio site that showcases AI automation case studies and converts visitors into clients.

### Searches Used (Mobbin MCP, platform: web)
| Query | Top references |
|---|---|
| Portfolio hero with headline + CTA | Readymag, Squarespace, Contra, Unseen Studio, Shopify |
| Case study detail with metrics + tags | Kajabi, Tailscale, FLORA, Webflow, HubSpot, Mixpanel, Customer.io |
| Services grid with icon cards | Fibery, Anima, FARFETCH, Fiasco, MindMarket, Intercom, Retool |
| Contact section with form | Seasats, NEON, Savor, Framer, YLLW, Oevra |
| About section with bio + skills | GitHub, Shopify, Linear, Wise, Calm |
| Footer with nav + socials | Trawelt, Supabase, Going, Epidemic Sound |

### Key Mobbin references
- Hero: [Contra](https://mobbin.com/sites/sections/2e521a53-0338-4afe-a4a6-086e71cb7ab4), [Squarespace](https://mobbin.com/sites/sections/1d20fb5e-0196-4e6d-b1f2-c0d2caf79e22)
- Case studies: [Tailscale](https://mobbin.com/sites/sections/84f94fa1-216c-40e9-aa21-d4b6e8039f5b), [HubSpot](https://mobbin.com/sites/sections/4a166782-516b-4311-824e-f8410713b523), [Mixpanel](https://mobbin.com/sites/sections/e6f6cfe2-cf9e-4cb4-9f91-b71b6cea4651)
- Services: [Retool](https://mobbin.com/sites/sections/afb07e77-6625-48ab-af62-cdb1bdc4cc17), [Intercom](https://mobbin.com/sites/sections/42ce008e-b8ee-4f4f-a14e-d0fc4e27ff0f)
- Contact: [Framer](https://mobbin.com/sites/sections/da7d69f4-2eed-4c34-8994-1c9da5211d0f), [NEON](https://mobbin.com/sites/sections/fa474866-416b-4b77-96fc-aab40ce5b108)
- About: [Linear](https://mobbin.com/sites/sections/82c5e72f-ad2a-4d51-9b42-cd220dedfffc), [GitHub](https://mobbin.com/sites/sections/10928b8e-852d-4424-b248-8028e8ff92d5)
- Footer: [Supabase](https://mobbin.com/sites/sections/c35f2620-05d0-4908-a329-ceae5d2890ff)

### Pattern clusters observed
1. **Hero**: single bold headline, one-line subhead, one primary CTA ("Explore Projects") + one secondary link (e.g. "Book a call"). Minimal nav.
2. **Case studies**: project image → problem/solution/outcome structure → tech-stack tags → measurable outcome metrics (time saved, leads processed).
3. **Services**: 3–5 icon cards with title + one-line description + "Learn more" link.
4. **Contact**: short headline, direct email displayed prominently (fallback when form fails), form with name/email/message + submit state feedback.
5. **About**: bio paragraph + skill/tool chips (n8n, OpenAI, Google Sheets…) + social links.
6. **Footer**: simple — nav links, socials, copyright.

### Recommendations applied to this build
- Light-mode, neutral palette with a single strong accent (Default System tokens) — matches Linear/Tailscale/Webflow references.
- Every project gets: tags, architecture stack, outcome metric, and clear "View Case Study" affordance (never confuse a screenshot with an interactive demo — label demos explicitly).
- Contact always shows a direct email fallback (failure-flow requirement).
- Each project is marked **Live demo** vs **Case study** vs **Concept** so visitors never confuse completed vs conceptual work.

---

## 3. Website Structure (Information Architecture)

**Pages**
1. **Home** (`/`)
   - Sticky nav: Logo "AI Automation Studio", Projects, Services, About, Contact
   - Hero: "I Build AI Systems That Automate Business Work." + subhead + CTAs (Explore Projects →, Get in touch)
   - Featured Automations: 4 project cards (Customer Support Agent, Lead Qualification, Email Automation, AI Reporting)
   - Services: 5 service cards (AI agents, workflow automation, integrations, AI reporting, automation audits)
   - About: bio + tool chips (n8n, OpenAI, Google Workspace, Telegram, Notion, Zapier alternative positioning)
   - CTA band: "Have a process you want automated?"
   - Footer
2. **Project case study** (`/projects/[slug]`)
   - Hero: project title, status badge, hero image/animation
   - The problem, The solution, How it works (numbered workflow steps with node diagram)
   - Tech stack tags, Outcome metrics, Demo section (interactive test or recorded walkthrough)
   - "Want something similar?" CTA → contact
3. **Contact** (`/contact`)
   - Form (name, email, company, budget range, message) with validation + success/error states
   - Direct email fallback, response-time expectation

**Projects data model** (5 projects from PRD brief):
1. **AI Customer Support Agent** — RAG over business docs, escalation to human. n8n · OpenAI · Google Drive · Telegram
2. **AI Lead Qualification System** — webhook capture → AI scoring → CRM/Sheets. n8n · Webhooks · OpenAI · Google Sheets
3. **AI Email Assistant** — classify, summarize, draft replies for approval. n8n · Gmail · OpenAI
4. **AI Content Automation** — generate → approval routing → schedule. n8n · OpenAI · Notion · Social APIs
5. **AI Business Reporting Agent** — retrieve data → summarize → scheduled email reports. n8n · Google Sheets · OpenAI · Gmail

Each project: slug, title, tagline, description, problem, solution, steps[], stack[], metrics[], status (live-demo | case-study | concept), demoType (interactive | video), thumbnail.

---

## 4. UX Requirements

### Job stories
- Client visits → understands services → decides to hire
- Recruiter reviews → sees real workflows → assesses technical ability
- Visitor explores project → sees workflow + demo + outcome
- Visitor wants similar automation → contacts with requirements

### Flows
- **Primary**: Home → Projects → Case study → Demo → Contact
- **Alternate**: Recruiter → GitHub link; Business owner → Services → Contact; Technical visitor → architecture section
- **Failure**: Demo unavailable → recorded walkthrough; Form fails → direct email; External link down → retain case study + architecture diagram

### Edge cases & states
- Empty/invalid form submissions → inline validation
- Demo API unavailable → graceful fallback panel with recorded walkthrough
- AI cost/rate limits → note on demo page; retry button on timeout
- Every interactive demo is clearly labeled vs screenshots
- `prefers-reduced-motion` respected

---

## 5. Non-functional requirements
- Next.js (App Router) + TypeScript strict + Tailwind CSS
- Design tokens from Default System (light mode): bg #FFFFFF, layer-1 #F7F7F7, layer-2 #EFEFEF, stroke #F7F7F7, accent-1 #564CD8, accent-1-bg #ECEBFF, text #252525/#515151, grey #828282
- Framer Motion for entrance/micro-interactions (150–350ms UI, ≤600ms page reveals, spring for interactive elements)
- Lucide icons
- Responsive: mobile-first, 3 breakpoints
- Accessibility: semantic HTML, focus rings, aria labels on forms, alt text, keyboard navigable
- No hardcoded secrets; contact form posts to an endpoint (or mailto fallback)
- Performance: optimized images, lazy loading below fold

---

## 6. Success metrics (from brief)
| Metric | Goal |
|---|---|
| Completed case studies | 3+ (5 planned) |
| Working demonstrations | 2 |
| Portfolio contact conversion | Measure baseline |
| Demo execution success rate | 95%+ |
| Avg workflow processing time | Per project |

---

## 7. Build sequence
1. Design tokens + primitives (buttons, cards, badges, section shells)
2. Data layer: projects content model (5 case studies)
3. Home page sections
4. Case study pages with workflow diagrams
5. Contact page with validation
6. Motion polish + a11y pass + responsive QA

---

## 8. Open questions
- Which projects become *live interactive demos* vs documented case studies first? (Recommended: Lead Qualification first per brief §7)
- Real name/photo/email to personalize? (Placeholders used: update `src/data/*`)
