# Upstream

- Source: https://github.com/dmmulroy/anti-slop
- Commit: `d2a9aea3b896ffcb291a85f2c1301aa2543ad8c8` (2026-09-13, "feat: keep consecutive single-line bindings grouped in require-readable-spacing"); the copied files are byte-identical to `skills/install-anti-slop/assets/anti-slop/` at that commit, which is also the latest change to those assets as of upstream HEAD `13909c9`.
- Installed paths: `tools/oxlint/anti-slop/` (generic plugin `index.ts`, opt-in Effect plugin `effect/index.ts`, unused here)
- Vendored dependency provenance: `vendor/eslint-stylistic/UPSTREAM.md`

## Local deviations

- Added `package.json` with `"type": "module"` so Node loads `index.ts` as ESM without the `MODULE_TYPELESS_PACKAGE_JSON` warning.
