import type { NuxMode, NuxPlan, PlanStep, RiskLevel } from "./types"

const GOAL_KEYWORDS = {
  ui: ["ui", "ux", "visual", "interface", "واجهة", "تصميم", "شكل"],
  tests: ["test", "tests", "typecheck", "lint", "اختبار", "فحص"],
  docs: ["docs", "readme", "documentation", "شرح", "توثيق"],
  refactor: ["refactor", "clean", "architecture", "رتب", "نظم"],
  agent: ["agent", "planner", "memory", "learn", "تعلم", "ذاكرة", "وكيل"],
}

export function createPlan(goal: string, options: { mode?: NuxMode; maxSteps?: number } = {}): NuxPlan {
  const mode = options.mode ?? inferMode(goal)
  const maxSteps = options.maxSteps ?? 8
  const tags = classifyGoal(goal)
  const steps: PlanStep[] = [
    inspectStep(goal),
    architectureStep(tags),
    implementationStep(tags, mode),
    policyStep(),
    verificationStep(tags),
    documentationStep(tags),
    learningStep(),
  ].slice(0, maxSteps)

  return {
    goal,
    mode,
    createdAt: new Date().toISOString(),
    steps,
    notes: [
      "Start with repository understanding before editing.",
      "Prefer focused checks before full suites.",
      "Store only sanitized lessons in NuX memory.",
    ],
  }
}

function inferMode(goal: string): NuxMode {
  const lower = goal.toLowerCase()
  if (lower.includes("review") || lower.includes("راجع")) return "review"
  if (lower.includes("learn") || lower.includes("تعلم")) return "learn"
  if (lower.includes("fix") || lower.includes("طور") || lower.includes("add") || lower.includes("أضف")) return "patch"
  return "plan"
}

function classifyGoal(goal: string): string[] {
  const lower = goal.toLowerCase()
  const tags: string[] = []
  for (const [tag, keywords] of Object.entries(GOAL_KEYWORDS)) {
    if (keywords.some((keyword) => lower.includes(keyword))) tags.push(tag)
  }
  return tags.length ? tags : ["general"]
}

function inspectStep(goal: string): PlanStep {
  return {
    id: "inspect",
    title: "Inspect repository context",
    reason: `Understand the current structure before changing code for: ${goal}`,
    risk: "allow",
    expectedFiles: ["package.json", "packages/**/package.json", "README.md"],
    verification: ["Confirm package manager and relevant scripts"],
    rollback: "No revert needed for this read-only step.",
  }
}

function architectureStep(tags: string[]): PlanStep {
  return {
    id: "design",
    title: "Design minimal upgrade path",
    reason: `Create a small integration plan for: ${tags.join(", ")}`,
    risk: "allow",
    expectedFiles: ["docs/**", "configs/**"],
    verification: ["Review plan for scope and missing checks"],
    rollback: "Remove generated docs and configs if direction changes.",
  }
}

function implementationStep(tags: string[], mode: NuxMode): PlanStep {
  const risk: RiskLevel = mode === "build" ? "ask" : "allow"
  return {
    id: "implement",
    title: "Implement focused changes",
    reason: `Add the smallest useful module for: ${tags.join(", ")}`,
    risk,
    expectedFiles: ["packages/nux/src/**"],
    verification: ["Run NuX doctor", "Run NuX benchmark"],
    rollback: "Revert package folder and script entries if checks fail.",
  }
}

function policyStep(): PlanStep {
  return {
    id: "policy",
    title: "Review action policy",
    reason: "Check actions before execution.",
    risk: "allow",
    expectedFiles: ["packages/nux/src/risk.ts", "packages/nux/src/redact.ts"],
    verification: ["Policy review returns expected levels"],
    rollback: "Keep policy module standalone until ready for deeper integration.",
  }
}

function verificationStep(tags: string[]): PlanStep {
  return {
    id: "verify",
    title: "Verify with cheapest reliable checks",
    reason: `Select checks based on goal tags: ${tags.join(", ")}`,
    risk: "ask",
    expectedFiles: [],
    verification: ["lint", "typecheck", "focused package tests"],
    rollback: "Use version control diff to isolate and revert failing files.",
  }
}

function documentationStep(tags: string[]): PlanStep {
  return {
    id: "document",
    title: "Document the new capability",
    reason: `Make the upgrade understandable for users and future agents: ${tags.join(", ")}`,
    risk: "allow",
    expectedFiles: ["Nux.md", "docs/nux-*.md"],
    verification: ["README links and commands are accurate"],
    rollback: "Remove stale docs or mark as experimental.",
  }
}

function learningStep(): PlanStep {
  return {
    id: "learn",
    title: "Store safe task lesson",
    reason: "Improve the next run with useful project history.",
    risk: "allow",
    expectedFiles: [".nux/memory.jsonl"],
    verification: ["Memory entry is sanitized and useful"],
    rollback: "Delete the memory entry or disable learning.",
  }
}
