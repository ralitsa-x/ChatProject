import { RoleType } from "./role.model"
import { UserType } from "./user.model"

export type ChannelMembershipType = {
  id?: number,
  user: UserType,
  role: RoleType
}
