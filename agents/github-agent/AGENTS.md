---
title: GitHub Agent Contract
slug: github-agent-contract
summary: "GitHub agent policy"
type: "policy"
tags: [github, governance, policy]
last_updated: 2025-11-20
---

## Directory Structure

- `src/`: Shared logic / utilities for this agent
- `skills/`: Agent skills (formerly tools/skills)
- `mcp/`: MCP runtime (client, sandbox, servers)
- `config/`: Agent-specific configuration
- `infra/`: Infra assets (DB, migrations, scripts)
- `data/`: Persistent sample data / personas
- `generated/`: Generated artifacts (gitignored)
- `tests/`: Tests and fixtures
- `docs/`: Agent-specific documentation
- `.workspace/`: Runtime work dir (gitignored)
- `.logs/`: Logs (gitignored)
