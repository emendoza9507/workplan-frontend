"use client"
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Chat } from "@/components/chat/Chat";
import { AuthContext } from "@/contexts/AuthContext";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";

export default function Home() {
  const { user, refetchUser } = useCurrentUser();

  if (user !== undefined) {
    return (
      <AuthContext.Provider value={{ user: user, setUser: refetchUser }}>
        <Navbar />
        <Chat />
      </AuthContext.Provider>
    );
  } else {
    return (
      <span>Iniciando...</span>
    )
  }


}