import { MatDialogRef } from "@angular/material/dialog"

export interface DialogTitleInput<T> {
  title: string
  dialogRef: MatDialogRef<T>
  icon?: string
}
