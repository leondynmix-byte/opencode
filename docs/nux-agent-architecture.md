# NuX Agent Architecture

## Layers

```text
User Goal
  ↓
Intent Normalizer
  ↓
Project Context Loader
  ↓
Planner ──→ Risk Guard
  ↓          ↓
Tool Router → Executor → Verifier
  ↓                       ↓
Critic / Reviewer ← Benchmark Harness
  ↓
Safe Self-Learning Memory
```

## 1. Intent Normalizer

Converts natural language requests into a stable internal objective:

- goal
- constraints
- expected output
- risk level
- suggested mode

## 2. Project Context Loader

Builds a repository map:

- package manager
- scripts
- source directories
- test commands
- frameworks
- generated files to ignore
- previous NuX memory summaries

## 3. Planner

Creates a small dependency graph:

- inspect
- design
- implement
- verify
- document
- learn

Each step has:

- reason
- risk
- expected files
- verification command
- rollback note

## 4. Risk Guard

Risk Guard checks commands and file paths before execution.

Blocked by default:

- destructive deletes
- disk format commands
- privilege escalation
- credential exfiltration
- hidden shell download-and-execute
- writes to `.ssh`, `.env`, credentials, or system directories

Approval required:

- package installation
- network calls
- git push
- process-killing commands
- large refactors

Allowed:

- read-only inspection
- local tests
- formatting
- typecheck
- patch generation

## 5. Tool Router

The router decides whether a task needs:

- file read
- file write
- shell command
- search
- browser/web
- git diff
- test runner
- package manager

## 6. Executor

Executes one step at a time and records:

- command
- duration
- output summary
- changed files
- errors
- retry attempts

## 7. Verifier

Selects the cheapest checks first:

1. syntax/type validation
2. focused unit tests
3. integration tests
4. full test suite
5. manual review notes

## 8. Critic / Reviewer

Reviews patches for:

- accidental secret exposure
- untested changes
- broken imports
- risky shell usage
- poor UX
- over-engineering

## 9. Safe Self-Learning Memory

Stores only redacted, useful lessons. It should never store raw secrets or private user content unless explicitly permitted.

Memory example:

```json
{"kind":"lesson","goal":"fix build","summary":"Run package-level typecheck before root typecheck","score":0.82}
```

## Recommended integration path

1. Add `packages/nux` as a standalone workspace module.
2. Use it from CLI first: `bun run nux:plan` and `bun run nux:risk`.
3. Wire planner/risk into OpenCode agent execution.
4. Add UI panels for Plan, Risk, Memory, Benchmark.
5. Add regression reports to CI.
