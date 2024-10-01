import { User } from "@/types/user"
import { Socket } from "socket.io-client"

export const getConnectedUsers = (socket: Socket, callBack: (users: User[]) => void) => {
    socket.emitWithAck('user.list', socket.id).then((usersList: User[]) => {
        callBack(usersList)
    })
}