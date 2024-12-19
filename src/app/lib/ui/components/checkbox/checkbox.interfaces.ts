import { MatCheckboxChange } from "@angular/material/checkbox"

export interface CheckboxInput {
  disabled: boolean
  checked: boolean
  onChange: (event: MatCheckboxChange) => void
  label: string
  dataTestId?: string
}
