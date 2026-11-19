"use client"

import { type ReactNode, useState } from "react"

import { cn } from "@/lib/utils"

import { CampusPin } from "./campus-pin"
import { MapFrame } from "./map-frame"
import { RN_CAMPUS_AREAS } from "./rn-areas"
import { RN_CAMPUS_CITIES, RN_HEIGHT } from "./rn-outline"

const MAP_WIDTH = 1000
const PIN_ROOM = 48
const PIN_HEIGHT = 44
const VIEW_HEIGHT = RN_HEIGHT * MAP_WIDTH + PIN_ROOM

const PINS = RN_CAMPUS_CITIES.toSorted((a, b) => a.y - b.y)

const CHIPS = RN_CAMPUS_CITIES.toSorted((a, b) =>
  a.name.localeCompare(b.name, "pt-BR"),
)

type City = (typeof RN_CAMPUS_CITIES)[number]

function anchorOf(city: City) {
  if (city.x < 0.2) return "-translate-x-[15%]"

  if (city.x > 0.8) return "-translate-x-[85%]"

  return "-translate-x-1/2"
}

export function CampusExplorer({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<City | null>(null)
  const [shown, setShown] = useState<City>(RN_CAMPUS_CITIES[0])

  const enter = (city: City) => {
    setActive(city)
    setShown(city)
  }

  const leave = () => setActive(null)

  return (
    <>
      <MapFrame>
        <div className="relative">
          <svg
            role="img"
            aria-label="Mapa do Rio Grande do Norte com os municípios e as cidades que têm campus do IFRN"
            viewBox={`0 ${-PIN_ROOM} ${MAP_WIDTH} ${VIEW_HEIGHT}`}
            className="w-full"
          >
            {children}
            {RN_CAMPUS_CITIES.map((city) => (
              <path
                key={city.name}
                d={RN_CAMPUS_AREAS[city.name]}
                onPointerEnter={() => enter(city)}
                onPointerLeave={leave}
                className={cn(
                  "stroke-ink/25 [stroke-width:1.5px] transition-[fill] duration-200 [stroke-linejoin:round]",
                  active?.name === city.name ? "fill-sun" : "fill-lime",
                )}
              />
            ))}
            {PINS.map((city, index) => (
              <CampusPin
                key={city.name}
                x={city.x * MAP_WIDTH}
                y={city.y * MAP_WIDTH}
                order={index}
                onEnter={() => enter(city)}
                onLeave={leave}
              />
            ))}
          </svg>
          <span
            aria-hidden
            style={{
              left: `${shown.x * 100}%`,
              top: `${((shown.y * MAP_WIDTH + PIN_ROOM - PIN_HEIGHT) / VIEW_HEIGHT) * 100}%`,
            }}
            className={cn(
              "pointer-events-none absolute origin-bottom -translate-y-full rounded-md bg-ink px-2.5 py-1 text-sm font-semibold whitespace-nowrap text-cream shadow-lg transition-[opacity,scale] duration-150 ease-snap motion-reduce:transition-opacity",
              anchorOf(shown),
              !active && "scale-95 opacity-0",
            )}
          >
            {shown.name}
          </span>
        </div>
      </MapFrame>

      <ul className="mt-8 flex flex-wrap gap-2">
        {CHIPS.map((city) => (
          <li key={city.name}>
            <button
              type="button"
              onPointerEnter={() => enter(city)}
              onPointerLeave={leave}
              onFocus={() => enter(city)}
              onBlur={leave}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-lime",
                active?.name === city.name
                  ? "border-sun bg-sun text-ink"
                  : "border-cream/20 text-cream/80",
              )}
            >
              {city.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
