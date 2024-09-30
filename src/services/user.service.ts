import { getAuthorizationHeader } from "@/lib/utils"

export class UserService {
    constructor( private url: string ) {}

    getAll = () => {
        return fetch(`${this.url}/api/users`, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthorizationHeader()
            }
        }).then(res => res.json());
    }

    findOne = (id: string) => {
        return fetch(`${this.url}/api/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthorizationHeader()
            }
        }).then(res => res.json());
    }
}