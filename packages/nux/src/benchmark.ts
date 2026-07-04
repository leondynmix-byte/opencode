import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { randomUUID } from "node:crypto"
import type { BenchmarkRecord } from "./types"

export function scoreBenchmark(input: {
  success: boolean
  testsRun?: string[]
  filesChanged?: string[]
  notes?: string[]
}): number {
  let score = input.success ? 0.55 : 0.15
  if ((input.testsRun?.length ?? 0) > 0) score += 0.2
  if ((input.filesChanged?.length ?? 0) > 0) score += 0.1
  if ((input.notes?.length ?? 0) > 0) score += 0.05
  if ((input.filesChanged?.length ?? 0) > 12) score -= 0.1
  return Math.max(0, Math.min(1, Number(score.toFixed(2))))
}

export async function recordBenchmark(input: Omit<BenchmarkRecord, "id" | "createdAt" | "score"> & { score?: number }, path = ".nux/benchmarks.jsonl") {
  const outputPath = resolve(process.cwd(), path)
  const record: BenchmarkRecord = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    score: input.score ?? scoreBenchmark(input),
  }
  await mkdir(dirname(outputPath), { recursive: true })
  const previous = await readTextIfExists(outputPath)
  await writeFile(outputPath, previous + JSON.stringify(record) + "\n", "utf8")
  return record
}

export async function summarizeBenchmarks(path = ".nux/benchmarks.jsonl") {
  const outputPath = resolve(process.cwd(), path)
  const raw = await readTextIfExists(outputPath)
  const rows = raw
    .split(/\r?\n/g)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line) as BenchmarkRecord)
  if (rows.length === 0) return "No NuX benchmarks recorded yet."
  const avg = rows.reduce((sum, row) => sum + row.score, 0) / rows.length
  const latest = rows.slice(-5).map((row) => `- ${row.goal}: ${row.score.toFixed(2)} success=${row.success}`).join("\n")
  return `Benchmarks: ${rows.length}\nAverage score: ${avg.toFixed(2)}\nLatest:\n${latest}`
}

async function readTextIfExists(path: string) {
  try {
    return await readFile(path, "utf8")
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return ""
    throw error
  }
}
