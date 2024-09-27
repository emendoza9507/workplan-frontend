import { authService } from "@/services";
import { User } from "@/types/user"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export const useCurrentUser = () => {
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        const currentUser = Cookies.get("currentUser");

        if(currentUser) {
            setUser(JSON.parse(currentUser))
        }
    }, []);

    const refetchUser = async (userId: string) => {
        const userInfo = await authService.getMe(userId)
    }
}