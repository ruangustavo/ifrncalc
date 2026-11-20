export const FEEDBACK_DISMISSED_COOKIE = "ifrn-calc-feedback-dismissed"

const ONE_YEAR = 60 * 60 * 24 * 365

export function dismissFeedbackBanner() {
  document.cookie = `${FEEDBACK_DISMISSED_COOKIE}=1; path=/; max-age=${ONE_YEAR}; samesite=lax`
}
