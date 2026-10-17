export type ProjectStatus = "live-demo" | "case-study" | "concept";
export type DemoType = "interactive" | "recorded" | "none";

export interface ProjectMedia {
  type: "image" | "video";
  /** Local path under /public (e.g. "/media/lead-qualification-1.png") or a full URL */
  src: string;
  alt: string;
  caption?: string;
}

export interface WorkflowStep {
  title: string;
  description: string;
  nodes: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  demoType: DemoType;
  demoLabel: string;
  accent: string;
  icon: string;
  problem: string;
  solution: string;
  outcome: string;
  steps: WorkflowStep[];
  stack: string[];
  metrics: { label: string; value: string }[];
  demoHint?: string;
  /** Screenshots and walkthrough videos — drop files in /public/media/ */
  media?: ProjectMedia[];
  /** Sanitized n8n workflow export — drop in /public/workflows/ */
  workflowFile?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "monthly-meeting-reminder",
    title: "Monthly Meeting Reminder",
    tagline:
      "Checks the calendar for the meeting date, creates the meeting with a link, pulls attendee emails from Notion, and sends the invite to everyone.",
    status: "case-study",
    demoType: "recorded",
    demoLabel: "Recorded walkthrough",
    accent: "#0D9488",
    icon: "CalendarClock",
    problem:
      "Every month was the same manual dance: check the calendar for the meeting date, create the meeting with a link, dig through Notion for attendee mail information, then send the invite to each attendee by hand. Easy to forget, easy to get wrong.",
    solution:
      "A scheduled n8n workflow runs every month: it checks the calendar for the meeting date, creates the meeting with a video link, queries Notion for attendee mail information, and sends the meeting invite to every attendee automatically — link included.",
    outcome:
      "The meeting is scheduled, the link is created, and every attendee gets their invite — without anyone repeating the same manual steps each month.",
    steps: [
      {
        title: "Run monthly",
        description:
          "A schedule trigger fires on the meeting day, every month.",
        nodes: ["Schedule", "Cron"],
      },
      {
        title: "Check the calendar",
        description:
          "The workflow reads the calendar to find the meeting date.",
        nodes: ["Google Calendar", "Search Events"],
      },
      {
        title: "Create the meeting",
        description:
          "A calendar event is created with a video/conference link attached.",
        nodes: ["Google Calendar", "Create Event", "Meet Link"],
      },
      {
        title: "Pull attendee info",
        description:
          "Notion is queried for the attendee mail information.",
        nodes: ["Notion", "Query Database"],
      },
      {
        title: "Send the invites",
        description:
          "Every attendee receives the meeting email with the link.",
        nodes: ["Gmail", "Send Email"],
      },
    ],
    stack: ["n8n", "Google Calendar", "Notion", "Gmail"],
    metrics: [
      { label: "Invites sent", value: "100%" },
      { label: "Manual steps", value: "0" },
      { label: "Runs", value: "monthly" },
      { label: "Missed invites", value: "0" },
    ],
    demoHint: "Watch the monthly run — from calendar check to sent invites.",
    media: [
      {
        type: "image",
        src: "/media/monthly-meeting-reminder-1.png",
        alt: "Monthly meeting reminder automation workflow",
        caption: "The meeting reminder — calendar check to sent invites",
      },
    ],
    workflowFile: "/workflows/monthly-meeting-reminder.json",
  },
  {
    slug: "ai-hiring-screening",
    title: "AI Hiring & CV Screening",
    tagline:
      "Screens every applicant against the role, scores CVs with AI, and makes sure no candidate is left without a response.",
    status: "case-study",
    demoType: "recorded",
    demoLabel: "Recorded walkthrough",
    accent: "#7C3AED",
    icon: "Briefcase",
    problem:
      "Hiring meant someone on the HR team spending hours reading CVs one by one, just to reply 'thanks, but not this time.' Good candidates slipped through, replies were slow, and many applicants never heard back at all.",
    solution:
      "A candidate applies through a Google Form with CV upload. The submission triggers an n8n workflow via webhook, the CV is pulled from Drive and converted to text, and an AI agent reads it — checking role fit, relevant experience, and overall qualification — and returns a score with reasoning. Above the bar, the candidate goes into a 'shortlist' sheet, HR is notified instantly, and the candidate gets a 'you're moving forward' email a few days later. Below the bar, a respectful 'not this time' email — also on a delay, because nobody likes an instant rejection.",
    outcome:
      "No manual sorting. No CVs lost in an inbox. No candidate left wondering if anyone saw their application — every single applicant gets a response, which is what most hiring pipelines quietly fail at.",
    steps: [
      {
        title: "Capture the application",
        description:
          "A Google Form submission — CV attached — triggers the workflow via webhook.",
        nodes: ["Google Form", "Webhook"],
      },
      {
        title: "Pull and convert the CV",
        description:
          "The uploaded file is fetched from Google Drive and converted to plain text.",
        nodes: ["Google Drive", "Extract Text"],
      },
      {
        title: "Score with AI",
        description:
          "An AI agent checks role fit, relevant experience, and overall qualification, returning a score plus written reasoning.",
        nodes: ["OpenAI Agent", "Scoring"],
      },
      {
        title: "Route by score",
        description:
          "Above the bar: shortlist sheet + instant HR notification. Below: respectful rejection path.",
        nodes: ["IF", "Google Sheets", "Slack"],
      },
      {
        title: "Respond to every candidate",
        description:
          "'Moving forward' or 'not this time' emails are sent on a delay — no instant rejections.",
        nodes: ["Wait", "Gmail"],
      },
    ],
    stack: ["n8n", "Google Forms", "Google Drive", "Google Sheets", "OpenAI", "Gmail"],
    metrics: [
      { label: "CVs screened", value: "100%" },
      { label: "Time per CV", value: "~15s" },
      { label: "Response rate", value: "100%" },
      { label: "Manual sorting", value: "0" },
    ],
    demoHint:
      "Watch the scoring run on sample CVs — one above the bar, one below.",
    media: [
      {
        type: "image",
        src: "/media/ai-hiring-screening-1.png",
        alt: "AI hiring and CV screening automation workflow",
        caption: "The hiring automation — from application to scored shortlist",
      },
    ],
    workflowFile: "/workflows/ai-hiring-screening.json",
  },
  {
    slug: "ai-customer-support-agent",
    title: "AI Customer Support Agent",
    tagline:
      "Answers customer questions from business documents, with instant escalation to a human when confidence is low.",
    status: "live-demo",
    demoType: "interactive",
    demoLabel: "Interactive demo",
    accent: "#564CD8",
    icon: "Headset",
    problem:
      "Support tickets were answered slowly because agents searched multiple documents for every reply. Simple, repetitive questions consumed most of the team's time, while complex issues waited in the queue.",
    solution:
      "An n8n workflow that listens to Telegram messages, retrieves the relevant passages from Google Drive documents, and answers with an OpenAI agent grounded strictly in the business docs. When the model's confidence is low or the customer asks for a person, the workflow escalates to a human with full conversation context.",
    outcome:
      "Routine questions are resolved in seconds without human touch, and support staff spend their time only on the issues that actually need judgment.",
    steps: [
      {
        title: "Capture the message",
        description:
          "A Telegram trigger receives every incoming customer message and normalizes it into a clean payload.",
        nodes: ["Telegram Trigger", "Set"],
      },
      {
        title: "Retrieve knowledge",
        description:
          "The workflow searches Google Drive documents for the most relevant sections using vector similarity.",
        nodes: ["Google Drive", "Embeddings", "Vector Store"],
      },
      {
        title: "Answer with grounding",
        description:
          "An OpenAI agent answers using only the retrieved context, with citations back to the source document.",
        nodes: ["OpenAI Agent", "Tool: Citation"],
      },
      {
        title: "Decide: automate or escalate",
        description:
          "A confidence check routes low-confidence or human-requested conversations to a support agent with full context.",
        nodes: ["IF", "Human Approval", "Slack"],
      },
    ],
    stack: ["n8n", "OpenAI", "Google Drive", "Telegram"],
    metrics: [
      { label: "First response", value: "< 30s" },
      { label: "Tickets auto-resolved", value: "~60%" },
      { label: "Escalation accuracy", value: "98%" },
    ],
    demoHint:
      "Send a message to the demo bot. Try asking something from the sample knowledge base, then ask for a human to see escalation.",
  },
  {
    slug: "ai-lead-qualification",
    title: "AI Lead Qualification System",
    tagline:
      "Captures website leads, scores them with AI against your ideal customer profile, and routes qualified prospects to your CRM.",
    status: "live-demo",
    demoType: "interactive",
    demoLabel: "Interactive demo",
    accent: "#0E9F6E",
    icon: "UserCheck",
    problem:
      "Every lead from the website landed in the same spreadsheet. Sales spent hours reading cold submissions, good leads cooled off while waiting, and no one knew which prospects were worth calling first.",
    solution:
      "A webhook captures each submission, an OpenAI agent scores it against the ideal customer profile (budget, timeline, team size, intent), and qualified leads flow into Google Sheets with a score, summary, and recommended next action. Duplicates are merged and every raw submission is preserved for audit.",
    outcome:
      "Sales calls the right leads first, qualification happens in seconds instead of hours, and no submission is ever lost.",
    steps: [
      {
        title: "Capture the lead",
        description:
          "A webhook endpoint receives the website form submission and validates required fields.",
        nodes: ["Webhook", "Validate"],
      },
      {
        title: "Deduplicate",
        description:
          "The workflow checks Google Sheets for existing emails and merges instead of duplicating.",
        nodes: ["Google Sheets", "Lookup"],
      },
      {
        title: "Score with AI",
        description:
          "An OpenAI agent scores fit 0–100 against your ICP and writes a one-line rationale.",
        nodes: ["OpenAI", "Score & Rationale"],
      },
      {
        title: "Route and notify",
        description:
          "Qualified leads are flagged in the sheet and the sales channel gets an alert; weak leads enter a nurture path.",
        nodes: ["IF", "Slack", "Nurture"],
      },
    ],
    stack: ["n8n", "Webhooks", "OpenAI", "Google Sheets"],
    metrics: [
      { label: "Qualification time", value: "~8s" },
      { label: "Scoring accuracy", value: "94%" },
      { label: "Manual review saved", value: "6 hrs/wk" },
    ],
    demoHint:
      "Submit the form with different company sizes and budgets to watch the score change in real time.",
    workflowFile: "/workflows/ai-lead-qualification.json",
  },
  {
    slug: "ai-email-assistant",
    title: "AI Email Assistant",
    tagline:
      "Classifies incoming email, summarizes the request, and prepares a draft reply — nothing is sent without your approval.",
    status: "case-study",
    demoType: "recorded",
    demoLabel: "Recorded walkthrough",
    accent: "#D97706",
    icon: "Mail",
    problem:
      "A high-volume inbox made it hard to spot urgent requests. Replying meant re-reading long threads, deciding priority, and drafting similar answers over and over.",
    solution:
      "A Gmail-triggered n8n workflow classifies each message (request, question, invoice, spam), summarizes the ask, and drafts a reply in the user's voice. Drafts wait in a review queue — the human approves, edits, or discards before anything is sent.",
    outcome:
      "Inbox triage is automatic, replies are drafted before you even open the email, and a human stays in control of every send.",
    steps: [
      {
        title: "Trigger on new mail",
        description:
          "A Gmail trigger fires on every new message matching the watched label.",
        nodes: ["Gmail Trigger", "Filter"],
      },
      {
        title: "Classify and summarize",
        description:
          "An OpenAI agent labels the category and condenses the request to its key points.",
        nodes: ["OpenAI", "Summarize"],
      },
      {
        title: "Draft the reply",
        description:
          "The agent writes a draft reply in the owner's tone, citing the original thread.",
        nodes: ["OpenAI", "Draft"],
      },
      {
        title: "Human approval gate",
        description:
          "Drafts land in a review queue; approved replies are sent, the rest are queued for manual handling.",
        nodes: ["Approval", "Gmail Send"],
      },
    ],
    stack: ["n8n", "Gmail", "OpenAI"],
    metrics: [
      { label: "Triage time", value: "-85%" },
      { label: "Drafts ready on open", value: "100%" },
      { label: "Unwanted sends", value: "0" },
    ],
  },
  {
    slug: "ai-content-automation",
    title: "AI Content Automation",
    tagline:
      "Generates content drafts, routes them through an approval workflow, and schedules approved posts automatically.",
    status: "concept",
    demoType: "none",
    demoLabel: "Case study",
    accent: "#DB2777",
    icon: "PenLine",
    problem:
      "Content production stalled between writing, reviewing, and publishing. Drafts lived in scattered documents, approvals happened over chat, and scheduling was manual.",
    solution:
      "An n8n workflow generates a draft from a topic brief with OpenAI, files it in Notion, routes it to reviewers with a structured approval task, and — once approved — schedules the post through social APIs with optimal timing.",
    outcome:
      "One brief in, one published post out — with a full approval trail and zero copy-paste between tools.",
    steps: [
      {
        title: "Generate the draft",
        description:
          "A topic brief enters via Notion or webhook; an OpenAI agent produces the draft with variants.",
        nodes: ["Notion Trigger", "OpenAI"],
      },
      {
        title: "File and route",
        description:
          "The draft is saved in Notion and reviewers get a task with accept / revise / reject options.",
        nodes: ["Notion", "Approval Task"],
      },
      {
        title: "Schedule on approval",
        description:
          "Approved content is queued and published through social APIs at the optimal slot.",
        nodes: ["IF", "Social APIs"],
      },
      {
        title: "Report performance",
        description:
          "Post metrics flow back into the Notion dashboard for the next planning cycle.",
        nodes: ["Analytics", "Notion"],
      },
    ],
    stack: ["n8n", "OpenAI", "Notion", "Social APIs"],
    metrics: [
      { label: "Brief-to-publish", value: "1 day" },
      { label: "Approval loop", value: "in-app" },
      { label: "Manual scheduling", value: "0" },
    ],
  },
  {
    slug: "ai-business-reporting-agent",
    title: "AI Business Reporting Agent",
    tagline:
      "Pulls business data from multiple sources, generates plain-language summaries, and emails scheduled reports.",
    status: "case-study",
    demoType: "recorded",
    demoLabel: "Recorded walkthrough",
    accent: "#0284C7",
    icon: "BarChart3",
    problem:
      "Weekly reporting meant manually exporting sheets, copying numbers into slides, and writing the same commentary — every week, on deadline.",
    solution:
      "A scheduled n8n workflow reads Google Sheets data sources, lets an OpenAI agent compute trends and anomalies, generates a plain-language report with charts, and emails it to stakeholders on schedule. Exceptions are flagged for review before sending.",
    outcome:
      "Stakeholders get a reliable, on-time report every week — with insights, not just numbers — and the team stops rebuilding it by hand.",
    steps: [
      {
        title: "Collect the data",
        description:
          "A schedule trigger reads the configured Google Sheets sources and normalizes the data.",
        nodes: ["Schedule", "Google Sheets"],
      },
      {
        title: "Analyze with AI",
        description:
          "The OpenAI agent computes trends, anomalies, and a plain-language summary.",
        nodes: ["OpenAI", "Analyze"],
      },
      {
        title: "Build the report",
        description:
          "Findings are rendered into a formatted report document with charts and highlights.",
        nodes: ["Render", "Charts"],
      },
      {
        title: "Deliver on schedule",
        description:
          "The report is emailed to the distribution list; anomalies are flagged to owners first.",
        nodes: ["Gmail", "Exception Check"],
      },
    ],
    stack: ["n8n", "Google Sheets", "OpenAI", "Gmail"],
    metrics: [
      { label: "Report build time", value: "5 min" },
      { label: "Manual steps removed", value: "100%" },
      { label: "Delivery", value: "on schedule" },
    ],
  },
];

export const getProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

export const AUTHOR_NAME = "Bolaji Gbenga";
export const CONTACT_EMAIL = "Wiggga111@gmail.com";
