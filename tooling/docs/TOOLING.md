# Tooling Overview

Centralized developer tooling for the AAO skeleton. Keep this layer thin: orchestrator entrypoints should call into these scripts, and project-specific logic belongs in agents or shared packages.

## Layout
- `cli/`: Command-line utilities for scaffolding, publishing, and smoke checks.
- `templates/skill/`: Seed files for new skills.
- `templates/agent/`: Seed files for new agents.
- `docs/`: Documentation for the tooling layer (this file).

## Conventions
- Prefer small composable scripts over monoliths.
- Keep scripts dependency-light; reuse `packages/` for shared logic.
- Surface commands via `orchestration/cli` wrappers so humans and AIs have a stable interface.
