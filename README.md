# AAO Skeleton

Agent Autonomous Organization (AAO) is a public skeleton for building autonomous, multi-agent systems with minimal human intervention. It keeps agents isolated, skills reusable, and orchestration visible.

## Why this skeleton
- Standardized agent layout so every platform integration looks the same.
- Shared runtime for MCP, LLM adapters, and skill loading.
- Clear separation between orchestration, agents, shared packages, and tooling.
- Documentation-first: policies, runbooks, and playbooks live next to the code.
- Open and composable - add or remove agents without touching the rest.

## Architecture (high level)

```mermaid
graph TB
    subgraph "Orchestration"
        Orchestration[AI x Human Coordination]
    end

    subgraph "Agents"
        Agent1[database-agent]
        Agent2[content-agent]
        Agent3[platform-agent]
    end

    subgraph "Runtime"
        Runtime[Shared Runtime<br/>LLM Adapters<br/>Skill Loader<br/>MCP Core<br/>Observability]
    end

    subgraph "External Platforms"
        Platform1[(Database)]
        Platform2[(Content Platform)]
        Platform3[(Platform N)]
    end

    Orchestration --> Agent1
    Orchestration --> Agent2
    Orchestration --> Agent3

    Agent1 --> Runtime
    Agent2 --> Runtime
    Agent3 --> Runtime

    Runtime --> Platform1
    Runtime --> Platform2
    Runtime --> Platform3
```

## Top-level layout

```
/
|- README.md
|- AGENTS.md                  # Global agent rules
|- package.json
|- pnpm-workspace.yaml
|- agents/                    # One folder per agent (Supabase, note, GitHub, etc.)
|- orchestration/             # Plans, flows, contracts, thin CLI entrypoints
|- packages/                  # Shared libraries (agent-runtime)
|- tooling/                   # Common CLI, scaffolding, templates
|- docs/                      # Architecture, policies, runbooks
|- infra/                     # Shared infra (placeholder)
`- .github/                   # CI/CD
```

## Agent standard layout

```
agents/<agent-id>/
  AGENTS.md
  README.md

  src/                         # Agent logic (entry: src/index.ts)
    lib/                       # Shared helpers for this agent

  skills/                      # MCP skills
    <skill-id>/
      skill.yaml
      README.md
      INSTRUCTIONS.md
      src/
      scripts/
      tests/
      templates/
      tsconfig.json

  mcp/                         # MCP client/sandbox/servers
    client/
    sandbox/
    servers/

  config/                      # Agent-scoped configs (ingestion, affiliates, rules)
  infra/                       # Agent infra (e.g., db migrations/scripts)
  data/                        # Agent data (samples, personas, etc.)
  generated/                   # Gitignored outputs (types, built skills)
    skills/
  tests/
    fixtures/
  docs/

  .workspace/                  # Runtime scratch (gitignored)
  .logs/                       # Agent logs (gitignored)
  .env.example
  .env
```

## Included agents (examples)
- **supabase-agent**: Database operations with `infra/db/` migrations and generated Supabase types under `generated/`.
- **note-agent**: Content and persona management; personas now live in `data/personas/`.
- **github-agent**: Git/GitHub workflows; shared utility in `src/lib/git-core.ts` with skills under `skills/gh-*`.
- **obsidian-agent**: Knowledge base skeleton; skills live under `skills/obsidian-vault/`.
- **x-agent**: Social platform placeholder with a minimal `skills/x-api/`.

Swap these with your own agents while keeping the layout.

## Shared packages
- `packages/agent-runtime/`: MCP client, sandbox, skill loader, observability, and LLM adapters.
- Future slots: `mcp-runtime/`, `shared-config/` (add when needed).

## Tooling and orchestration
- `tooling/cli`: Thin, shareable CLI entrypoints (`create-skill`, `skill-manager`, `push-pr`, `skill-postbuild`).
- `tooling/templates`: Seed files for new skills and agents.
- `orchestration/plans`: Playbooks (see `PLAN_TEMPLATE.md` and `directory-restructure.md`).
- `orchestration/flows`: Executable flows (example: `db-weekly.yaml`).
- `orchestration/contracts`: Schemas and contracts for cross-agent work.
- `orchestration/cli`: Human/AI-facing scripts that should delegate into `tooling/cli`.

## Getting started
1. **Clone** the skeleton and set up your workspace.
2. **Fork an agent**: copy an existing agent folder, rename it, and implement `src/index.ts`.
3. **Add skills**: scaffold from `tooling/templates/skill` into `agents/<agent>/skills/<skill>/` and fill in `skill.yaml` and `src/`.
4. **Wire MCP**: extend `agents/<agent>/mcp/servers/` for your platform and reuse `packages/agent-runtime`.
5. **Plan orchestration**: add a plan under `orchestration/plans/` and a flow under `orchestration/flows/`, then expose a thin script in `orchestration/cli/`.
6. **Configure env**: copy `.env.example` to `.env` per agent and keep generated artifacts inside `generated/` or `packages/*/build/`.

## Documentation
- `docs/ARCHITECTURE.md` - System design
- `docs/POLICIES.md` - Operational policies
- `docs/RUNBOOKS.md` - Deployment and maintenance guides
- `docs/AGENTS.md` - Agent handbook
- `AGENTS.md` - Workspace agent contract

## License
MIT
