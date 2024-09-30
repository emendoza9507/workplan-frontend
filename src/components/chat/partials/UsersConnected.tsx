import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../ChatContext";
import { User } from "@/types/user";
import { User2 } from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";
import { UserCard } from "./UserCard";
import Link from "next/link";

export default function UsersConnected() {
    const { user } = useContext(AuthContext);
    const { socket } = useContext(ChatContext);
    const [users, setUsers] = useState<User[]>([]);

    const getConnectedUsers = () => {
        socket?.emitWithAck('user.list', socket.id).then((usersList: User[]) => {
            setUsers(usersList.filter(u => u.id !== user?.id))
        })
    }

    useEffect(() => {
        socket?.on('user.connect', (newUser) => {
            if (newUser.id !== user?.id) {
                setUsers((pregState) => {
                    return [...pregState, newUser];
                }) 
            }
        })

        socket?.on('user.disconnect', (id) => {
            setUsers(users.filter((user) => user.socketId !== id))
        })

        getConnectedUsers()

        return () => {
            socket.removeAllListeners()
        }
    }, []);


    return users.map((user: User, i) => (
        <Link href={"/channel/"+user.id} key={`${user.id}${i}`}>
            <UserCard user={user}/>
        </Link>
    ))
}