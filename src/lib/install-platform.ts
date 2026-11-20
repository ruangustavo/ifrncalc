export type InstallPlatform =
  | { kind: "ios" }
  | { kind: "android" }
  | { kind: "in-app"; os: "ios" | "android" }
  | { kind: "unsupported" }

const IN_APP_BROWSER =
  /Instagram|FBAN|FBAV|FB_IAB|Line\/|Twitter|TikTok|musical_ly|Bytedance|LinkedInApp|Snapchat/i

export function installPlatformFromUserAgent(
  userAgent: string,
): InstallPlatform {
  if (/iPhone|iPod/.test(userAgent)) {
    return IN_APP_BROWSER.test(userAgent)
      ? { kind: "in-app", os: "ios" }
      : { kind: "ios" }
  }

  if (/Android/.test(userAgent)) {
    return IN_APP_BROWSER.test(userAgent) || /; wv\)/.test(userAgent)
      ? { kind: "in-app", os: "android" }
      : { kind: "android" }
  }

  return { kind: "unsupported" }
}
