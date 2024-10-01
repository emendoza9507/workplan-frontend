import { User } from "@/types/user"
import { useContext, useEffect, useState } from "react"
import { UserCard } from "./UserCard"
import { userService } from "@/services"
import Link from "next/link"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"
import { getConnectedUsers } from "../utils/getConnectedUsers"
import { ChatContext } from "../ChatContext"

export function UsersAll() {
    const { socket } = useContext(ChatContext)
    const { user } = useCurrentUser()
    const [users, setUsers] = useState<User[]>([])
    const [onlineUsers, setOnlineUsers] = useState<User[]>([])

    useEffect(() => {
        getConnectedUsers(socket, setOnlineUsers)
    }, [])

    useEffect(() => {
        if(user) {
            userService.getAll().then((users: User[]) => setUsers(users.filter(u => u.id !== user?.id)))
        }
    }, [user])

    const isOnline = (user: User) => {
        return !!onlineUsers.find(u => u.id === user.id)
    }

    return users.map(user => (
        <Link href={"/channel/"+user.id} key={user.id}>
            <UserCard online={isOnline(user)} user={user}/>
        </Link>
    ))
}