import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useCurrentUser } from "../auth/useCurrentUser";
import Cookies from "js-cookie";
import { User } from "@/types/user";

const socket = io("http://10.105.231.168:4000")
// const socket = io("http://10.0.0.5:4000")

export const useSocket = () => {   
    // let socket = SocketService.getInstance("http://10.105.231.168:4000", user.access_token ?? "").getSocket()

    // const socket = SocketService.getInstance("http://10.105.231.168:4000",)

    return { socket }
}