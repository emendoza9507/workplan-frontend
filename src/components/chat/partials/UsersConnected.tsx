import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../ChatContext";
import { User } from "@/types/user";
import { AuthContext } from "@/contexts/AuthContext";
import { UserCard } from "./UserCard";
import Link from "next/link";
import { getConnectedUsers } from "../utils/getConnectedUsers";
import { Search } from "lucide-react";

export default function UsersConnected() {
    const [users, setUsers] = useState<[string, User][]>([]);
    const [filterUsers, setFilterUsers] = useState<User[]>([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        setFilterUsers(users.filter(([soketid, user]) => user.name.toLowerCase().includes(filter.toLowerCase()) ||
            user.lastname.toLocaleLowerCase().includes(filter.toLowerCase()) ||
            user.username.toLocaleLowerCase().includes(filter.toLowerCase())
        ).map(([socketId, user]) => user))

        return () => {
            // socket.removeAllListeners()
        }
    }, [filter]);

    useEffect(() => {
        setFilterUsers(users.map(([socketId, user]) => user))
    }, [users])


    return {
        setConnectedUsers: setUsers, UsersConnectedView: () => (
            <>
                <form className="flex gap-1 px-2 py-1 border-b">
                    <Search />
                    <input className="flex-1" type="text" value={filter} placeholder="Buscar usuario" onChange={({ target }) => setFilter(target.value)} />
                </form>
                {filterUsers.map((user, i) => (
                    <Link href={"/channel/" + user.id} key={`${user.id}${i}`}>
                        <UserCard online user={user} />
                    </Link>
                ))}
            </>
        )
    }
}