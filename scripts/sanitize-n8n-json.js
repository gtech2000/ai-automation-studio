#!/usr/bin/env node

/**
 * Sanitize an n8n workflow export before publishing it to the portfolio.
 *
 * n8n exports can contain credentials (API keys, tokens, connection IDs).
 * This script strips them so the workflow is safe to share publicly.
 *
 * Usage:
 *   node scripts/sanitize-n8n-json.js downloaded-workflow.json [output.json]
 *
 * If no output path is given, the file is sanitized in place.
 */

const fs = require("fs");

const input = process.argv[2];
if (!input) {
  console.error(
    "Usage: node scripts/sanitize-n8n-json.js <workflow.json> [output.json]",
  );
  process.exit(1);
}
const output = process.argv[3] || input;

let workflow;
try {
  workflow = JSON.parse(fs.readFileSync(input, "utf8"));
} catch (err) {
  console.error(`Could not parse "${input}": ${err.message}`);
  process.exit(1);
}

let strippedCredentials = 0;
let strippedFields = 0;

for (const node of workflow.nodes ?? []) {
  if (node.credentials && Object.keys(node.credentials).length > 0) {
    node.credentials = {};
    strippedCredentials++;
  }
  // Remove anything that could carry secrets or local state
  for (const key of ["continueOnFail", "credentials", "disabled"]) {
    // credentials handled above; keep structure intact otherwise
  }
  delete node.continueOnFail;
}

const removableTopLevel = ["pinData", "meta", "versionId", "id", "tags"];
for (const key of removableTopLevel) {
  if (workflow[key] !== undefined) {
    delete workflow[key];
    strippedFields++;
  }
}

fs.writeFileSync(output, JSON.stringify(workflow, null, 2));

console.log(`Sanitized ${input}`);
console.log(`  → credentials stripped from ${strippedCredentials} node(s)`);
console.log(`  → ${strippedFields} top-level field(s) removed`);
console.log(`  → written to ${output}`);
console.log(
  "⚠  Review node parameters for embedded secrets (API keys, tokens, URLs with auth) before publishing.",
);
