import { env } from "process";
import AuthSerice from "./auth.service";

const url: string = env.BACKEND_URL ?? 'http://localhost:4000';

export const authService = new AuthSerice(url);