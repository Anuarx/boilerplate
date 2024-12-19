import { Signal } from "@angular/core"
import { State } from "./state.interface"

export interface ApiState<T, K = any> {
  state: Signal<State<T>>
  reset(): void
  dispatch(data: K, onSuccess?: (response: T) => void, onFailure?: (err: Error) => void): void
}
