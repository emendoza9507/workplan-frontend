import { getAuthorizationHeader } from "@/lib/utils"
import { User } from "@/types/user"

export class AuthSerice {
    public constructor(private url: string) {

    }

    login = (username: string, password: string) => {
        return fetch(`${this.url}/api/auth/login`, {
            headers:  {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({username, password})
        }).then(res => res.json())
        .then(res => {
            const { access_token, ...rest } = res

            if(!access_token) {
                return undefined;
            }

            return {
                access_token,
                ...rest                
            }
        })
    }

    getMe = (userId: string) => {
        return fetch(`${this.url}/api/users/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthorizationHeader()
            },
        })
        .then(res => res.json());
    }

    updateProfile(userId: string, data: User) {
        return fetch(`${this.url}/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthorizationHeader()
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
    }

    uploadProfileImage = (userId: string, newProfileImage: File) => {
        const formData = new FormData();
        formData.append('file', newProfileImage);

        return fetch(`${this.url}/api/users/${userId}/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthorizationHeader()
            },
            body: formData
        }).then(res => res.json())
        .then(res => {
            return {
                newProfileImage: res.data.url
            }
        })
    }
}