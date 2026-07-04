# NuX Safe Self-Learning Policy

## Principle

The agent may learn from work, but it must learn safely. Learning means storing useful, redacted patterns that improve future planning and verification.

## Allowed memory

- project structure summaries
- coding conventions
- package manager and scripts
- recurring test commands
- common build failures and fixes
- user-approved preferences
- task outcome summaries
- benchmark scores

## Forbidden memory

- API keys
- passwords
- private keys
- session cookies
- credit cards
- seed phrases
- raw `.env` contents
- private customer data
- hidden credentials in logs

## Redaction rules

Before writing memory, run the redactor over:

- command output
- error logs
- file paths
- user prompts
- generated summaries

Example replacements:

- `sk-...` → `[REDACTED:OPENAI_KEY]`
- `AKIA...` → `[REDACTED:AWS_ACCESS_KEY]`
- `-----BEGIN PRIVATE KEY-----` → `[REDACTED:PRIVATE_KEY]`

## Memory scoring

A memory item should be saved only when it is likely to help later.

Suggested score:

```text
score = usefulness * confidence * repeatability - sensitivity_risk
```

Save only when score is above the configured threshold.

## Forgetting

NuX should support:

- delete memory file
- remove memory by id
- summarize and compact memory
- disable learning entirely

## Human control

Default mode should be conservative:

- learning enabled for project metadata and task lessons
- no sensitive data
- no automatic network upload
- local storage only
