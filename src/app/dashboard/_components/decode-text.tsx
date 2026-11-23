"use client"

import { useEffect, useState } from "react"

const GLYPHS = "{}[]<>/\\=;:+*#&$_"
const DURATION_MS = 380
const TICK_MS = 24

interface Segment {
  text: string
  className?: string
}

function hash(a: number, b: number) {
  const seed = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453

  return seed - Math.floor(seed)
}

function layoutWords(segments: Segment[]) {
  let offset = 0

  return segments.map((segment) => {
    const words = segment.text.split(" ").map((word) => {
      const start = offset
      offset += word.length + 1

      return { word, start }
    })

    return { className: segment.className, words }
  })
}

export function DecodeText({
  segments,
  running,
}: {
  segments: Segment[]
  running: boolean
}) {
  const [elapsed, setElapsed] = useState<number | null>(null)

  useEffect(() => {
    if (!running) {
      return
    }

    let frame = 0
    const start = performance.now()

    function tick(now: number) {
      const next = now - start
      setElapsed(next)

      if (next < DURATION_MS) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [running])

  const progress = elapsed === null ? 1 : Math.min(1, elapsed / DURATION_MS)
  const tickIndex = elapsed === null ? 0 : Math.floor(elapsed / TICK_MS)
  const full = segments.map((segment) => segment.text).join(" ")

  return (
    <>
      <span className="sr-only">{full}</span>
      <span aria-hidden="true">
        {layoutWords(segments).map((segment, segmentIndex) => (
          <span key={segmentIndex} className={segment.className}>
            {segmentIndex > 0 && " "}
            {segment.words.map(({ word, start }, wordIndex) => (
              <span key={wordIndex}>
                {wordIndex > 0 && " "}
                <span className="whitespace-nowrap">
                  {Array.from(word, (char, charIndex) => {
                    const index = start + charIndex

                    if (progress >= 0.2 + hash(index, 7) * 0.8) {
                      return char
                    }

                    const glyph =
                      GLYPHS[
                        Math.floor(hash(index, tickIndex) * GLYPHS.length) %
                          GLYPHS.length
                      ]

                    return (
                      <span
                        key={charIndex}
                        className="relative inline-block overflow-hidden align-bottom"
                      >
                        <span className="invisible">{char}</span>
                        <span className="absolute inset-0 text-center opacity-70">
                          {glyph}
                        </span>
                      </span>
                    )
                  })}
                </span>
              </span>
            ))}
          </span>
        ))}
      </span>
    </>
  )
}
