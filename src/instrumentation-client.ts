window.addEventListener("error", (event) => {
  if (process.env.NODE_ENV === "production") {
    import("./lib/discord-webhook").then(({ reportError }) => {
      reportError({
        message: event.error?.message || "Unknown error",
        stack: event.error?.stack,
        source: "client",
        path: window.location.pathname,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }).catch(console.error)
    })
  }
})

window.addEventListener("unhandledrejection", (event) => {
  if (process.env.NODE_ENV === "production") {
    import("./lib/discord-webhook").then(({ reportError }) => {
      const error =
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason))

      reportError({
        message: `Unhandled Promise Rejection: ${error.message}`,
        stack: error.stack,
        source: "client",
        path: window.location.pathname,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }).catch(console.error)
    })
  }
})
