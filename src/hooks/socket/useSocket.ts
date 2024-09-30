import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useCurrentUser } from "../auth/useCurrentUser";
import Cookies from "js-cookie";

const socket = io("http://10.105.231.168:4000")

export const useSocket = () => {
    return { socket }
}