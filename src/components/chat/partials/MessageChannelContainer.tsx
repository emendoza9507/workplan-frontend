import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../ChatContext";
import { AuthContext } from "@/contexts/AuthContext";
import { Message, MessageType } from "./Message";
import { User } from "@/types/user";

type PropsType = {
    destinationUser: User
}

export function MessageChannelContainer({ destinationUser }: PropsType) {
    const { socket } = useContext(ChatContext);
    const { user } = useContext(AuthContext)
    const [messages, setMessages] = useState<MessageType[]>([]);

    socket?.on(`channel:user:${user.id}`, (message: MessageType) => {
        setMessages([...messages, message]);
    })

    socket?.on(`chat:resive:message`, (message: MessageType) => {
        console.log(message)
    })

    return (
        <div className="messages-box">
            <div className="w-full">
                {messages.map((message, i) => {
                    const isSameRemitent = i !== 0 && messages[i - 1].from.id === message.from.id

                    return <Message key={message.from.id + i} message={message} currentUser={user} isSameRemitent={isSameRemitent} />
                })}
            </div>
        </div>
    )
}