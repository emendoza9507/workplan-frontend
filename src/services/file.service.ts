import { getAuthorizationHeader } from "@/lib/utils"

export class FileService {
    constructor( private url: string ) {}

    async uploadFile(messageId: number, file: File) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            return await fetch(`${this.url}/chats/${messageId}/files`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...getAuthorizationHeader()
                },
                body: formData
            }).then(res => res.json());
        } catch (error) {
            throw error
        }
    }

    async downloadFile(fileId: number) {
        try {
            return fetch(`${this.url}/chats/${fileId}/file`, {
                headers: {
                    ...getAuthorizationHeader(),
                    'Response-Type': 'blob'
                },                
            }).then(res => res.blob());
        } catch (err) {
            throw err
        }
    }
}