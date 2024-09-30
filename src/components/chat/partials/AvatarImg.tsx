import { User } from "@/types/user";

type AvatarProps  =  { user: User }
export const AvatarImg = ({user}: AvatarProps) => {
    const alt = user.name.charAt(0) + user.lastname.charAt(0);

    return (
        <img src={user.avatarImage ?? ""} alt={alt} className="w-10 h-11 rounded-full border" />
    )
}