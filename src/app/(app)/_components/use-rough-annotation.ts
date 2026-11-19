import { type RefObject, useEffect } from "react"
import { annotate } from "rough-notation"

type RoughConfig = Parameters<typeof annotate>[1]

export type RoughMark = Omit<RoughConfig, "color" | "animate">

export function useRoughAnnotation(
  ref: RefObject<HTMLElement | null>,
  mark: RoughMark,
  colorOf: (element: HTMLElement) => string,
  threshold = 1,
) {
  useEffect(() => {
    const element = ref.current

    if (!element) return

    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches

    const annotation = annotate(element, {
      ...mark,
      color: colorOf(element),
      animate: !calm,
    })

    let ready = false
    let visible = false

    const draw = () => {
      if (!ready || !visible) return

      annotation.show()
      observer.disconnect()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        draw()
      },
      { threshold },
    )

    observer.observe(element)

    document.fonts.ready.then(() => {
      ready = true
      draw()
    })

    return () => {
      observer.disconnect()
      annotation.remove()
    }
    // The mark and color are fixed per component, so the annotation is built once.
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}
