// Hand-drawn paths stay deterministic across server and client rendering.
// These icons are decorative; their neighboring text carries the meaning.
const glyphs = {
  calculator: (
    <>
      <path d="M14 8 48 6l3 49-38 2Q10 35 14 8Zm7 9 20-1 1 12-22 1 1-12Z" />
      <path d="m20 37 4-1m11 0 5 1m-20 10 4-1m12 0h5M16 60l30-1" />
    </>
  ),
  wave: (
    <>
      <path d="m19 31-5-11q-3-7 1-8 4-2 7 6l4 7-3-15q-1-7 3-7 4-1 5 6l3 16 1-13q0-6 4-5 4 0 3 7l-1 18 6-8q4-4 6-1 2 2-1 7l-9 17q-5 10-14 8-9-1-13-10L8 32q-3-5 1-7 3-1 10 6Z" />
      <path d="M22 34q11-9 15 3m-11 0q-2 6 3 9M5 14l-3-4M8 8 5 3m45 11 7-6m-5 13 8-2" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 37q24-11 51-6M40 16l17 14-16 16" />
      <path d="M9 41q15-6 27-6" opacity="0.4" />
    </>
  ),
  star: (
    <>
      <path d="m30 8 9 15 18 1-14 13 4 20-18-11-17 8 4-18L3 23l19-1 8-14Z" />
      <path d="m32 14 5 12 14 1M4 8l5 5m40-5-3 7M3 49l5-2m47 2 5 4" />
      <path d="m23 32 2 1m10-2 2 1m-13 6q5 5 11 0" />
    </>
  ),
  target: (
    <>
      <path d="M47 20q11 14 1 28T18 54Q2 47 6 29T28 8q8-1 13 4" />
      <path d="M38 22q10 8 3 18T21 43q-10-8-3-18 6-8 16-5" />
      <path d="M31 28q-7-2-8 5t7 7q8-2 5-8M29 34 53 9m-12 2 12-3 3 12M50 51l5 5m-11 0 2 6" />
      <path d="M6 43q5 14 20 15" opacity="0.4" />
    </>
  ),
  report: (
    <>
      <path d="m15 9 35-3-1 50-36 2 2-49ZM22 9l-1 48" />
      <path d="m8 19 10-1M8 30h10M7 41l11-1m12-19 12-1m-12 9 12-1m-13 9 5 4 10-11" />
      <path d="m31 49 11-1M16 61l26-1" opacity="0.45" />
    </>
  ),
  check: (
    <>
      <path d="m9 33 15 15Q40 22 56 12" strokeWidth="4" />
      <path d="m13 41 11 10 13-18" opacity="0.45" />
    </>
  ),
  pencil: (
    <>
      <path d="m10 40 30-33q4-4 8 0l7 7q3 3 0 6L24 52 7 57l3-17Z" />
      <path d="m11 40 13 12m-8-7L46 13m-9-3 14 13M8 53l6-1-5-5m22 12 22-3" />
    </>
  ),
  connect: (
    <>
      <path d="m18 20-1-13m21 12 1-14M9 21l39-2-2 15q-2 13-17 12T11 34L9 21Z" />
      <path d="M28 46q-4 18 16 13l12-3M29 25l-8 9 8-1-1 8 10-13-9 2 2-5M4 12l-3-4m50 2 6-6m-3 17 7-1" />
      <path d="M14 36q2 11 15 12" opacity="0.4" />
    </>
  ),
  sliders: (
    <>
      <path d="m13 7-2 14m0 12-1 24m22-49-1 27m0 12-1 10M53 6l-1 11m-1 13-2 27" />
      <path d="m6 22 11-1 1 11-13 2 1-12Zm19 14 12-1 1 11-14 2 1-12Zm20-18 12-1 1 11-14 2 1-12Z" />
      <path d="m5 60 50-2" opacity="0.4" />
    </>
  ),
}

export function LandingIcon({
  name,
  className,
}: {
  name: keyof typeof glyphs
  className?: string
}) {
  return (
    <svg
      className={`shrink-0 ${className ?? ""}`}
      width="32"
      height="32"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={name === "arrow" ? 3.5 : 2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {glyphs[name]}
    </svg>
  )
}
