import { RN_OTHER_AREAS } from "./rn-areas"
import { RN_OUTLINE } from "./rn-outline"

const OUTLINE = RN_OUTLINE.map((value) => value * 1000).join(" ")

export function RnBase() {
  return (
    <>
      <polygon
        points={OUTLINE}
        transform="translate(10 12)"
        className="fill-ink/60"
      />
      <path
        d={RN_OTHER_AREAS}
        className="fill-lime stroke-ink/25 [stroke-width:1.5px] [stroke-linejoin:round]"
      />
    </>
  )
}
