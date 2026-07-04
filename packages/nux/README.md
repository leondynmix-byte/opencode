# @opencode-ai/nux

NuX is an experimental agent upgrade layer for this OpenCode fork. It focuses on planning, safe self-learning, command risk assessment, and lightweight benchmark tracking.

## Commands

Run from the repository root:

```bash
bun run nux:doctor
bun run nux:plan "Improve onboarding"
bun run nux:risk "git status"
bun run nux:learn --goal "Task" --outcome success --summary "What changed and what worked"
bun run nux:memory
bun run nux:bench
bun run nux:bench --summary
```

Or run directly from the package:

```bash
bun --cwd packages/nux run doctor
bun --cwd packages/nux run plan "Improve test coverage"
```

## Module map

- `src/planner.ts` — converts a user goal into a structured task plan.
- `src/risk.ts` — scores shell commands and file paths before execution.
- `src/memory.ts` — stores safe, redacted local learning events.
- `src/benchmark.ts` — records smoke benchmark results.
- `src/cli.ts` — command-line entrypoint.
- `src/types.ts` — shared NuX types.

## Safety model

NuX is intentionally conservative:

- It does not store secrets.
- It redacts tokens, passwords, private keys, and obvious credential patterns.
- It blocks destructive shell patterns.
- It treats network, install, and git push operations as approval-required.
- It keeps memory local by default.

## Integration roadmap

1. Keep NuX package standalone and verified.
2. Add OpenCode command hooks for planner/risk/memory.
3. Show plan and risk state in TUI/web UI.
4. Add benchmark history to project diagnostics.
5. Add release scoring and regression tracking.
