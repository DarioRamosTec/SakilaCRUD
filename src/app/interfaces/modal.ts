import { ModalType } from "./modal-type";

export interface Modal<T> {
  mode: ModalType,
  show: boolean,
  data?: T,
  action?: boolean
}
