import { Model } from "./model";

export interface Film extends Model {
  film_id: number
  title: string
  description: string
  release_year: string
  language_id: number
  original_language_id: number
  rental_duration: number
  rental_rate: number
  length: number
  replacement_cost: number
  rating: string
  special_features: string
}
