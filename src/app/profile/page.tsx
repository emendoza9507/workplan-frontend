"use client"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { EditProfile } from "./profile-edit";
import { User } from "@/types/user";
import { AuthContext } from "@/contexts/AuthContext";

export default function Profile() {
    const { user, refetchUser } = useCurrentUser();

    const handleClickEditProfile = () => {

    }

    if(!user) {
        return <span>Iniciando...</span>
    }

    return (
        <AuthContext.Provider value={{user: user, setUser: refetchUser}}>
            <>
                <section className="py-14">
                    <header className="flex flex-col items-center gap-2">
                        <picture className="border block rounded-full w-[150px] h-[150px] overflow-hidden">
                            {user?.avatarImage ? (<img src={user.avatarImage} />) : <img src={`https://robohash.org/${user?.email}`} />}
                        </picture>
                        <div className="flex flex-col items-center">
                            <p className="font-medium">{user?.name} {user?.lastname}</p>
                            <small className="italic text-muted-foreground">{user?.email}</small>
                            { user && <EditProfile user={user} /> }
                        </div>
                    </header>
                </section>
                <div className="grid grid-cols-[300px_1fr] gap-2">
                    <section>
                        aside
                    </section>
                    <section>Content</section>
                </div>
            </>
        </AuthContext.Provider>
    );
}