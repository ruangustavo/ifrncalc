/// <reference types="react/experimental" />

import type { ExoticComponent, ViewTransitionProps } from "react"

declare module "react" {
  export const ViewTransition: ExoticComponent<ViewTransitionProps>
}
