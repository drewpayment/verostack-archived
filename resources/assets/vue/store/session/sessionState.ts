
export interface User {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    active: boolean,
    createdAt: string,
    updatedAt: string
}

export interface UserState {
    authenticated: boolean,
    user: User
}