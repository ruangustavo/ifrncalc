import { defineConfig } from "orval"

export default defineConfig({
  suap: {
    input: {
      target: "https://suap.ifrn.edu.br/api/openapi.json",
      filters: { mode: "include", tags: ["Ensino"] },
    },
    output: {
      mode: "split",
      client: "fetch",
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
