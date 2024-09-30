export type User = {
    id: string
    name: string
    lastname: string
    email: string
    username: string
    password?: string
    profileImage?: string
    avatarImage?: string
    access_token: string
    socketId?: string
    createdAt: string,
    updatedAt: string
}