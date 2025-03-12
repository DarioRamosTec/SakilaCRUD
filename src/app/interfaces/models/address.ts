import { Model } from "./model";

export interface Address extends Model {
  address_id: number
  address: string
  address2: string
  district: string
  city_id: number
  postal_code: string
  phone: string
  location: string
}
