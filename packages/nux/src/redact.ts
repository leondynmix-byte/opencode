const SECRET_PATTERNS: Array<[RegExp, string]> = [
  [/sk-[A-Za-z0-9_\-]{20,}/g, "[REDACTED:OPENAI_KEY]"],
  [/AKIA[0-9A-Z]{16}/g, "[REDACTED:AWS_ACCESS_KEY]"],
  [/ghp_[A-Za-z0-9_]{20,}/g, "[REDACTED:GITHUB_TOKEN]"],
  [/github_pat_[A-Za-z0-9_]{20,}/g, "[REDACTED:GITHUB_TOKEN]"],
  [/xox[baprs]-[A-Za-z0-9-]{10,}/g, "[REDACTED:SLACK_TOKEN]"],
  [/AIza[0-9A-Za-z_\-]{20,}/g, "[REDACTED:GOOGLE_API_KEY]"],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g, "[REDACTED:PRIVATE_KEY]"],
  [/(password|passwd|pwd|secret|token|api[_-]?key)\s*[:=]\s*[^\s]+/gi, "$1=[REDACTED]"],
]

export function redactSecrets(input: string): string {
  let output = input
  for (const [pattern, replacement] of SECRET_PATTERNS) {
    output = output.replace(pattern, replacement)
  }
  return output
}

export function hasLikelySecret(input: string): boolean {
  return SECRET_PATTERNS.some(([pattern]) => {
    pattern.lastIndex = 0
    return pattern.test(input)
  })
}
