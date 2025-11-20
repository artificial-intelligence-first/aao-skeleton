---
title: X Agent Contract
slug: x-agent-contract
summary: "X agent policy"
type: "policy"
tags: [x-platform, governance, policy]
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
