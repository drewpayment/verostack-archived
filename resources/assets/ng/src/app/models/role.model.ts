
export interface IUserRole {
  id: number,
  type: string,
  active: boolean
}

export interface IRole {
  role: number,
  user_id: number,
  created_at: number,
  updated_at: number
}

export enum UserRole {
  user,
  supervisor,
  manager,
  regionalManager,
  humanResources,
  companyAdmin,
  systemAdmin
}
