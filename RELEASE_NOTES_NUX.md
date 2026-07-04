# NuX Agent Upgrade Release Notes

## nux-v0.1.0-alpha.1

Initial NuX release candidate for this OpenCode fork.

### Added

- NuX package under `packages/nux`.
- Root scripts for `nux:doctor`, `nux:plan`, `nux:risk`, `nux:learn`, `nux:memory`, and `nux:bench`.
- Safe local memory with redaction-first behavior.
- Command and path risk assessment.
- Benchmark smoke recording and summaries.
- NuX architecture overview in `Nux.md`.
- Agent configuration in `configs/nux.agent.json`.
- Installation guide in `docs/nux-installation.md`.
- Release guide in `docs/nux-release-guide.md`.
- Package README in `packages/nux/README.md`.

### Install

```bash
git clone https://github.com/leondynmix-byte/opencode.git
cd opencode
bun install
bun run nux:doctor
```

### Verify

```bash
bun run nux:plan "Improve OpenCode"
bun run nux:risk "git status"
bun run nux:bench
bun run nux:bench --summary
```

### Known limitations

- NuX is currently a standalone upgrade layer inside the monorepo.
- Deep runtime integration with OpenCode command execution is planned next.
- Memory is local-only by default and should stay that way until the user explicitly opts into syncing.
- GitHub release creation should be done manually from the GitHub UI or with the GitHub CLI because this connector currently exposes repository file operations, not release publishing.

### Recommended tag

```text
nux-v0.1.0-alpha.1
```
