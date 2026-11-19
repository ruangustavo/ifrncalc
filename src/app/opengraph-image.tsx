import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

import {
  RN_CAMPUS_CITIES,
  RN_HEIGHT,
  RN_OUTLINE,
} from "./(app)/_components/reach/rn-outline"

export const alt =
  "IFRN Calc: mais de 10 mil alunos do IFRN já sabem quanto falta pra passar"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const FOREST = "#0b2519"
const INK = "#061b10"
const CREAM = "#f5efd8"
const LIME = "#97f05d"
const CORAL = "#ff6955"
const MUTED = "#a9b8a6"

const MAP_WIDTH = 520
const MAP_HEIGHT = RN_HEIGHT * MAP_WIDTH
const PIN_SCALE = 0.8
const OUTLINE = RN_OUTLINE.map((value) => value * MAP_WIDTH).join(" ")
const CITIES = RN_CAMPUS_CITIES.toSorted((a, b) => a.y - b.y)
const FONT_DIR = join(process.cwd(), "assets/fonts")

export default async function OpengraphImage() {
  const [display, body] = await Promise.all([
    readFile(join(FONT_DIR, "bricolage-grotesque-800.ttf")),
    readFile(join(FONT_DIR, "inter-500.ttf")),
  ])

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 72,
        background: FOREST,
        color: CREAM,
        fontFamily: "Body",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: 520,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width={52} height={52} viewBox="0 0 64 64">
            <rect x={5} y={5} width={25} height={25} rx={6} fill={LIME} />
            <rect x={34} y={5} width={25} height={25} rx={6} fill={LIME} />
            <rect x={5} y={34} width={25} height={25} rx={6} fill={LIME} />
            <circle cx={46.5} cy={46.5} r={12.5} fill={CORAL} />
            <path
              d="M11.5 17.5h12M17.5 11.5v12M40.5 17.5h12M13.3 42.3l8.4 8.4M21.7 42.3l-8.4 8.4M41 43.5h11M41 49.5h11"
              stroke={FOREST}
              strokeWidth={3.6}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div
            style={{
              display: "flex",
              fontFamily: "Display",
              fontSize: 40,
              letterSpacing: "-0.02em",
            }}
          >
            IFRN Calc
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Display",
              fontSize: 136,
              whiteSpace: "nowrap",
              lineHeight: 0.85,
              letterSpacing: "-0.03em",
              color: LIME,
            }}
          >
            +10 mil
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontFamily: "Display",
              fontSize: 42,
              lineHeight: 1.1,
            }}
          >
            alunos do IFRN já sabem quanto falta pra passar.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: MUTED }}>
          Suas notas direto do SUAP
        </div>
      </div>

      <svg
        width={MAP_WIDTH}
        height={MAP_HEIGHT + 50}
        viewBox={`-10 -50 ${MAP_WIDTH + 40} ${MAP_HEIGHT + 50}`}
      >
        <polygon points={OUTLINE} fill={LIME} stroke={INK} strokeWidth={3} />
        {CITIES.map((city) => (
          <g
            key={city.name}
            transform={`translate(${city.x * MAP_WIDTH} ${city.y * MAP_WIDTH}) scale(${PIN_SCALE})`}
          >
            <path
              d="M0 0C-6-13-15-21-15-31a15 15 0 1 1 30 0C15-21 6-13 0 0Z"
              fill={CORAL}
              stroke={INK}
              strokeWidth={3 / PIN_SCALE}
              strokeLinejoin="round"
            />
            <circle cx={0} cy={-31} r={5.5} fill={INK} />
          </g>
        ))}
      </svg>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Display", data: display, weight: 800 },
        { name: "Body", data: body, weight: 500 },
      ],
    },
  )
}
