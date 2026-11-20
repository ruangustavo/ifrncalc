"use client"

import { ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { type PointerEvent, type ReactNode, useState } from "react"

import { cn } from "@/lib/utils"

import { CampusPin } from "./campus-pin"
import { MapFrame } from "./map-frame"
import { RN_CAMPUS_AREAS } from "./rn-areas"
import { RN_CAMPUS_CITIES, RN_HEIGHT } from "./rn-outline"

const MAP_WIDTH = 1000
const MOBILE_PREVIEW = 5
const REVEAL_STAGGER_MS = 20
const REVEAL_STAGGER_CAP = 10
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
  const [expanded, setExpanded] = useState(false)

  const enter = (city: City) => {
    setActive(city)
    setShown(city)
  }

  const leave = () => setActive(null)

  const hover = (city: City) => (event: PointerEvent) => {
    if (event.pointerType === "mouse") enter(city)
  }

  const unhover = (event: PointerEvent) => {
    if (event.pointerType === "mouse") leave()
  }

  const tap = (city: City) => () => {
    setShown(city)
    setActive((current) => (current?.name === city.name ? null : city))
  }

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
                onPointerEnter={hover(city)}
                onPointerLeave={unhover}
                onClick={tap(city)}
                className={cn(
                  "stroke-ink/25 [stroke-width:1.5px] transition-[fill] duration-200 ease-[ease] [stroke-linejoin:round]",
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
                onEnter={hover(city)}
                onLeave={unhover}
                onTap={tap(city)}
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
        {CHIPS.map((city, index) => (
          <li
            key={city.name}
            className={cn(
              !expanded && index >= MOBILE_PREVIEW && "max-sm:hidden",
              expanded &&
                index >= MOBILE_PREVIEW &&
                "transition-[opacity,scale] duration-200 ease-snap max-sm:starting:scale-95 max-sm:starting:opacity-0 motion-reduce:starting:scale-100",
            )}
            style={
              expanded && index >= MOBILE_PREVIEW
                ? {
                    transitionDelay: `${Math.min(index - MOBILE_PREVIEW, REVEAL_STAGGER_CAP) * REVEAL_STAGGER_MS}ms`,
                  }
                : undefined
            }
          >
            <button
              type="button"
              onPointerEnter={hover(city)}
              onPointerLeave={unhover}
              onClick={tap(city)}
              onFocus={() => enter(city)}
              onBlur={leave}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors duration-150 ease-[ease] outline-none focus-visible:ring-2 focus-visible:ring-lime",
                active?.name === city.name
                  ? "border-sun bg-sun text-ink"
                  : "border-cream/20 text-cream/80",
              )}
            >
              {city.name}
            </button>
          </li>
        ))}
        <li className="sm:hidden">
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 rounded-full border border-lime py-1 pr-2 pl-3 text-sm font-semibold text-lime outline-none focus-visible:ring-2 focus-visible:ring-lime"
          >
            {expanded
              ? "ver menos"
              : `+${CHIPS.length - MOBILE_PREVIEW} cidades`}
            <HugeiconsIcon
              strokeWidth={2.5}
              icon={ArrowDown01Icon}
              className={cn(
                "size-4 transition-transform duration-200 ease-snap motion-reduce:transition-none",
                expanded && "rotate-180",
              )}
            />
          </button>
        </li>
      </ul>
    </>
  )
}
