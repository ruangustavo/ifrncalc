interface ErrorReport {
  message: string
  stack?: string
  digest?: string
  source: "client" | "server"
  path?: string
  userAgent?: string
  method?: string
  headers?: Record<string, string>
  context?: {
    routerKind?: string
    routePath?: string
    routeType?: string
    renderSource?: string
  }
  timestamp?: string
  userId?: string
}

export async function reportError(error: ErrorReport): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.warn("Error reporting disabled in development mode:", error)
    return
  }

  const webhookUrl = process.env.DISCORD_ERROR_WEBHOOK_URL

  if (!webhookUrl) {
    console.error("DISCORD_ERROR_WEBHOOK_URL environment variable not set")
    return
  }

  const embed = {
    title: `🚨 ${error.source === "client" ? "Client" : "Server"} Error`,
    color: error.source === "client" ? 0xff6b6b : 0xff4757,
    fields: [
      {
        name: "📋 Message",
        value: error.message.slice(0, 1024),
        inline: false,
      },
      {
        name: "📍 Location",
        value: error.path || "Unknown",
        inline: true,
      },
      {
        name: "🕐 Timestamp",
        value: error.timestamp || new Date().toISOString(),
        inline: true,
      },
    ],
    timestamp: new Date().toISOString(),
  }

  if (error.source === "client" && error.userAgent) {
    embed.fields.push({
      name: "🌐 User Agent",
      value: error.userAgent.slice(0, 1024),
      inline: false,
    })
  }

  if (error.source === "server") {
    if (error.method) {
      embed.fields.push({
        name: "🔗 Method",
        value: error.method,
        inline: true,
      })
    }

    if (error.context?.routeType) {
      embed.fields.push({
        name: "📂 Route Type",
        value: error.context.routeType,
        inline: true,
      })
    }
  }

  if (error.digest) {
    embed.fields.push({
      name: "🔍 Error ID",
      value: error.digest,
      inline: true,
    })
  }

  const payload = {
    embeds: [embed],
  }

  try {
    let response: Response

    if (error.stack) {
      const formData = new FormData()
      formData.append("payload_json", JSON.stringify(payload))

      const stackBlob = new Blob([error.stack], { type: "text/plain" })
      formData.append("files[0]", stackBlob, "stack-trace.txt")

      response = await fetch(webhookUrl, {
        method: "POST",
        body: formData,
      })
    } else {
      response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    }

    if (!response.ok) {
      console.error(
        "Failed to send error to Discord:",
        response.status,
        response.statusText,
      )
    }
  } catch (webhookError) {
    console.error("Error sending to Discord webhook:", webhookError)
  }
}
