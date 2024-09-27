
import { Bell, User, Calendar, MessageCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";


function UserMenu() {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild><User className="cursor-pointer" /></DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={19}>
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Salir</DropdownMenuItem>
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