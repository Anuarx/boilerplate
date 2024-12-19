import { ThemePalette } from "@angular/material/core"

export interface OverlayButtonInput {
  text: string
  icon: string
  isOpen: boolean
  color: ThemePalette
  isLoading: boolean
  menuStyle: boolean
}
