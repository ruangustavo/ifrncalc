"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"
import Image from "next/image"
import { type PointerEvent, type ReactNode, useRef } from "react"

import { cn } from "@/lib/utils"

import { Tape } from "./tape"
import { useClassPhotoReveal } from "./use-class-photo-reveal"

const FOLLOW = { stiffness: 320, damping: 28, mass: 0.6 }
const EDGE = 12

const WAVE = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='12' height='6' viewBox='0 0 12 6'><path d='M0 3 Q3 0.5 6 3 T12 3' fill='none' stroke='oklch(0.71 0.19 30)' stroke-width='1.6' stroke-linecap='round'/></svg>",
)}")`

export function ClassPhoto({ children }: { children: ReactNode }) {
  const { reveal, triggerProps } = useClassPhotoReveal()
  const calm = useReducedMotion()
  const layerRef = useRef<HTMLSpanElement>(null)
  const cardRef = useRef<HTMLSpanElement>(null)
  const hidden = useRef(true)
  const open = reveal !== "closed"

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, FOLLOW)
  const y = useSpring(pointerY, FOLLOW)

  const lean = useTransform(useVelocity(x), [-1200, 1200], [-12, 12], {
    clamp: true,
  })

  const rotate = useSpring(
    useTransform(lean, (value) => value - 3),
    FOLLOW,
  )

  const place = (clientX: number, clientY: number, jump: boolean) => {
    const container = layerRef.current?.offsetParent

    if (!(container instanceof HTMLElement)) return

    const box = container.getBoundingClientRect()
    const half = (cardRef.current?.offsetWidth ?? 0) / 2

    const fittedX = Math.min(
      Math.max(clientX, EDGE + half),
      window.innerWidth - EDGE - half,
    )

    const nextX = fittedX - box.left
    const nextY = clientY - box.top

    pointerX.set(nextX)
    pointerY.set(nextY)

    if (jump || calm) {
      x.jump(nextX)
      y.jump(nextY)
    }
  }

  const placeAt = (event: PointerEvent<HTMLElement>, jump: boolean) =>
    place(event.clientX, event.clientY, jump)

  return (
    <>
      <span
        {...triggerProps}
        onPointerEnter={(event) => {
          placeAt(event, hidden.current)
          triggerProps.onPointerEnter(event)
        }}
        onPointerMove={(event) => {
          if (calm) return

          if (event.pointerType === "mouse" && reveal === "peek") {
            placeAt(event, false)
          }
        }}
        onPointerDown={(event) => {
          if (reveal === "closed") placeAt(event, hidden.current)
          triggerProps.onPointerDown(event)
        }}
        onFocus={(event) => {
          const line = event.currentTarget.getClientRects()[0]

          if (line && reveal === "closed") {
            place(line.left + line.width / 2, line.top + line.height / 2, true)
          }

          triggerProps.onFocus(event)
        }}
        style={{
          backgroundImage: WAVE,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "0 100%",
          backgroundSize: "12px 6px",
        }}
        className="cursor-default rounded-[2px] [box-decoration-break:clone] pb-1 font-semibold outline-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      >
        {children}
      </span>
      <motion.span
        ref={layerRef}
        aria-hidden={!open}
        style={{ x, y, rotate: calm ? -3 : rotate }}
        className="pointer-events-none absolute top-0 left-0 z-10 block"
      >
        <span
          ref={cardRef}
          data-open={open || undefined}
          onTransitionStart={() => {
            hidden.current = false
          }}
          onTransitionEnd={(event) => {
            if (event.propertyName === "opacity" && !open) hidden.current = true
          }}
          className={cn(
            "absolute bottom-6 left-0 block w-56 -translate-x-1/2 scale-90 bg-[oklch(0.985_0.006_95)] p-2.5 pb-0 opacity-0 shadow-[0_1px_1px_rgb(0_0_0/0.25),0_14px_28px_-10px_rgb(0_0_0/0.5)] sm:w-64",
            "origin-bottom transition-[transform,opacity] duration-150 ease-out",
            "data-open:scale-100 data-open:opacity-100 data-open:duration-200 data-open:ease-(--ease-snap)",
            "motion-reduce:scale-100 motion-reduce:transition-opacity",
          )}
        >
          <Tape className="-top-3.5 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[4deg]" />
          <Image
            src="/story/class-2020.jpg"
            alt="Minha turma de Informática matutino do IFRN Pau dos Ferros, uns trinta alunos posando juntos numa sala de aula"
            width={1080}
            height={810}
            sizes="(min-width: 640px) 236px, 204px"
            className="block aspect-[4/3] w-full object-cover"
          />
          <span className="block py-2 text-center font-hand text-2xl leading-none">
            info matutino, 2020.1
          </span>
        </span>
      </motion.span>
    </>
  )
}
