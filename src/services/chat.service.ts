import { getAuthorizationHeader } from "@/lib/utils";
import { User } from "@/types/user";

export default class ChatService {
    constructor (private url: string) {}

    findOrCreate(participants: User[]) {
        return fetch(`${this.url}/api/chats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthorizationHeader()
            },
            body: JSON.stringify({
                participants
            })
        }).then(res => res.json())
    }

    findById(id: number, page: number) {
        return fetch(`${this.url}/api/chats/${id}?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthorizationHeader()
            }
        }).then(res => res.json())
    }
}