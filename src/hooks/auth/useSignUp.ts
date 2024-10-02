import { authService } from "@/services"
import { User } from "@/types/user";
import Cookies from "js-cookie";
import { useLogin } from "./useLogin";

export const useSignUp = () => {
    const { login } = useLogin()
    
    const signUp = async (user: User) => {
        const userSignUp = await authService.signUp(user);

        return await login(userSignUp.username, userSignUp.password)
    }

    return { signUp }
}