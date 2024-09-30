import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useCurrentUser } from "../auth/useCurrentUser";
import Cookies from "js-cookie";

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket>();
    const currentUser = Cookies.get("currentUser");
    const user = currentUser ? JSON.parse(currentUser) : undefined


    return { socket: io("http://10.0.0.5:4000", { auth: { token: user.access_token } }) }
}