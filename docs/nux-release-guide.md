# NuX Release Guide

This guide documents how to prepare and publish a NuX-enabled OpenCode release.

## Release goals

A NuX release should prove that the repository can be installed, checked, planned, risk-scored, and benchmarked without breaking the existing OpenCode workflow.

## Versioning

Use pre-release tags while NuX is experimental:

```text
nux-v0.1.0-alpha.1
nux-v0.1.0-alpha.2
nux-v0.1.0-beta.1
nux-v0.1.0
```

Recommended release title format:

```text
NuX Agent Upgrade v0.1.0-alpha.1
```

## Pre-release checklist

Run from the repository root:

```bash
git checkout dev
git pull
bun install
bun run nux:doctor
bun run nux:plan "release readiness"
bun run nux:risk "git status"
bun run nux:bench
bun --cwd packages/nux run typecheck
```

Optional full repository checks:

```bash
bun run lint
bun run typecheck
```

If full repository checks fail because of unrelated upstream packages, include the failure in release notes and confirm that `packages/nux` checks still pass.

## Release branch

```bash
git checkout -b release/nux-v0.1.0-alpha.1
```

Update release notes, then commit:

```bash
git add .
git commit -m "chore: prepare NuX v0.1.0-alpha.1 release"
git push origin release/nux-v0.1.0-alpha.1
```

Open a pull request into `dev`.

## Tagging

After the release PR is merged:

```bash
git checkout dev
git pull
git tag -a nux-v0.1.0-alpha.1 -m "NuX Agent Upgrade v0.1.0-alpha.1"
git push origin nux-v0.1.0-alpha.1
```

## GitHub release notes template

```markdown
# NuX Agent Upgrade v0.1.0-alpha.1

## Highlights

- Adds NuX planning commands.
- Adds safe self-learning memory with secret redaction.
- Adds command and path risk assessment.
- Adds benchmark recording and summaries.
- Adds installation and release documentation.

## Install

```bash
git clone https://github.com/leondynmix-byte/opencode.git
cd opencode
bun install
bun run nux:doctor
```

## Verify

```bash
bun run nux:plan "Improve this project"
bun run nux:risk "git status"
bun run nux:bench --summary
```

## Known limitations

- NuX is currently an upgrade layer, not yet deeply wired into every OpenCode runtime loop.
- Memory is local-only by default.
- Dangerous actions are blocked or require approval.
```

## Release assets

For now, no binary artifact is required. The release can point users to the repository and the NuX docs.

Optional future assets:

- Windows installer zip.
- Desktop build.
- NuX benchmark report.
- Example `.nux` memory export with fake/sanitized data only.

## Post-release tasks

- Create a tracking issue for deeper OpenCode runtime integration.
- Add benchmark comparisons against earlier NuX versions.
- Add UI exposure for plan/risk/memory results.
- Add CI status badges once workflows are stable.
