# NuX Agent Upgrade for OpenCode

NuX is an upgrade layer for OpenCode focused on making the agent more autonomous, safer, and continuously improving.

## Mission

Turn OpenCode into a project-aware coding agent that can:

1. Understand a repository before editing.
2. Plan changes before writing code.
3. Execute with safety gates.
4. Review its own diffs.
5. Learn from successful and failed work.
6. Improve across repeated tasks using local, redacted memory.

## Quick install

```bash
git clone https://github.com/leondynmix-byte/opencode.git
cd opencode
bun install
bun run nux:doctor
```

On Windows you can also run:

```bat
install_NuX.bat
```

## Daily commands

```bash
bun run nux:plan "Improve this project"
bun run nux:risk "git status"
bun run nux:learn --goal "Task" --outcome success --summary "What worked"
bun run nux:memory
bun run nux:bench
bun run nux:bench --summary
```

## Operating modes

### Plan Mode

Read-only. The agent explores files, summarizes architecture, and produces a task graph.

### Patch Mode

The agent proposes file changes as patches. It does not run dangerous commands.

### Build Mode

The agent may write files and run safe commands after risk checks.

### Review Mode

The agent checks generated diffs, detects regressions, and recommends tests.

### Learn Mode

The agent stores sanitized lessons from the completed task: what worked, what failed, which files mattered, and which checks should run next time.

## Competitive target

NuX combines the best capabilities expected from advanced coding agents:

- Codex-like coding and repository navigation.
- Manus-like task execution and workflow decomposition.
- Pi-like conversational simplicity.
- OpenCode-style terminal-native developer control.

## Documentation

- [Installation guide](./docs/nux-installation.md)
- [دليل التنصيب بالعربية](./docs/nux-install-ar.md)
- [Release guide](./docs/nux-release-guide.md)
- [دليل الريليس بالعربية](./docs/nux-release-ar.md)
- [Release checklist](./docs/nux-release-checklist.md)
- [GitHub UI release steps](./docs/nux-release-ui-steps.md)
- [Post-release roadmap](./docs/nux-post-release-roadmap.md)
- [Release notes](./RELEASE_NOTES_NUX.md)
- [Package README](./packages/nux/README.md)

## Release

Recommended first release tag:

```text
nux-v0.1.0-alpha.1
```

Prepare locally:

```bash
bun install
bun run nux:doctor
bun --cwd packages/nux run typecheck
bun run nux:bench
```

Windows helper:

```bat
release_NuX.bat nux-v0.1.0-alpha.1
```

## Non-goals

NuX must not silently store secrets, bypass user permissions, hide network access, or make destructive changes without explicit approval.
