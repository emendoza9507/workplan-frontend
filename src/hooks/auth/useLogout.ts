import Cookies from "js-cookie";

export const useLogout = () => {
    const logout = () => {
        Cookies.remove('currentUser');
        location.reload()
    }

    return { logout }
}