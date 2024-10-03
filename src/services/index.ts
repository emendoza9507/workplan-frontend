
import { env } from "process";
import { AuthSerice } from "./auth.service";
import { UserService } from "./user.service";
import ChatService from "./chat.service";

const url: string = env.NEXT_PUBLIC_BACKEND_URL ?? 'http://10.105.231.168:4000';

export const authService = new AuthSerice(url);
export const userService = new UserService(url);
export const chatService = new ChatService(url)