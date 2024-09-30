import { useSocket } from "@/hooks/socket/useSocket";
import { createContext } from "react";
import { Socket } from "socket.io-client";


type ChatContextType = {
    socket: Socket
}

export const ChatContext = createContext<ChatContextType>({
    socket: null as any
})