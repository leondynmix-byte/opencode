import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { randomUUID } from "node:crypto"
import type { MemoryEvent } from "./types"
import { redactSecrets } from "./redact"

export interface MemoryStoreOptions {
  path?: string
  maxItems?: number
  minScoreToSave?: number
  redact?: boolean
}

export class ProjectMemoryStore {
  readonly path: string
  readonly maxItems: number
  readonly minScoreToSave: number
  readonly redact: boolean

  constructor(options: MemoryStoreOptions = {}) {
    this.path = resolve(process.cwd(), options.path ?? ".nux/memory.jsonl")
    this.maxItems = options.maxItems ?? 1000
    this.minScoreToSave = options.minScoreToSave ?? 0.55
    this.redact = options.redact ?? true
  }

  async append(input: Omit<MemoryEvent, "id" | "createdAt">): Promise<MemoryEvent | null> {
    if (input.score < this.minScoreToSave) return null

    const event: MemoryEvent = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      summary: this.redact ? redactSecrets(input.summary) : input.summary,
      metadata: sanitizeMetadata(input.metadata, this.redact),
    }

    await mkdir(dirname(this.path), { recursive: true })
    const current = await this.readAll()
    const next = [...current, event].slice(-this.maxItems)
    await writeFile(this.path, next.map((item) => JSON.stringify(item)).join("\n") + "\n", "utf8")
    return event
  }

  async readAll(): Promise<MemoryEvent[]> {
    try {
      const raw = await readFile(this.path, "utf8")
      return raw
        .split(/\r?\n/g)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => JSON.parse(line) as MemoryEvent)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return []
      throw error
    }
  }

  async summarize(limit = 20): Promise<string> {
    const all = await this.readAll()
    const latest = all.slice(-limit)
    if (latest.length === 0) return "No NuX memory yet."
    return latest
      .map((item) => `- [${item.kind}] ${item.summary} (score=${item.score.toFixed(2)}, tags=${item.tags.join(",")})`)
      .join("\n")
  }
}

function sanitizeMetadata(metadata: Record<string, unknown> | undefined, redact: boolean) {
  if (!metadata) return undefined
  if (!redact) return metadata
  return JSON.parse(redactSecrets(JSON.stringify(metadata))) as Record<string, unknown>
}

export async function learnFromRun(args: {
  goal: string
  outcome: "success" | "failure"
  summary: string
  tags?: string[]
  score?: number
  memoryPath?: string
}) {
  const store = new ProjectMemoryStore({ path: args.memoryPath })
  return store.append({
    kind: args.outcome === "success" ? "lesson" : "failure",
    goal: args.goal,
    summary: args.summary,
    tags: args.tags ?? [args.outcome],
    score: args.score ?? (args.outcome === "success" ? 0.78 : 0.65),
  })
}
