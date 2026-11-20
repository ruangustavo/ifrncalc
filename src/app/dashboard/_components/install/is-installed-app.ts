export const INSTALLED_APP_QUERY =
  "(display-mode: standalone), (display-mode: fullscreen)"

export function isInstalledApp(): boolean {
  return (
    matchMedia(INSTALLED_APP_QUERY).matches ||
    ("standalone" in navigator && navigator.standalone === true)
  )
}
