import { User } from "@/types/user"
import { User2 } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AuthContext } from "@/contexts/AuthContext"
import { ChatContext } from "../ChatContext"
import { cn } from "@/lib/utils"
import { useLocalStorage } from "@/hooks/useLocalStorage"

type MessageType = {
    id: string
    chatId: string
    createdAt: string
    sender: User
    text: string
}

type UserCardType = {
    user: User
    online?: boolean
    onClick?: (user: User) => void
}
export function UserCard({ user, online, onClick }: UserCardType) {
    const pathname = usePathname()
    const [count, setCount] = useLocalStorage(`notification:user:${user.id}`, 0);
    const [hasSendMessages, setHasSendMessages] = useState(+count > 0);
    const { socket } = useContext(ChatContext)
    const currentUser = useContext(AuthContext).user

    const resiveMessage = (message: MessageType) => {
        if(message.sender.id === user.id) {
            setCount((prevCount: number) => prevCount + 1)
        }
    }

    useEffect(() => { 
        socket.on('chat:resive:notification', resiveMessage)

        return () => {
            socket.removeListener('chat:resive:notification', resiveMessage)
        }
    }, [])

    const isUserChannel = pathname === '/channel/'+user.id
    

    return (
        <div onClick={() => onClick && onClick(user)} className="flex items-center py-2 my-1 gap-1 cursor-pointer">
            <div className={cn([
                "profile relative flex items-center justify-center rounded-full border w-[46px] h-[46px]",
                online ? "border-green-700 border-2" : ""
            ])}>
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