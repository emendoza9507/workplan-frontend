import { clsx, type ClassValue } from "clsx"
import Cookies from "js-cookie"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAuthorizationHeader() {
  const currentUser = Cookies.get('currentUser');

  return {
    Authorization: `Bearer ${JSON.parse(currentUser || "")?.access_token || ""}`
  }
}