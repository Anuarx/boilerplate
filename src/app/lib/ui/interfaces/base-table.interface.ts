import { FormControl } from "@angular/forms"
import { SafeHtml } from "@angular/platform-browser"
import { ICustomSelectModel } from "./custom-select.interface"

export interface IBaseTable<T> {
  storeKey?: string
  dragAndDrop?: boolean
  dataSource: T[]
  columns: IColumns<T>[]
  actions?: ITableActions<T>[]
  paginateOptions?: IPaginationOptions
  disableRowSelector?: (element: T) => boolean
}

export interface ITableActions<T> {
  icon?: string
  svg?: string
  name: string
  element?: T
  testId?: string
  action: (element: T) => void
  hide: (element: T) => boolean
}

export interface IColumns<T> {
  caption: string
  field: IField<T>
  show?: boolean
}

interface IField<T> {
  key: string
  tooltip?: (element: T) => string
  parseElement?: (element: T) => string | number
  render?: (element: T) => SafeHtml
  button?: TableButton<T>,
  toggle?: TableToggle<T>,
  selectAutocomplete?: TableSelectAutocomplete<T>
}

export interface TableButton<T> {
  icon?: string
  svg?: (element: T) => string
  disabled?: (element: T) => boolean
  action: (element: T) => void
}

export interface TableToggle<T> {
  label?: string,
  disabled: (element: T) => boolean
  checked: (element: T) => boolean
  onClick: (element: T) => void
}

export interface TableSelectAutocomplete<T> {
  required?: (element: T) => boolean,
  hintMessage?: (element: T) => string,
  onChange?: (element: T) => void,
  dataTestId: string,
  placeHolder?: string,
  label: string,
  default_value?: string,
  options: ICustomSelectModel[],
  control: FormControl,
}

export interface IPaginationOptions {
  totalCount?: number
  pageSize?: number
  pageSizeOptions?: number[]
  page?: number
}
