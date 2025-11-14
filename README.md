# AAO Skeleton

This repository locks down the reference architecture for running an entire business through independent, platform-specific agents coordinated by an upper-layer orchestrator. The intent is to keep human intervention minimal and let AI drive day-to-day execution. The goal is to establish the correct skeleton so any future project can drop in real logic without rethinking structure. Keep the scaffolding lean, keep the expectations clear, avoid noise.

## Design Principles

- **Platform-first isolation**  
  Each platform (Supabase, note services, Obsidian, X, …) owns an independent TypeScript project with local docs, env files, tools, and sandboxed work/log areas.
- **Skills and Code MCP as shared fabric**  
  - Skills describe capabilities via `skill.yaml`, scripts, templates, and tests.  
  - `tools/mcp` supplies the thin client, sandbox runner, and per-platform server adapters that talk to Code MCP tools safely.  
  - Shared logic lives in `packages/agent-runtime`.
- **Human + AI orchestration**  
  `orchestration/` centralizes planning and command wrappers so model upgrades or policy shifts touch adapters and plans, not the agent directories themselves. The intent is to keep human involvement minimal while letting AI drive daily execution.
- **Operations visible from day one**  
  Supabase SSOT content stays under `db/{schemas,migrations,scripts}`. Workspace-level docs (architecture, policies, runbooks) sit beside CI wiring so operational practices never become an afterthought.
- **Skeleton over implementation**  
  Files remain empty until a downstream product needs them. The project structure is the deliverable.

## Directory Structure (finalized “type”)

```text
aao-skeleton/
├─ package.json                # workspace manifest (pnpm-ready, intentionally tiny)
├─ tsconfig.base.json          # shared TypeScript config
├─ pnpm-workspace.yaml         # workspace definition
├─ .env.example                # shared env template (each agent keeps its own .env)
├─ .gitignore
├─ README.md
├─ AGENTS.md                   # high-level behavior contract for Codex agents
├─ .github/
│  └─ workflows/
│     └─ phase1.yaml           # CI/QA entry (placeholder)
├─ docs/                       # org-level references
│  ├─ AGENTS.md
│  ├─ ARCHITECTURE.md
│  ├─ POLICIES.md
│  └─ RUNBOOKS.md
├─ orchestration/
│  ├─ README.md                # describes orchestration layer
│  ├─ plans/                   # long/short-term playbooks
│  ├─ cli/                     # (future) thin wrappers to call agents
│  └─ flows/                   # future auto-orchestration definitions
├─ agents/                     # 1 medium = 1 standalone agent project
│  ├─ supabase-agent/
│  │  ├─ index.ts              # agent entrypoint (model-agnostic)
│  │  ├─ instructions.md       # Supabase domain “laws”
│  │  ├─ README.md / AGENTS.md # human + AI summaries
│  │  ├─ package.json / tsconfig.json / .gitignore / .env(.example)
│  │  ├─ docs/                 # Supabase-specific deep dives
│  │  ├─ db/                   # SSOT for Supabase (kept together, no flattening)
│  │  │  ├─ schemas/          # canonical SQL (core.sql, catalog.sql)
│  │  │  ├─ migrations/       # ordered change history
│  │  │  └─ scripts/          # operational TS helpers (analyzeSchema.ts, …)
│  │  ├─ tools/
│  │  │  ├─ skills/            # AAO skill packs (supabase-cli|mcp|schema)
│  │  │  │  └─ scripts/        # camelCase TS entrypoints
│  │  │  └─ mcp/
│  │  │     ├─ client/mcpClient.ts
│  │  │     ├─ sandbox/{policy.json,runTs.ts}
│  │  │     └─ servers/supabase/{TOOL_META.json,getTable.ts,…}
│  │  ├─ .workspace/.logs      # gitignored scratch + traces
│  │  │  └─ .gitkeep
│  ├─ note-agent/
│  │  ├─ (mirrors supabase-agent minus schemas/migrations)
│  │  ├─ tools/skills/note-api/scripts/publishNote.ts
│  │  └─ tools/mcp/{client,sandbox,servers/note}
│  ├─ obsidian-agent/
│  │  ├─ same layout
│  │  └─ tools/skills/obsidian-vault/scripts/syncSnapshot.ts
│  └─ x-agent/
│     ├─ same layout
│     └─ tools/skills/x-api/scripts/postUpdate.ts
└─ packages/
   └─ agent-runtime/
      ├─ src/
      │  ├─ adapters/          # OpenAI / Anthropic / Local (future-proof)
      │  ├─ mcp/{client.ts,sandbox.ts}
      │  ├─ sandbox/index.ts   # legacy sandbox glue
      │  ├─ skill-loader/index.ts
      │  └─ observability/{logger.ts,tracing.ts}
      ├─ package.json
      ├─ tsconfig.json
      └─ README.md
```

This layout is the fixed “type” for AAO skeleton development—new capabilities plug into skills or MCP servers without breaking agent isolation, and operational docs remain first-class citizens alongside the code.
