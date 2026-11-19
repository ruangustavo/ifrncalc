export type Device = "mobile" | "tablet" | "desktop"

export function deviceFromUserAgent(userAgent: string): Device {
  if (/iPad|Tablet/i.test(userAgent)) {
    return "tablet"
  }

  if (/Mobi|Android/i.test(userAgent)) {
    return "mobile"
  }

  return "desktop"
}
