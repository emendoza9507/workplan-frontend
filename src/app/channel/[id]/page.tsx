"use client"
import { ChatChannel } from "@/components/chat/ChatChanel";
import { AuthContext } from "@/contexts/AuthContext";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { userService } from "@/services";
import { User } from "@/types/user";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
    const { id } = useParams<{ id: string }>();
    const { user, refetchUser } = useCurrentUser();
    const [destinationUser, setDestinationUser] = useState<User>();

    useEffect(() => {
        userService.findOne(id).then(res => setDestinationUser(res))
    }, [])

    if (user) {
        return (
            <AuthContext.Provider value={{ user: user, setUser: refetchUser }}>
                {destinationUser && <ChatChannel destinationUser={destinationUser} />}
            </AuthContext.Provider>
        )
    } else {
        return (
            <span>Iniciando...</span>
        )
    }
}