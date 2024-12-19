import { InfoMessageInput } from '../components/info-message/info-message.interfaces';

export interface IConfirmationDialogOptions {
  data: { title: string, message: string, confirmButtonText?: string, cancelButtonText?: string }
  callback: () => void
  onCancel?: () => void
  closeAfterConfirm?: boolean
}

export interface IConfirmationDialogOptionsV2 {
  data: { title?: string, svg?: string, mainMessage: string, subMessage: string, confirmButtonText?: string, cancelButtonText?: string, infoMessage?: InfoMessageInput }
  callback: () => void
  onCancel?: () => void
  width?: string
  closeAfterConfirm?: boolean
}


export interface ISessionExpiresModal {
  data: { title: string, message: string, confirmButtonText?: string, cancelButtonText?: string }
  callback: () => void
  onCancel?: () => void
  closeAfterConfirm?: boolean
}
