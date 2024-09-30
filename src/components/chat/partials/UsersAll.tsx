import { User } from "@/types/user"
import { useEffect, useState } from "react"
import { UserCard } from "./UserCard"
import { userService } from "@/services"
import Link from "next/link"

export function UsersAll() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        userService.getAll().then(users => setUsers(users))
    }, [])

    return users.map(user => (
        <Link href={"/channel/"+user.id} key={user.id}>
            <UserCard user={user}/>
        </Link>
    ))
}