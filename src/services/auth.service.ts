import { getAuthorizationHeader } from "@/lib/utils"

export default class AuthSerice {
    public constructor(private url: string) {

    }

    login = (username: string, password: string) => {
        return fetch(`${this.url}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({username, password})
        }).then(res => res.json())
        .then(res => {
            return {
                access_token: res.access_token,                
            }
        })
    }

    getMe = (userId: string) => {
        return fetch(`${this.url}/api/users/${userId}`, {
            headers: getAuthorizationHeader()
        })
        .then(res => res.json());
    }

    uploadProfileImage = (userId: string, newProfileImage: File) => {
        const formData = new FormData();
        formData.append('file', newProfileImage);

        return fetch(`${this.url}/api/users/${userId}/upload`, {
            method: 'POST',
            headers: getAuthorizationHeader(),
            body: formData
        }).then(res => res.json())
        .then(res => {
            return {
                newProfileImage: res.data.url
            }
        })
    }
}