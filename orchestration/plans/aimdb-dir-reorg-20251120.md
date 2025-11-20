# Directory Restructuring Plan 2025-11-20

## Purpose
To normalize the directory structure across all agents, remove unnecessary nesting, centralize shared MCP logic, and introduce a dedicated tooling directory.

## Scope
- **Agents**: Normalized structure for `skills/`, `mcp/`, `config/`, `infra/`, `data/`, `generated/`, `tests/`, `docs/`, `.workspace/`, `.logs/`.
- **MCP Runtime**: Consolidated `mcpClient` and `sandbox` logic into `packages/agent-runtime`.
- **Tooling**: Established `tooling/` for shared CLIs (replacing top-level `scripts/`).
- **Supabase**: Consolidated root `supabase/` into `agents/supabase-agent/infra/db/`.
- **Docs**: Updated `AGENTS.md` for all agents.

## Changes
1.  **Removed `tools/`**: Flattened `tools/skills` and `tools/mcp` into direct children of agent directories.
2.  **Centralized Runtime**: Moved shared MCP logic to `packages/agent-runtime`. Removed local `mcpClient.ts` and `runTs.ts` wrappers from agents.
3.  **New `tooling/`**: Scripts moved to `tooling/cli`.
4.  **Root Config**: Populated `package.json` and `pnpm-workspace.yaml`.
5.  **Supabase Consolidation**: Removed root `supabase/` and consolidated assets into `agents/supabase-agent/infra/db`.

## Non-goals / TODOs
-   Implementation of deep business logic in `agent-runtime` (currently basic/skeleton).
