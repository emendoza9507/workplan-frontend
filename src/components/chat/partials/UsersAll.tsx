import { User } from "@/types/user"
import { useContext, useEffect, useState } from "react"
import { UserCard } from "./UserCard"
import { userService } from "@/services"
import Link from "next/link"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"
import { getConnectedUsers } from "../utils/getConnectedUsers"
import { ChatContext } from "../ChatContext"
import { Search } from "lucide-react"

export function UsersAll() {
    const { socket } = useContext(ChatContext)
    const { user } = useCurrentUser()
    const [users, setUsers] = useState<User[]>([])
    const [filterUsers, setFilterUsers] = useState<User[]>([])
    const [filter, setFilter] = useState('')
    const [onlineUsers, setOnlineUsers] = useState<User[]>([])

    useEffect(() => {
        // getConnectedUsers(socket, setOnlineUsers)

        setFilterUsers(users.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()) ||
            user.lastname.toLocaleLowerCase().includes(filter.toLowerCase()) ||
            user.username.toLocaleLowerCase().includes(filter.toLowerCase())
        ))
    }, [filter])

    useEffect(() => {
        setFilterUsers(users)
    }, [users])

    useEffect(() => {
        userService.getAll().then((users: User[]) => setUsers(users))
    }, [])

    const isOnline = (user: User) => {
        return !!onlineUsers.find(u => u.id === user.id)
    }

    return (
        <>
            <div className="flex gap-1 px-2 py-1 border-b">
                <Search />
                <input className="flex-1" type="text" placeholder="Buscar usuario" onChange={({ target }) => setFilter(target.value)} />
            </div>
            {filterUsers.map(user => (
                <Link href={"/channel/" + user.id} key={user.id}>
                    <UserCard online={isOnline(user)} user={user} />
                </Link>
            ))}
        </>
    )
}