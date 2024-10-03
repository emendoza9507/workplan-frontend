"use client"
import { useContext, useEffect, useRef, useState } from "react"
import { ChatContext } from "../ChatContext"
import { AuthContext } from "@/contexts/AuthContext"
import { Message, MessageType } from "./Message"

export default function MessageContainer() {
    const { socket } = useContext(ChatContext);
    const { user } = useContext(AuthContext)
    const [messages, setMessages] = useState<MessageType[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    socket.on('message:new', (message: MessageType) => {
        setMessages([...messages, message]);
    })

    const scrollToBootom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }

    useEffect(() => {
        scrollToBootom()
    }, [messages])

    return (
        <div className="messages-box">
            <div className="w-full">
                {messages.map((message, i) => {
                    const isSameRemitent = i !== 0 && messages[i - 1].from.id === message.from.id

                    return <Message key={`${message.from}-${i}`} message={message} currentUser={user} isSameRemitent={isSameRemitent} />
                })}

                <div ref={messagesEndRef}></div>
            </div>
        </div>
    )
}