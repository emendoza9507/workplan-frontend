import { env } from "process";

const URL = `${env.BACKEND_URL}/api/users`;

export async function getUsers() {
    const data = await fetch(`${URL}`, {
        cache: "no-cache"
    });

    return await data.json();
}

export async function createUser(userData: object) {
    await fetch(`${URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store',
        body: JSON.stringify(userData),
    })
}