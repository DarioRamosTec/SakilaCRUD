import { Pagination } from "./pagination";

export interface ModelsSignal<T> {
  models: T[],
  meta?: Pagination,
  setTable?: boolean,
  loading: boolean,
  error?: boolean
}
