import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../ChatContext";
import { User } from "@/types/user";
import { AuthContext } from "@/contexts/AuthContext";
import { UserCard } from "./UserCard";
import Link from "next/link";
import { getConnectedUsers } from "../utils/getConnectedUsers";

export default function UsersConnected() {
    const { user } = useContext(AuthContext);
    const { socket } = useContext(ChatContext);
    const [users, setUsers] = useState<[string, User][]>([]);

    useEffect(() => {
        // socket?.on('user.connect', (newUser) => {
        //     if (newUser[1].id !== user?.id) {
        //         setUsers((pregState) => {
        //             return [...pregState, newUser];
        //         })
        //     }
        // })

        socket?.on('join.global', (users: [string, User][]) => {           
            setUsers(users.filter(([socket, u]) => u.id !== user.id))
        })

        socket?.on('out.global', (users: [string, User][]) => {
            setUsers(users.filter(([socket, u]) => u.id !== user.id))
        })

        // getConnectedUsers(socket, (usersList) => {
        //     setUsers(usersList.filter(([socketId, u]) => u.id !== user?.id))
        // })

        return () => {
            // socket.removeAllListeners()
        }
    }, []);



    return users.map(([socketId, user], i) => (
        <Link href={"/channel/" + user.id} key={`${user.id}${i}`}>
            <UserCard online user={user} />
            {socketId}
        </Link>
    ))
}