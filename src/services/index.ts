
import { env } from "process";
import AuthSerice from "./auth.service";
import { UserService } from "./user.service";

const url: string = env.BACKEND_URL ?? 'http://workplan.digitalplace.cu:4000';

export const authService = new AuthSerice(url);
export const userService = new UserService(url);