## NuX change summary

Describe what changed and why.

## Validation

Run the relevant checks and mark results:

- [ ] `bun install`
- [ ] `bun run nux:doctor`
- [ ] `bun run nux:plan "release readiness"`
- [ ] `bun run nux:risk "git status"`
- [ ] `bun run nux:bench`
- [ ] `bun --cwd packages/nux run typecheck`

## Safety review

- [ ] No secrets committed.
- [ ] Memory examples are redacted or fake.
- [ ] Dangerous commands are blocked or approval-gated.
- [ ] Release notes updated if behavior changed.

## Release impact

- [ ] No release needed.
- [ ] Release notes updated in `RELEASE_NOTES_NUX.md`.
- [ ] Tag planned: `nux-vX.Y.Z`.
