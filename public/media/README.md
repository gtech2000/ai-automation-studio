# Media assets

Drop your automation screenshots and walkthrough videos here, then reference
them in `src/data/projects.ts` under each project's `media` array.

## Naming convention

```
public/media/
├── <project-slug>-1.png      # screenshot (1200×900 recommended)
├── <project-slug>-2.png
└── <project-slug>-walkthrough.mp4   # video (mp4/webm, < 50 MB recommended)
```

Project slugs:
- `ai-customer-support-agent`
- `ai-lead-qualification`
- `ai-email-assistant`
- `ai-content-automation`
- `ai-business-reporting-agent`

## Example

In `src/data/projects.ts`:

```ts
{
  slug: "ai-lead-qualification",
  // ...
  media: [
    {
      type: "image",
      src: "/media/ai-lead-qualification-1.png",
      alt: "Lead scoring dashboard showing AI-generated score and rationale",
      caption: "Lead scored 92/100 with AI rationale",
    },
    {
      type: "video",
      src: "/media/ai-lead-qualification-walkthrough.mp4",
      alt: "Walkthrough of the lead qualification workflow",
      caption: "Full workflow walkthrough (2:14)",
    },
  ],
}
```

- **Images** appear in the "Screenshots" gallery on the case study page.
- **Videos** appear in the "See it run" demo panel with native controls.
