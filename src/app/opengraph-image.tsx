import { ImageResponse } from "next/og"

export const alt =
  "IFRN Calc: descubra quanto você precisa tirar pra passar no IFRN"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const PRIMARY = "#16a34a"

const TILES = [
  { label: "1º Bim", value: "72", color: "#09090b" },
  { label: "2º Bim", value: "65", color: "#09090b" },
  { label: "3º Bim", value: "54", color: "#eab308" },
  { label: "4º Bim", value: "54", color: "#eab308" },
] as const

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "72px",
        background: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
        color: "#09090b",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: 600 }}>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 700,
            color: PRIMARY,
          }}
        >
          IFRN Calc
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Quanto você precisa tirar pra passar?
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            color: "#52525b",
          }}
        >
          Notas direto do SUAP. Mais de 10 mil alunos em todo o RN.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 420,
          padding: 28,
          borderRadius: 28,
          background: "#ffffff",
          border: "1px solid #e4e4e7",
          boxShadow: "0 24px 48px rgba(22, 163, 74, 0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              width: 8,
              height: 48,
              borderRadius: 4,
              background: "#22c55e",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
              Matemática
            </div>
            <div style={{ display: "flex", fontSize: 20, color: "#71717a" }}>
              120h • Média parcial: 69
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          {TILES.map((tile) => (
            <div
              key={tile.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                padding: "12px 0",
                borderRadius: 14,
                border: "1px solid #e4e4e7",
              }}
            >
              <div style={{ display: "flex", fontSize: 16, color: "#71717a" }}>
                {tile.label}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 34,
                  fontWeight: 600,
                  color: tile.color,
                }}
              >
                {tile.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    size,
  )
}
