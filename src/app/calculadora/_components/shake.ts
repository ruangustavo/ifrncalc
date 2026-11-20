const SHAKE_FRAMES: Keyframe[] = [
  { transform: "translateX(0)" },
  { transform: "translateX(-6px)" },
  { transform: "translateX(5px)" },
  { transform: "translateX(-4px)" },
  { transform: "translateX(3px)" },
  { transform: "translateX(-1px)" },
  { transform: "translateX(0)" },
]

export function shake(element: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

  element.animate(SHAKE_FRAMES, { duration: 360, easing: "linear" })
}
