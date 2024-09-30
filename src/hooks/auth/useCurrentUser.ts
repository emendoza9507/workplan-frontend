import { authService } from "@/services";
import { User } from "@/types/user"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export const useCurrentUser = (): { user: User | undefined, refetchUser: (userId: string) => void } => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const currentUser = Cookies.get("currentUser");

        if(currentUser) {
            setUser(JSON.parse(currentUser))
        }
    }, []);

    const refetchUser = async (userId: string) => {
        const userInfo = await authService.getMe(userId)
        const newUser = {...user, ...userInfo};
        Cookies.set("currentUser", JSON.stringify(newUser));
        setUser(newUser)
    }

    return {user, refetchUser}
}