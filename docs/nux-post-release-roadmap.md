# NuX Post-Release Roadmap

This roadmap defines what should happen after `nux-v0.1.0-alpha.1`.

## Phase 1 — Runtime hooks

- Wire `planner` into the OpenCode task/session lifecycle.
- Run `risk` before shell execution.
- Save sanitized `memory` after completed tasks.
- Record benchmark metadata after agent runs.

## Phase 2 — UI exposure

- Show plan steps in the TUI.
- Show command risk level before execution.
- Show memory summary per project.
- Add a benchmark status panel.

## Phase 3 — Evaluation

- Add repeatable coding tasks.
- Add repository navigation tasks.
- Add refactor and test-fix tasks.
- Track solve rate, retries, failed commands, and rollback usage.

## Phase 4 — Release quality

- Add NuX CI badge.
- Add generated benchmark reports.
- Add changelog automation.
- Add release artifact packaging.

## Phase 5 — Advanced agent roles

- Architect: designs implementation plan.
- Coder: applies focused patches.
- Reviewer: checks diffs and regressions.
- Tester: selects and runs checks.
- Documenter: updates docs and release notes.
