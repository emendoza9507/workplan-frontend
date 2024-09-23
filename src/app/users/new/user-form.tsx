"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { createUser } from "../users.api";
import { useRouter, } from "next/navigation";

export function UserForm() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(async data => {
        await createUser(data);

        router.push('/')
    })

    return (
        <form onSubmit={onSubmit}>
            <Label>
                Name
            </Label>
            <Input { ...register('name') }/>

            <Label>
                Lastname
            </Label>
            <Input { ...register('lastname') }/>

            <Label>
                Username
            </Label>
            <Input { ...register('username') }/>

            <Label>
                Email
            </Label>
            <Input type="email" { ...register('email') }/>

            <Label>
                Password
            </Label>
            <Input type="password" { ...register('password') }/>

            <Button className="mt-4">
                Create User
            </Button>
        </form>
    )
}