export type NuxMode = "plan" | "patch" | "build" | "review" | "learn"

export type RiskLevel = "allow" | "ask" | "block"

export interface NuxConfig {
  name: string
  version: string
  mode: "conservative" | "balanced" | "aggressive"
  memory: {
    enabled: boolean
    path: string
    maxItems: number
    minScoreToSave: number
    redactSecrets: boolean
    localOnly: boolean
  }
  planner: {
    enabled: boolean
    maxSteps: number
    requireVerificationStep: boolean
    requireRollbackNote: boolean
  }
  risk: {
    defaultPolicy: RiskLevel
    blockDangerousCommands: boolean
    blockSecretPaths: boolean
    approvalRequiredForNetwork: boolean
    approvalRequiredForInstall: boolean
    approvalRequiredForGitPush: boolean
  }
}

export interface PlanStep {
  id: string
  title: string
  reason: string
  risk: RiskLevel
  expectedFiles: string[]
  verification: string[]
  rollback: string
}

export interface NuxPlan {
  goal: string
  mode: NuxMode
  createdAt: string
  steps: PlanStep[]
  notes: string[]
}

export interface RiskFinding {
  rule: string
  level: RiskLevel
  message: string
}

export interface RiskDecision {
  command?: string
  path?: string
  level: RiskLevel
  findings: RiskFinding[]
}

export interface MemoryEvent {
  id: string
  kind: "project" | "lesson" | "preference" | "benchmark" | "failure"
  createdAt: string
  goal?: string
  summary: string
  tags: string[]
  score: number
  metadata?: Record<string, unknown>
}

export interface BenchmarkRecord {
  id: string
  createdAt: string
  goal: string
  success: boolean
  testsRun: string[]
  filesChanged: string[]
  score: number
  notes: string[]
}
