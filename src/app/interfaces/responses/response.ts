import { Pagination } from "../pagination";

export default interface Response<T> {
  status: number,
  msg: string,
  data: T,
  meta?: Pagination
}
