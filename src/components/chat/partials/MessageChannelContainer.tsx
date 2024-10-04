import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../ChatContext";
import { AuthContext } from "@/contexts/AuthContext";
import { Message } from "./Message";
import { User } from "@/types/user";
import { chatService } from "@/services";

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
    const messagesContainer = useRef<HTMLDivElement | null>(null);
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)

    const scrollToBootom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const resiveMessage = (message: MessageType) => {
        setMessages((prevState) => {
            return [...prevState, message]
        })
    }

    const loadMessages = () => {
        setLoading(true)
        chatService.findById(+chat.id, page).then(chat => {
            setMessages([...chat.messages, ...messages])
            setLoading(false)
        })
    }

    useEffect(() => {
        socket?.on('chat:resive:message', resiveMessage)

        messagesContainer.current?.addEventListener('scroll', (e) => {
            if (page == 0) {
                if (messagesContainer.current?.scrollTop === 0) {
                    setPage(prevPage => prevPage + 1)
                }
            } else {
                if (messagesContainer.current?.scrollTop && messagesContainer.current?.scrollTop <= 100) {

                    setPage(prevPage => prevPage + 1)
                }
            }
        })

        return () => {
            socket.removeListener('chat:resive:message', resiveMessage)
        }
    }, [])

    useEffect(() => {
        if (chat) {
            setMessages(chat.messages)
        }
    }, [chat])

    useEffect(() => {
        if (page === 0) {
            scrollToBootom()
        }
    }, [messages])

    useEffect(() => {
        if (chat && page > 0) {
            loadMessages()
        }
    }, [page, chat])

    return (
        <div className="messages-box">
            <div className="w-full">

                <div hidden={!loading}>
                    <span>cargando...</span>
                </div>
                <div ref={messagesContainer} className="max-h-[calc(100vh-110px)] overflow-y-auto no-scrollbar">
                    {messages.map((message, i) => {
                        const isSameRemitent = i !== 0 && messages[i - 1].sender.id === message.sender.id

                        return <Message key={`${message.id}-${i}`} message={{ from: message.sender, createdAt: message.createdAt, text: message.text }} currentUser={user} isSameRemitent={isSameRemitent} />
                    })}



                    <div ref={messagesEndRef}></div>
                </div>
            </div>
        </div>
    )
}