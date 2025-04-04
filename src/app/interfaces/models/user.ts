import { Model } from "./model"
import { Role } from "./role"

export default interface User extends Model {
  id: number
  fullName: string | null
  email: string
  roleId: number
  role: Role
}
