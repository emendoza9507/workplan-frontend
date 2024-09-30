"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/auth/useLogin";
import { authService } from "@/services";
import { Loader, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const { login } = useLogin()
    const router = useRouter()

    const onSubmit = handleSubmit(async data => {
        try {
            setLoading(true);
            const { username, password } = data

            await login(username, password)

            router.push('/');
        } catch (err) {
            console.log(authService)
        }
        setLoading(false);
    })

    return (
        <div className="h-screen flex items-center justify-center">
            <form onSubmit={onSubmit} className="h-fit flex w-[400px] flex-col gap-2">
                <h2 className="text-xl font-medium mb-4">Bienvenido</h2>
                <Label>Usuario</Label>
                <Input autoComplete="current-user" {...register('username')} placeholder="Nombre de usuario" />

                <Label>Clave</Label>
                <Input autoComplete="current-password" type="password" {...register('password')} placeholder="Credenciales" />

                <Button disabled={loading} className="mt-4">
                    {loading ? <Loader/> : <LogIn/> }
                    {loading ? " Entrando... " : "Entrar"}
                </Button>
            </form>
        </div>
    )
}