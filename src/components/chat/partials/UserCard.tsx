import { useSocket } from "@/hooks/socket/useSocket"
import { User } from "@/types/user"
import { User2 } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { MessageType } from "./Message"
import { usePathname } from "next/navigation"
import { AuthContext } from "@/contexts/AuthContext"
import { ChatContext } from "../ChatContext"

type UserCardType = {
    user: User
    onClick?: (user: User) => void
}
export function UserCard({ user, onClick }: UserCardType) {
    const pathname = usePathname()
    const [count, setCount] = useState(0);
    const [hasSendMessages, setHasSendMessages] = useState(false);
    const { socket } = useContext(ChatContext)
    const currentUser = useContext(AuthContext).user

    useEffect(() => {
        socket.on(`channel:user:${currentUser.id}`, (message: MessageType) => {
            if(user.id === message.from.id) {
                setHasSendMessages(true)                   
            
                setCount((prevState) => {
                    return prevState + 1
                });
            }
        })
    }, [count])

    const isUserChannel = pathname === '/channel/'+user.id
    

    return (
        <div onClick={() => onClick && onClick(user)} className="flex items-center py-2 my-1 gap-1 cursor-pointer">
            <div className="profile relative flex items-center justify-center rounded-full border w-[46px] h-[46px]">
                <User2 size={42} strokeWidth={1} />
                {(!isUserChannel && count > 0) && hasSendMessages && <div className='absolute inline-flex items-center justify-center py-0.5 px-1.5 text-xs font-normal text-white bg-red-500 border-2 border-white rounded-full -bottom-1 -right-1'>{count}</div>}
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                    {user.name} {user.lastname}
                </p>
                <p className="text-muted-foreground">
                    {user.email}
                </p>
            </div>
        </div>
    )
}