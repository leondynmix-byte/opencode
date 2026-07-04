# Create a NuX Release from GitHub UI

Use these steps when you do not want to use the GitHub CLI.

## 1. Merge release PR

Merge the NuX release pull request into `dev`.

## 2. Open releases

Go to the repository page, then open:

```text
Releases -> Draft a new release
```

## 3. Create or choose tag

Use this tag for the first NuX alpha:

```text
nux-v0.1.0-alpha.1
```

Target branch:

```text
dev
```

## 4. Release title

```text
NuX Agent Upgrade v0.1.0-alpha.1
```

## 5. Release description

Copy the contents of:

```text
RELEASE_NOTES_NUX.md
```

## 6. Mark as pre-release

For alpha/beta versions, enable:

```text
Set as a pre-release
```

## 7. Publish

Click:

```text
Publish release
```

## 8. Verify after publishing

Clone a clean copy and run:

```bash
bun install
bun run nux:doctor
bun run nux:bench --summary
```
