import { CampusPin } from "./campus-pin"
import { MapFrame } from "./map-frame"
import { RN_CAMPUS_CITIES, RN_HEIGHT, RN_OUTLINE } from "./rn-outline"

const MAP_WIDTH = 1000
const PIN_ROOM = 48

const OUTLINE = RN_OUTLINE.map((value) => value * MAP_WIDTH).join(" ")
const PINS = RN_CAMPUS_CITIES.toSorted((a, b) => a.y - b.y)

export function RnMap() {
  return (
    <MapFrame>
      <svg
        role="img"
        aria-label="Mapa do Rio Grande do Norte com as cidades que têm campus do IFRN"
        viewBox={`0 ${-PIN_ROOM} ${MAP_WIDTH} ${RN_HEIGHT * MAP_WIDTH + PIN_ROOM}`}
        className="w-full"
      >
        <polygon
          points={OUTLINE}
          transform="translate(10 12)"
          className="fill-ink/60"
        />
        <polygon
          points={OUTLINE}
          className="fill-lime stroke-ink [stroke-width:3px] [stroke-linejoin:round]"
        />
        {PINS.map((city, index) => (
          <CampusPin
            key={city.name}
            x={city.x * MAP_WIDTH}
            y={city.y * MAP_WIDTH}
            order={index}
          />
        ))}
      </svg>
    </MapFrame>
  )
}
