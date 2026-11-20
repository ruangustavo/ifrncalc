import assert from "node:assert/strict"
import { test } from "node:test"

import { installPlatformFromUserAgent } from "./install-platform.ts"

const IOS_SAFARI =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1"

const IOS_CHROME =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/138.0.7204.156 Mobile/15E148 Safari/604.1"

const IOS_INSTAGRAM =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 389.0.0.29.87 (iPhone15,3; iOS 18_5; pt_BR; pt; scale=3.00; 1290x2796; 773393395)"

const IOS_FACEBOOK =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/520.0.0.38.101;FBBV/123;FBDV/iPhone15,3;FBMD/iPhone;FBSN/iOS;FBSV/18.5;FBSS/3;FBLC/pt_BR]"

const ANDROID_CHROME =
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36"

const ANDROID_SAMSUNG =
  "Mozilla/5.0 (Linux; Android 14; SAMSUNG SM-A546E) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36"

const ANDROID_INSTAGRAM =
  "Mozilla/5.0 (Linux; Android 14; SM-A546E Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.157 Mobile Safari/537.36 Instagram 389.0.0.42.79 Android"

const DESKTOP_CHROME =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"

test("Safari on iPhone installs from the share menu", () => {
  assert.deepEqual(installPlatformFromUserAgent(IOS_SAFARI), { kind: "ios" })
})

test("Chrome on iPhone also installs from the share menu", () => {
  assert.deepEqual(installPlatformFromUserAgent(IOS_CHROME), { kind: "ios" })
})

test("Instagram's browser on iPhone can't install", () => {
  assert.deepEqual(installPlatformFromUserAgent(IOS_INSTAGRAM), {
    kind: "in-app",
    os: "ios",
  })
})

test("Facebook's browser on iPhone can't install", () => {
  assert.deepEqual(installPlatformFromUserAgent(IOS_FACEBOOK), {
    kind: "in-app",
    os: "ios",
  })
})

test("Chrome on Android installs", () => {
  assert.deepEqual(installPlatformFromUserAgent(ANDROID_CHROME), {
    kind: "android",
  })
})

test("Samsung Internet on Android installs", () => {
  assert.deepEqual(installPlatformFromUserAgent(ANDROID_SAMSUNG), {
    kind: "android",
  })
})

test("a webview inside an Android app can't install", () => {
  assert.deepEqual(installPlatformFromUserAgent(ANDROID_INSTAGRAM), {
    kind: "in-app",
    os: "android",
  })
})

test("desktop isn't offered an install", () => {
  assert.deepEqual(installPlatformFromUserAgent(DESKTOP_CHROME), {
    kind: "unsupported",
  })
})
