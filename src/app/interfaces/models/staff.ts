import { Model } from "./model"

export interface Staff extends Model {
  staff_id: number
  first_name: string
  last_name: string
  address_id: number
  picture: string
  email: string
  store_id: number
  active: number
  username: string
  password: string
}

