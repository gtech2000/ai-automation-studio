# n8n workflow exports

Drop sanitized n8n workflow JSON exports here and reference them
from `src/data/projects.ts`:

```ts
{
  slug: "ai-lead-qualification",
  // ...
  workflowFile: "/workflows/ai-lead-qualification.json",
}
```

## Before you publish a workflow — sanitize it

n8n exports can contain **credentials** (API keys, tokens, connection
IDs). Always sanitize first:

```bash
node scripts/sanitize-n8n-json.js ~/Downloads/my-workflow.json public/workflows/ai-lead-qualification.json
```

The script strips:
- `nodes[].credentials` from every node
- `pinData`, `meta`, `versionId`, `id`, `tags`

Then manually review node `parameters` for embedded secrets
(API keys in URLs, auth headers, personal names/emails).

## What visitors see

- Node count, connection count, file size
- A "node map" — every node with its type
- Expandable, syntax-highlighted raw JSON
- A **Download .json** button so visitors can import the
  workflow into their own n8n workspace
