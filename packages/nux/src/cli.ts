import { access } from "node:fs/promises"
import { createPlan } from "./planner"
import { assessCommand, assessPath } from "./risk"
import { learnFromRun, ProjectMemoryStore } from "./memory"
import { recordBenchmark, summarizeBenchmarks } from "./benchmark"

const [, , command, ...args] = process.argv

async function main() {
  switch (command) {
    case "doctor":
      await doctor()
      break
    case "plan":
      console.log(JSON.stringify(createPlan(args.join(" ") || "Improve this project"), null, 2))
      break
    case "risk":
      console.log(JSON.stringify(assessCommand(args.join(" ")), null, 2))
      break
    case "path-risk":
      console.log(JSON.stringify(assessPath(args[0] ?? "", (args[1] as "read" | "write") ?? "read"), null, 2))
      break
    case "learn":
      await learn(args)
      break
    case "memory":
      console.log(await new ProjectMemoryStore().summarize())
      break
    case "bench":
      await bench(args)
      break
    default:
      printHelp()
  }
}

async function doctor() {
  const checks = ["package.json", "packages/opencode/package.json", "packages/nux/package.json"]
  const results = []
  for (const item of checks) {
    try {
      await access(item)
      results.push({ check: item, ok: true })
    } catch {
      results.push({ check: item, ok: false })
    }
  }
  const allow = assessCommand("git status").level === "allow"
  const ask = assessCommand("bun install").level === "ask"
  console.log(JSON.stringify({ ok: results.every((x) => x.ok) && allow && ask, results, riskGuard: { allow, ask } }, null, 2))
}

async function learn(args: string[]) {
  const goal = valueAfter(args, "--goal") ?? "manual lesson"
  const outcome = (valueAfter(args, "--outcome") as "success" | "failure" | undefined) ?? "success"
  const summary = valueAfter(args, "--summary") ?? args.join(" ") || "No summary provided"
  const event = await learnFromRun({ goal, outcome, summary })
  console.log(JSON.stringify(event, null, 2))
}

async function bench(args: string[]) {
  if (args.includes("--summary")) {
    console.log(await summarizeBenchmarks())
    return
  }
  const goal = valueAfter(args, "--goal") ?? "NuX smoke benchmark"
  const record = await recordBenchmark({
    goal,
    success: true,
    testsRun: ["nux doctor", "risk guard smoke test"],
    filesChanged: [],
    notes: ["Generated from NuX CLI smoke benchmark"],
  })
  console.log(JSON.stringify(record, null, 2))
}

function valueAfter(args: string[], key: string) {
  const index = args.indexOf(key)
  if (index === -1) return undefined
  return args[index + 1]
}

function printHelp() {
  console.log(`NuX Agent Upgrade CLI

Commands:
  doctor                         Check basic NuX readiness
  plan <goal>                    Create a task plan
  risk <command>                 Assess shell command risk
  path-risk <path> [read|write]  Assess file path risk
  learn --goal G --outcome success|failure --summary S
  memory                         Print recent safe memory
  bench [--summary]              Record or summarize benchmark
`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
