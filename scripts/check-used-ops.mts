import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

const SRC_DIR = "src"

const ALLOWED_OPS = new Set([
  "meusDadosAluno",
  "getMeusDadosAlunoUrl",
  "meuBoletim",
  "getMeuBoletimUrl",
  "meusPeriodosLetivos",
  "getMeusPeriodosLetivosUrl",
])

const IMPORT_RE =
  /import\s+(?:type\s+)?\{([^}]*)\}\s+from\s+["']@\/lib\/suap\/generated\/client["']/g

function walk(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...walk(full))
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      out.push(full)
    }
  }
  return out
}

const violations: { file: string; name: string }[] = []

for (const file of walk(SRC_DIR)) {
  const content = readFileSync(file, "utf8")
  for (const match of content.matchAll(IMPORT_RE)) {
    const names = match[1]
      .split(",")
      .map((part) => part.trim())
      .filter((part) => part.length > 0)
      .map((part) =>
        part
          .replace(/^type\s+/, "")
          .split(/\s+as\s+/)[0]
          .trim(),
      )
    for (const name of names) {
      if (!ALLOWED_OPS.has(name)) {
        violations.push({ file, name })
      }
    }
  }
}

if (violations.length > 0) {
  console.error(
    "Imports from @/lib/suap/generated/client not covered by SUAP drift monitoring:",
  )
  for (const { file, name } of violations) {
    console.error(`  ${file}: ${name}`)
  }
  console.error(
    "\nIf this is a new SUAP operation, add it to ALLOWED_OPS in " +
      "scripts/check-used-ops.mts AND to KEPT_OP_IDS in orval.config.ts so " +
      "drift detection covers it.",
  )
  process.exit(1)
}

console.log(
  `✓ All @/lib/suap/generated/client imports are covered (${ALLOWED_OPS.size} allowed names)`,
)
