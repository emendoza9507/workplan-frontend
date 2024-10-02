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
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        socket?.on('user.connect', (newUser, ...args) => {
            console.log(args)
            if (newUser.id !== user?.id) {
                setUsers((pregState) => {
                    return [...pregState, newUser];
                }) 
            }
        })

        socket?.on('user.disconnect', (userDisconnected) => {
            // console.log(userDisconnected)
        })

        // getConnectedUsers(socket, (usersList) => {
        //     setUsers(usersList.filter(u => u.id !== user?.id))
        // })

        return () => {
            // socket.removeAllListeners()
        }
    }, []);


    return users.map((user: User, i) => (
        <Link href={"/channel/"+user.id} key={`${user.id}${i}`}>
            <UserCard online user={user}/>
            {user.socketId}
        </Link>
    ))
}