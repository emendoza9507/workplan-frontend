"use client"
import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../ChatContext"
import { AuthContext } from "@/contexts/AuthContext"
import { Message, MessageType } from "./Message"

export default function MessageContainer() {
    const { socket } = useContext(ChatContext);
    const { user } = useContext(AuthContext)
    const [messages, setMessages] = useState<MessageType[]>([]);

    useEffect(() => {
        if (socket) {
            socket.on('message:new', (message: MessageType) => {
                setMessages((pregState) => {
                    return [...pregState, message]
                });
            })
        }
    }, [])

    return (
        <div className="messages-box">
            <div className="w-full">
                {messages.map((message, i) => {
                    const isSameRemitent = i !== 0 && messages[i - 1].from.id === message.from.id

                    return <Message message={message} currentUser={user} isSameRemitent={isSameRemitent} />
                })}
            </div>
        </div>
    )
}