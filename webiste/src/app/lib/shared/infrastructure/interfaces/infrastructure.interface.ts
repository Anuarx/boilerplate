import { Signal } from "@angular/core";
import { State } from "./state.interface";

export interface ApiModel<K, T = any> {
  readonly stateSignal: Signal<State<K>>
  set isLoading(isLoading: boolean)
  get isLoading(): boolean
  set error(error: Error | any | null)
  get error(): Error | any | null
  set data(data: K)
  get data(): K
  dispatch(data: T, onSuccess?: (response: ApiResponse<T> | any) => void, onFailure?: (err: Error) => void): void
  resetState(): void
}

export interface ApiResponse<T = any> extends ApiPaginatedResponse {
  data?: T
  error?: Error | any | null | string
  message?: string
}

export interface ApiPaginatedResponse {
  totalCount: number
}
