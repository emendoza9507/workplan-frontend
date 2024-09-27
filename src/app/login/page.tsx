"use client"
import AppGuestLayout from "@/components/AppGuestLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactElement, useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";

export default function Login() {    
    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit(async data => {

    })

    return (
        <div className="h-screen flex items-center justify-center">
            <form onSubmit={onSubmit} className="h-fit flex flex-col gap-2">
                <p>Bienvenido..</p>
                <Label>Usuario</Label>
                <Input {...register('username')} />

                <Label>Clave</Label>
                <Input type="password" {...register('password')} />

                <Button className="mt-4">
                    Entrar
                </Button>
            </form>
        </div>
    )
}