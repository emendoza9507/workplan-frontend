import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../ChatContext";
import { AuthContext } from "@/contexts/AuthContext";
import { Message } from "./Message";
import { User } from "@/types/user";

type PropsType = {
    chat: {
        id: string
        participants: User[],
        messages: MessageType[]
    }
}

type MessageType = {
    id: string
    chatId: string
    createdAt: string
    sender: User
    text: string
}

export function MessageChannelContainer({ chat }: PropsType) {
    const { socket } = useContext(ChatContext);
    const { user } = useContext(AuthContext)
    const [messages, setMessages] = useState<MessageType[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    socket?.on(`channel:user:${user.id}`, (message: MessageType) => {
        setMessages([...messages, message]);
    })

    const scrollToBootom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }

    useEffect(() => {
        socket?.on(`chat:resive:message`, (message: MessageType) => {
            setMessages((prevState) => {
                return [...prevState, message]
            })
        })
    }, [])

    useEffect(() => {
        if(chat) {
            setMessages(chat.messages)
        }
    }, [chat])

    useEffect(() => {
        scrollToBootom()
    }, [messages])

    return (
        <div className="messages-box">
            <div className="w-full">
                {messages.map((message, i) => {
                    const isSameRemitent = i !== 0 && messages[i - 1].sender.id === message.sender.id

                    return <Message key={message.id} message={{from: message.sender, createdAt: message.createdAt, text: message.text}} currentUser={user} isSameRemitent={isSameRemitent} />
                })}

                <div ref={messagesEndRef}></div>
            </div>
        </div>
    )
}