# Directory Restructure

## Objective
Align the repository layout with the unified agent/orchestration/tooling model.

## Steps
1. Introduce top-level `tooling/`, `infra/`, and transitional `supabase/` placeholders.
2. Normalize each agent into the standard layout (`src/`, `skills/`, `mcp/`, `config/`, `infra/`, `data/`, `generated/`, `tests/`).
3. Move MCP/shared utilities into `packages/` and keep orchestration entrypoints thin.
4. Refresh documentation (root `README.md`, `AGENTS.md`) to reflect the new structure.

## Verification
- Directory tree matches the target structure in the design doc.
- Paths referenced by scripts or docs resolve to existing locations.
- Generated artifacts sit under `generated/` or `build/` only.

## Rollback
Use git to revert the restructure branch if inconsistencies are found.
