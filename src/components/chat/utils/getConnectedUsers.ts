import { User } from "@/types/user"
import { Socket } from "socket.io-client"

export const getConnectedUsers = (socket: Socket, callBack: (users: [string, User][]) => void) => {
    socket.emitWithAck('user.list', socket.id).then((usersList: [string, User][]) => {
        callBack(usersList)
    })
}