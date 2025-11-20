---
title: Supabase Agent Contract
slug: supabase-agent-contract
summary: "Supabase policy"
type: "policy"
tags: [supabase, governance, policy]
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

## Infra
Database assets (migrations, schemas, scripts) are managed under `infra/db/`.
