export const TITANIUM =
  "bg-[linear-gradient(140deg,#7a7d80,#2b2d2f_22%,#1c1d1e_55%,#3b3e40_80%,#6c6f72)]"

export function SideButtons() {
  return (
    <>
      <span
        className={`absolute top-[16%] -left-[3px] h-[4%] w-[3px] rounded-l-sm ${TITANIUM}`}
      />
      <span
        className={`absolute top-[24%] -left-[3px] h-[7.5%] w-[3px] rounded-l-sm ${TITANIUM}`}
      />
      <span
        className={`absolute top-[33%] -left-[3px] h-[7.5%] w-[3px] rounded-l-sm ${TITANIUM}`}
      />
      <span
        className={`absolute top-[27%] -right-[3px] h-[11%] w-[3px] rounded-r-sm ${TITANIUM}`}
      />
      <span
        className={`absolute top-[56%] -right-[2px] h-[6%] w-[2px] rounded-r-sm ${TITANIUM}`}
      />
    </>
  )
}
