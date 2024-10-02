"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/auth/useLogin";
import { useSignUp } from "@/hooks/auth/useSignUp";
import { authService } from "@/services";
import { User } from "@/types/user";
import { Loader, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const { login } = useLogin()
    const { signUp } = useSignUp()
    const router = useRouter()

    const onSubmit = handleSubmit(async data => {
        try {
            setLoading(true);
            const { username, password } = data

            const user = await signUp(data as User)

            await login(user.username, password)

            // await login(username, password)

            router.push('/');
        } catch (err) {
            console.log(authService)
            
            setLoading(false);
        }
    })

    return (
        <div className="h-screen flex items-center justify-center">
            <form onSubmit={onSubmit} className="h-fit flex w-[400px] flex-col gap-2">
                <h2 className="text-xl font-medium mb-4">Registrate ahora...</h2>
                <Label>Nombre</Label>
                <Input autoComplete="current-name" {...register('name')} placeholder="Nombre completo" />

                <Label>Apellidos</Label>
                <Input autoComplete="current-lastname" {...register('lastname')} placeholder="Apellidos" />

                <Label>Correo</Label>
                <Input autoComplete="current-email" {...register('email')} placeholder="Correo personal" />

                <Label>Usuario</Label>
                <Input autoComplete="current-user" {...register('username')} placeholder="Nombre de usuario" />

                <Label>Clave</Label>
                <Input autoComplete="current-password" type="password" {...register('password')} placeholder="Credenciales" />

                <Button disabled={loading} className="mt-4 flex gap-2">
                    {loading ? <Loader/> : <UserPlus/> }
                    {loading ? " Registrando... " : "Registrar"}
                </Button>
            </form>
        </div>
    )
}