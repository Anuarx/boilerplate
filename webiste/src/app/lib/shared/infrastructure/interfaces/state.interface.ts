export interface State<T> {
    isLoading: boolean
    data: T
    error?: Error | any | null
    [key: string]: any
  }
  