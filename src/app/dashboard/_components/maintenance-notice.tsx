"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const EXPIRES_AT = new Date("2026-06-22T00:00:00-03:00").getTime()

function formatRemaining(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86_400)
  const hours = Math.floor((totalSeconds % 86_400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

export function MaintenanceNotice() {
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    function tick() {
      setRemaining(EXPIRES_AT - Date.now())
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  if (remaining === null || remaining <= 0) {
    return null
  }

  return (
    <Alert className="mt-4 border-muted bg-muted text-xs text-muted-foreground">
      <AlertDescription className="text-xs">
        <p>
          fala, galera! me chamo Ruan. o IFRN Calc ficou fora pq o SUAP mexeu
          umas rotas e eu nem vi (saí do IF faz 2 anos e não acompanho mais).
          já botei alertas pra n acontecer dnv. avisem os amiguinhos que voltou,
          tmj :)
        </p>
        <p className="mt-2 font-mono opacity-70">
          essa mensagem some em {formatRemaining(remaining)}
        </p>
      </AlertDescription>
    </Alert>
  )
}
