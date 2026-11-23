"use client"

import { motion, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { siteConfig } from "@/config/site"

import { DecodeText } from "./decode-text"
import { GithubMark } from "./github-mark"

const REVEAL_DELAY_MS = 250
const SNAP = [0.23, 1, 0.32, 1] as const
const LINE = "Feito por um ex-aluno, com código aberto."
const CALL = "Deixa uma estrela no GitHub"

const CALL_CLASS =
  "font-medium text-primary underline-offset-4 group-hover:underline group-focus-visible:underline"

export function GithubSignature() {
  const ref = useRef<HTMLAnchorElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const calm = useReducedMotion() === true
  const [starred, setStarred] = useState(false)
  const [armed, setArmed] = useState(false)
  const shown = calm || armed

  useEffect(() => {
    if (!inView || calm) {
      return
    }

    const timeout = window.setTimeout(() => setArmed(true), REVEAL_DELAY_MS)

    return () => window.clearTimeout(timeout)
  }, [inView, calm])

  return (
    <a
      ref={ref}
      href={siteConfig.links.github}
      target="_blank"
      rel="noreferrer"
      onClick={() => setStarred(true)}
      className="group mt-3 flex flex-col items-center gap-2 rounded-2xl py-3 text-center text-sm text-muted-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <motion.span
        initial={calm ? false : { opacity: 0, scale: 0.85 }}
        animate={shown ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.25, ease: SNAP }}
      >
        <GithubMark className="size-5 text-foreground" />
      </motion.span>
      <p
        className={`text-balance transition-opacity duration-150 ease-out ${shown ? "opacity-100" : "opacity-0"}`}
      >
        {starred ? (
          <>
            {LINE}{" "}
            <span className="font-medium text-foreground">
              Valeu pela estrela!
            </span>
          </>
        ) : (
          <DecodeText
            segments={[{ text: LINE }, { text: CALL, className: CALL_CLASS }]}
            running={armed && !calm}
          />
        )}
      </p>
    </a>
  )
}
