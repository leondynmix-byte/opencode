# NuX Installation Guide

This guide explains how to install and verify the NuX Agent Upgrade layer inside this OpenCode fork.

## Requirements

- Windows 10/11, macOS, or Linux.
- Git.
- Bun `1.3.14` or newer.
- Node.js only if your local tooling requires it; NuX itself is designed to run through Bun in this monorepo.

## Fresh clone

```bash
git clone https://github.com/leondynmix-byte/opencode.git
cd opencode
git checkout dev
bun install
```

## Verify NuX

```bash
bun run nux:doctor
```

Expected result: JSON output with `ok: true` and successful checks for:

- `package.json`
- `packages/opencode/package.json`
- `packages/nux/package.json`

## Basic usage

Create a plan:

```bash
bun run nux:plan "Improve repository onboarding and release quality"
```

Check command risk:

```bash
bun run nux:risk "git status"
bun run nux:risk "rm -rf /"
```

Record a safe learning event:

```bash
bun run nux:learn --goal "Install NuX" --outcome success --summary "Doctor passed and CLI commands worked."
```

View local memory summary:

```bash
bun run nux:memory
```

Run a benchmark smoke record:

```bash
bun run nux:bench
bun run nux:bench --summary
```

## Windows quick start

If `install_NuX.bat` is present in your checkout, run:

```bat
install_NuX.bat
```

Then run:

```bat
bun install
bun run nux:doctor
```

## Configuration

NuX configuration lives in:

```text
configs/nux.agent.json
```

Important defaults:

- Memory is enabled but local-only.
- Secrets are redacted before memory writes.
- Dangerous shell commands are blocked.
- Network/install/git-push actions require approval.

## Troubleshooting

### `bun` is not recognized

Install Bun, restart your terminal, then verify:

```bash
bun --version
```

### `packages/nux/package.json` not found

Make sure you are on a branch that includes NuX:

```bash
git checkout dev
git pull
```

### Typecheck fails in upstream packages

First verify NuX by running only its local package command:

```bash
bun --cwd packages/nux run typecheck
```

If root typecheck fails, document whether the error is from upstream OpenCode packages or from `packages/nux`.
