import { defineConfig } from "orval"

const KEPT_OP_IDS = new Set([
  "api_endpoints_ensino_meus_periodos_letivos",
  "api_endpoints_ensino_meu_boletim",
  "api_endpoints_ensino_get_meus_dados_aluno",
])

const HTTP_METHODS = [
  "get",
  "put",
  "post",
  "delete",
  "options",
  "head",
  "patch",
  "trace",
] as const

function collectRefs(node: unknown, acc: Set<string>): void {
  if (Array.isArray(node)) {
    for (const item of node) collectRefs(item, acc)
    return
  }
  if (node !== null && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (key === "$ref" && typeof value === "string") {
        const match = value.match(/^#\/components\/schemas\/(.+)$/)
        if (match) acc.add(match[1])
      } else {
        collectRefs(value, acc)
      }
    }
  }
}

export default defineConfig({
  suap: {
    input: {
      target: "https://suap.ifrn.edu.br/api/openapi.json",
      filters: { mode: "include", tags: ["Ensino"] },
      override: {
        transformer: (spec) => {
          // 1. Keep only the operations we use; drop paths left with no methods.
          const paths = spec.paths ?? {}
          for (const [route, pathItem] of Object.entries(paths)) {
            if (!pathItem) continue
            for (const method of HTTP_METHODS) {
              const operation = pathItem[method]
              const operationId = operation?.operationId
              if (operation && !(operationId && KEPT_OP_IDS.has(operationId))) {
                delete pathItem[method]
              }
            }
            if (!HTTP_METHODS.some((method) => pathItem[method])) {
              delete paths[route]
            }
          }

          // 2. Collect schemas referenced by the kept operations, then expand
          //    transitively through components.schemas.
          const schemas = spec.components?.schemas ?? {}
          const needed = new Set<string>()
          collectRefs(paths, needed)
          const queue = [...needed]
          while (queue.length > 0) {
            const name = queue.pop()
            if (name === undefined) continue
            const schema = schemas[name]
            if (!schema) continue
            const refs = new Set<string>()
            collectRefs(schema, refs)
            for (const ref of refs) {
              if (!needed.has(ref)) {
                needed.add(ref)
                queue.push(ref)
              }
            }
          }

          // 3. Prune components.schemas to only the reachable set, so orval
          //    doesn't emit ~85 unused model files.
          for (const name of Object.keys(schemas)) {
            if (!needed.has(name)) delete schemas[name]
          }

          return spec
        },
      },
    },
    output: {
      mode: "split",
      client: "fetch",
      clean: true,
      target: "src/lib/suap/generated/client.ts",
      schemas: "src/lib/suap/generated/models",
      override: {
        mutator: { path: "src/lib/suap/fetcher.ts", name: "suapFetch" },
        // api_endpoints_ensino_meu_boletim -> meuBoletim
        // api_endpoints_ensino_get_meus_dados_aluno -> meusDadosAluno
        operationName: (operation) =>
          (operation.operationId ?? "")
            .replace(/^api_endpoints_ensino_/, "")
            .replace(/^(get|post|put|patch|delete)_/, "")
            .replace(/_([a-z])/g, (_match: string, char: string) =>
              char.toUpperCase(),
            ),
      },
    },
    hooks: { afterAllFilesWrite: "biome check --write" },
  },
})
