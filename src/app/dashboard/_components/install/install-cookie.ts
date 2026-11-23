export const INSTALL_BANNER_DISMISSED_COOKIE = "ifrn-calc-install-dismissed"

const ONE_YEAR = 60 * 60 * 24 * 365

export function dismissInstallBanner() {
  document.cookie = `${INSTALL_BANNER_DISMISSED_COOKIE}=1; path=/; max-age=${ONE_YEAR}; samesite=lax`
}
