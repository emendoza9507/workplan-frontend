
"use client"
import { Bell, User, Calendar, MessageCircle, Cog, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";


function UserMenu() {
    const { user } = useCurrentUser();
    const { logout } = useLogout();
    const router = useRouter();

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild><User className="cursor-pointer" /></DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={19}>
                <DropdownMenuLabel>{user?.name} {user?.lastname}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="cursor-pointer hover:font-medium" onClick={() => router.push('/profile')}>
                    <Cog size={20} className="mr-2"/> Perfil
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:font-medium" onClick={logout}>
                    <LogOut size={20} className="mr-2"/> Salir
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function Navbar() {
    return (
        <div className="flex justify-between mb-4 border-b py-3">
            <Link href="/">
                <h1 className="text-4xl font-bold flex items-center"><Calendar className="text-red-700" size={38} /><span className="text-blue-900">WPlan</span></h1>
            </Link>


            <div className="flex gap-4 items-center">
                <MessageCircle />
                <Bell />
                <UserMenu />
            </div>
        </div>
    )
}