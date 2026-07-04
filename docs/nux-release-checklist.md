# NuX Release Checklist

Use this checklist before publishing a NuX release.

## 1. Repository state

- [ ] Work is committed.
- [ ] Branch is pushed.
- [ ] Pull request is open into `dev`.
- [ ] CI is green or failures are documented.

## 2. Local validation

```bash
bun install
bun run nux:doctor
bun run nux:plan "release readiness"
bun run nux:risk "git status"
bun run nux:bench
bun run nux:bench --summary
bun --cwd packages/nux run typecheck
```

## 3. Documentation

- [ ] `README.md` has NuX quick start.
- [ ] `Nux.md` has overview and release links.
- [ ] `docs/nux-installation.md` is current.
- [ ] `docs/nux-release-guide.md` is current.
- [ ] `RELEASE_NOTES_NUX.md` describes the release.

## 4. Safety

- [ ] No secrets in docs, examples, tests, memory, or benchmark files.
- [ ] Memory examples are fake or redacted.
- [ ] Destructive commands are blocked by the risk guard.
- [ ] Network/install/push actions require approval.

## 5. Tag and release

Recommended first tag:

```text
nux-v0.1.0-alpha.1
```

Local commands:

```bash
git tag -a nux-v0.1.0-alpha.1 -m "NuX Agent Upgrade v0.1.0-alpha.1"
git push origin nux-v0.1.0-alpha.1
```

GitHub CLI release:

```bash
gh release create nux-v0.1.0-alpha.1 --title "NuX Agent Upgrade v0.1.0-alpha.1" --notes-file RELEASE_NOTES_NUX.md
```

## 6. After release

- [ ] Create next milestone.
- [ ] Add runtime integration tasks.
- [ ] Add UI integration tasks.
- [ ] Compare benchmark history against the prior release.
