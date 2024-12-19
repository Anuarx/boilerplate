import { IColumns } from "../../interfaces/base-table.interface";

export interface BaseTableStorage<T> {
  columns: IColumns<T>,
  displayedColumns: string[]
}

export type TableStyleClass = 'base-table-primary' | 'base-table-secondary'
