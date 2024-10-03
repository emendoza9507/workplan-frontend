import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../ChatContext";
import { User } from "@/types/user";
import { AuthContext } from "@/contexts/AuthContext";
import { UserCard } from "./UserCard";
import Link from "next/link";
import { getConnectedUsers } from "../utils/getConnectedUsers";

export default function UsersConnected() {
    const [users, setUsers] = useState<[string, User][]>([]);

    useEffect(() => {

        return () => {
            // socket.removeAllListeners()
        }
    }, []);



    return {setConnectedUsers: setUsers, UsersConnectedView: () => users.map(([socketId, user], i) => (
        <Link href={"/channel/" + user.id} key={`${user.id}${i}`}>
            <UserCard online user={user} />
        </Link>
    ))}
}