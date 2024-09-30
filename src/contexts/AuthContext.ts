"use client"
import { User } from "@/types/user";
import { createContext } from "react";

type AuthContextType = {
    user: User
    setUser: (userId: string) => void
}

export const AuthContext = createContext<AuthContextType>({
    user: {} as User,
    setUser: (userId: string ) => null
});