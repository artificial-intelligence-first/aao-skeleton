---
title: Topic Name
slug: topic-name
last_updated: YYYY-MM-DD
tags: [tag1, tag2, tag3]
summary: "Short doc label (<20 chars)."
---
## Usage Rules

- Apply this front matter to every “official document” (AGENTS, SSOT, PLANS, SKILL, specs, designs, procedures, AI reference topics, etc.).
- Every md under `/docs` or `/knowledge` must include it; `/drafts`, `/notes`, `/scratch`, and similar work logs are exempt.
- The repository root `README.md` is the lone exception even if it is official.
- Skip it for transient notes or drafts where title/slug/tags/summary would be meaningless noise.
- Keep `summary` ultra concise (<=20 characters) and focused on the doc’s label.
- Close the front matter and immediately begin the first heading/content with no blank line in between.
- Consider adding `document_type: "spec" | "guide" | "reference" | "policy" | "concept"` to help AI/human consumers classify the doc.
