# AAO Skeleton

Agent-Oriented Operations (AAO) は、事業全体を **AIエージェント群による自律運営** で実現するためのアーキテクチャテンプレートです。

人間の介入を最小限に抑え、各媒体ごとに独立したエージェントと上位オーケストレーション層（AI×人間）によって、運用・進化・安全性・再利用性のバランスを最適化した構成を提供します。

## Architecture

```mermaid
graph TB
    subgraph Orchestration["🎯 Orchestration Layer (AI × Human)"]
        Plans[Plans & Playbooks]
        CLI[CLI Wrappers]
        Flows[Auto Flows]
    end

    subgraph Runtime["⚙️ Shared Runtime"]
        AgentRuntime[agent-runtime]
        Adapters[LLM Adapters<br/>OpenAI | Anthropic | Local]
        MCPCore[MCP Core]
        SkillLoader[Skill Loader]
        Observability[Logging & Tracing]
    end

    subgraph Agents["🤖 Independent Agents"]
        SupabaseAgent[Supabase Agent<br/>DB Operations]
        NoteAgent[Note Agent<br/>Content Management]
        ObsidianAgent[Obsidian Agent<br/>Vault Operations]
        XAgent[X Agent<br/>Social Media]
    end

    subgraph Skills["🔧 Skills & Tools"]
        DBReading[db-reading]
        DBWriting[db-writing]
        ContentAuth[content-authoring]
        ContentPub[content-publishing]
        PersonaMgmt[persona-management]
        ObsidianVault[obsidian-vault]
        XAPI[x-api]
    end

    subgraph External["🌐 External Platforms"]
        Supabase[(Supabase)]
        NotePlatform[(Note Platform)]
        ObsidianVault2[(Obsidian Vault)]
        XPlatform[(X/Twitter)]
    end

    Orchestration --> Agents
    Agents --> Runtime
    Runtime --> Skills

    SupabaseAgent --> DBReading
    SupabaseAgent --> DBWriting
    DBReading --> Supabase
    DBWriting --> Supabase

    NoteAgent --> ContentAuth
    NoteAgent --> ContentPub
    NoteAgent --> PersonaMgmt
    ContentPub --> NotePlatform

    ObsidianAgent --> ObsidianVault
    ObsidianVault --> ObsidianVault2

    XAgent --> XAPI
    XAPI --> XPlatform

    classDef orchestrationStyle fill:#667eea,stroke:#764ba2,stroke-width:2px,color:#fff
    classDef runtimeStyle fill:#f093fb,stroke:#f5576c,stroke-width:2px,color:#fff
    classDef agentStyle fill:#4facfe,stroke:#00f2fe,stroke-width:2px,color:#fff
    classDef skillStyle fill:#43e97b,stroke:#38f9d7,stroke-width:2px,color:#fff
    classDef externalStyle fill:#fa709a,stroke:#fee140,stroke-width:2px,color:#fff

    class Plans,CLI,Flows orchestrationStyle
    class AgentRuntime,Adapters,MCPCore,SkillLoader,Observability runtimeStyle
    class SupabaseAgent,NoteAgent,ObsidianAgent,XAgent agentStyle
    class DBReading,DBWriting,ContentAuth,ContentPub,PersonaMgmt,ObsidianVault,XAPI skillStyle
    class Supabase,NotePlatform,ObsidianVault2,XPlatform externalStyle
```

## System Flow

```mermaid
sequenceDiagram
    participant H as 👤 Human
    participant O as Orchestration
    participant A as Agent
    participant S as Skill
    participant M as MCP Server
    participant P as Platform

    H->>O: Define plan / trigger
    O->>A: Execute task
    A->>S: Load skill
    S->>M: Call MCP tool
    M->>P: API request
    P-->>M: Response
    M-->>S: Result
    S-->>A: Processed data
    A-->>O: Status update
    O-->>H: Report (minimal)

    Note over H,P: AI-driven autonomous loop
    Note over H,O: Human intervention: minimal
```

## Directory Structure

```
aao-skeleton/
│
├── 🎯 orchestration/          # AI×Human orchestration layer
│   ├── plans/                 # Long/short-term playbooks
│   ├── cli/                   # Command wrappers
│   └── flows/                 # Auto-orchestration definitions
│
├── 🤖 agents/                 # Independent agent projects
│   ├── supabase-agent/        # Database operations
│   │   ├── index.ts
│   │   ├── db/{schemas,migrations,scripts}/
│   │   └── tools/skills/{db-reading,db-writing}/
│   │
│   ├── note-agent/            # Content management
│   │   ├── personas/          # Persona-based content
│   │   └── tools/skills/{content-authoring,publishing,persona-management}/
│   │
│   ├── obsidian-agent/        # Vault operations
│   │   └── tools/skills/obsidian-vault/
│   │
│   └── x-agent/               # Social media operations
│       └── tools/skills/x-api/
│
├── ⚙️ packages/
│   └── agent-runtime/         # Shared runtime & adapters
│       ├── adapters/          # OpenAI / Anthropic / Local
│       ├── mcp/               # MCP client & sandbox
│       ├── skill-loader/      # Dynamic skill loading
│       └── observability/     # Logging & tracing
│
└── 📚 docs/                   # Org-level documentation
    ├── ARCHITECTURE.md
    ├── POLICIES.md
    └── RUNBOOKS.md
```

## Core Concepts

### 🤖 Agents
Each platform gets an **isolated TypeScript project** with its own dependencies, environment, documentation, and workspace. Agents operate independently and can be developed, tested, and deployed separately.

### 🔧 Skills
Capabilities are defined via `skill.yaml`, packaged with scripts, templates, and tests. Skills are **reusable, composable, and testable** units of functionality loaded dynamically by the runtime.

### 🔌 MCP (Model Context Protocol)
Agents interact with external platforms through **MCP servers**. Each agent has sandboxed MCP tools under `tools/mcp/{client,sandbox,servers}`.

### 🎯 Orchestration
The **AI + Human orchestration layer** manages high-level planning and coordination. Model upgrades and policy changes affect only adapters and plans, not agent implementations.

### 📦 Shared Runtime
`packages/agent-runtime` provides:
- **Multi-LLM support**: OpenAI, Anthropic, Local models
- **MCP infrastructure**: Client, sandbox, server adapters
- **Skill loading**: Dynamic capability injection
- **Observability**: Structured logging and tracing

## Design Philosophy

| Principle | Implementation |
|-----------|----------------|
| **Type-first** | Fixed structure defines the system "type" |
| **Platform isolation** | 1 platform = 1 agent = 1 independent project |
| **AI autonomy** | Minimal human intervention, maximum AI-driven execution |
| **Model agnostic** | Adapters support multiple LLM providers |
| **Operations-first** | Docs, policies, runbooks are first-class citizens |
| **Skeleton over implementation** | This repo provides structure; downstream adds logic |

## Agent Structure

Each agent follows this canonical layout:

```
<agent-name>/
├── index.ts                   # Agent entrypoint
├── INSTRUCTIONS.md            # Domain-specific rules
├── package.json / tsconfig.json
├── .env / .env.example
├── docs/                      # Agent-specific docs
├── tools/
│   ├── skills/                # Skill packages
│   │   └── <skill>/
│   │       ├── skill.yaml
│   │       ├── src/
│   │       ├── scripts/
│   │       └── tests/
│   └── mcp/
│       ├── client/
│       ├── sandbox/
│       └── servers/<platform>/
└── .workspace/                # Gitignored scratch & logs
```

## Getting Started

This is a **template repository**. To use:

1. **Copy** this skeleton to your project repository
2. **Implement** business logic in agent `index.ts` files
3. **Define** skills in `tools/skills/` directories
4. **Configure** MCP servers for platform integrations
5. **Set up** orchestration plans in `orchestration/plans/`

The skeleton provides the structure; you provide the implementation.

## Technology Stack

- **Language**: TypeScript (ES2020, NodeNext)
- **Runtime**: Node.js
- **Package Manager**: pnpm (monorepo support)
- **LLM Providers**: OpenAI, Anthropic, Local models
- **Protocol**: MCP (Model Context Protocol)

## Key Features

✅ **Platform-first isolation** — Each agent is self-contained
✅ **Multi-LLM support** — Future-proof adapter architecture
✅ **Skill-based composition** — Reusable, testable capabilities
✅ **AI-driven orchestration** — Minimal human intervention
✅ **Type-safe operations** — TypeScript throughout
✅ **Sandbox execution** — Secure MCP tool isolation
✅ **Operations visibility** — Docs and policies built-in

## License

MIT
