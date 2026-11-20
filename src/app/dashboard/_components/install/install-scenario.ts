import { toast } from "sonner"

import { useInstallStore, type BeforeInstallPromptEvent } from "./install-store"
import type { InstallContext } from "./use-install-context"

export const INSTALL_SCENARIOS = [
  { id: "ios", label: "iPhone (Safari)" },
  { id: "in-app-ios", label: "iPhone (Instagram)" },
  { id: "android-prompt", label: "Android (Chrome)" },
  { id: "android-manual", label: "Android (sem prompt)" },
  { id: "in-app-android", label: "Android (Instagram)" },
  { id: "installed", label: "App instalado" },
  { id: "unsupported", label: "Desktop" },
] as const

export type InstallScenario = (typeof INSTALL_SCENARIOS)[number]["id"]

const simulatedPrompt: BeforeInstallPromptEvent = Object.assign(
  new Event("beforeinstallprompt"),
  {
    prompt: async () => {
      toast("Diálogo nativo do Chrome (simulado)")
      useInstallStore.getState().setScenario("installed")
    },
    userChoice: Promise.resolve({ outcome: "accepted" as const }),
  },
)

export function contextForScenario(scenario: InstallScenario): InstallContext {
  switch (scenario) {
    case "in-app-ios":
      return { kind: "in-app", os: "ios" }
    case "in-app-android":
      return { kind: "in-app", os: "android" }
    case "android-prompt":
      return { kind: "android-prompt", prompt: simulatedPrompt }
    case "ios":
    case "android-manual":
    case "installed":
    case "unsupported":
      return { kind: scenario }
  }
}
