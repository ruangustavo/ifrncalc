const LIGHT = "oklch(0.96 0.13 92"

export function SunRays() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute top-[-12%] right-[-4%] size-[clamp(36rem,150vw,72rem)] translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(circle,black_6%,transparent_58%)]">
        <div
          className="sun-rays-turn absolute inset-0 blur-[4px]"
          style={{
            backgroundImage: `repeating-conic-gradient(${LIGHT} / 0.85) 0deg 2.5deg, transparent 4.5deg 9deg)`,
          }}
        />
        <div
          className="sun-rays-turn-back absolute inset-0 blur-[8px]"
          style={{
            backgroundImage: `repeating-conic-gradient(${LIGHT} / 0.65) 0deg 3deg, transparent 6deg 13deg)`,
          }}
        />
      </div>
      <div className="sun-rays-glow absolute inset-0 bg-[radial-gradient(circle_at_100%_-12%,oklch(0.96_0.13_92/0.9)_0,oklch(0.93_0.15_88/0.45)_14%,transparent_34%)]" />
    </div>
  )
}
