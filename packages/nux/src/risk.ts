import type { RiskDecision, RiskFinding, RiskLevel } from "./types"

const BLOCK_COMMAND_RULES: Array<[RegExp, string]> = [
  [/\brm\s+-rf\s+(\/|~|\*|\.\.)/i, "Destructive recursive delete"],
  [/\b(del|erase)\s+.*(\/s|\/q)/i, "Destructive Windows delete"],
  [/\b(format|mkfs|diskpart|fdisk)\b/i, "Disk formatting or partition command"],
  [/\bshutdown\b|\breboot\b/i, "System shutdown or reboot"],
  [/\bchmod\s+-R\s+777\b/i, "Overly permissive recursive chmod"],
  [/\b(curl|wget)\b[\s\S]*\|\s*(sh|bash|zsh|powershell|pwsh)\b/i, "Download and execute shell pipeline"],
  [/\b(powershell|pwsh)\b[\s\S]*\b(IEX|Invoke-Expression)\b/i, "PowerShell dynamic execution"],
  [/\b(git\s+push\b[\s\S]*--force|git\s+push\s+-f)\b/i, "Force push"],
]

const ASK_COMMAND_RULES: Array<[RegExp, string]> = [
  [/\b(npm|pnpm|yarn|bun|pip|pipx|cargo|go)\s+(install|add|get)\b/i, "Package installation changes environment"],
  [/\b(curl|wget|Invoke-WebRequest|iwr)\b/i, "Network access"],
  [/\bgit\s+push\b/i, "Remote git write"],
  [/\b(kill|taskkill|pkill)\b/i, "Process termination"],
  [/\bchmod\b|\bchown\b/i, "Permission or ownership change"],
]

const SECRET_PATH_RULES: Array<[RegExp, string]> = [
  [/(^|[\\/])\.env(\.|$|[\\/])?/i, "Environment file"],
  [/(^|[\\/])\.ssh([\\/]|$)/i, "SSH secrets"],
  [/(id_rsa|id_ed25519|private[_-]?key|credentials|secrets?)/i, "Likely credential path"],
]

export function assessCommand(command: string): RiskDecision {
  const findings: RiskFinding[] = []
  for (const [pattern, message] of BLOCK_COMMAND_RULES) {
    if (pattern.test(command)) findings.push({ rule: pattern.source, level: "block", message })
  }
  for (const [pattern, message] of ASK_COMMAND_RULES) {
    if (pattern.test(command)) findings.push({ rule: pattern.source, level: "ask", message })
  }
  return {
    command,
    level: highest(findings),
    findings,
  }
}

export function assessPath(path: string, action: "read" | "write" = "read"): RiskDecision {
  const findings: RiskFinding[] = []
  for (const [pattern, message] of SECRET_PATH_RULES) {
    if (pattern.test(path)) {
      findings.push({
        rule: pattern.source,
        level: action === "write" ? "block" : "ask",
        message: `${message}: ${action} requires explicit review`,
      })
    }
  }
  return { path, level: highest(findings), findings }
}

function highest(findings: RiskFinding[]): RiskLevel {
  if (findings.some((item) => item.level === "block")) return "block"
  if (findings.some((item) => item.level === "ask")) return "ask"
  return "allow"
}
