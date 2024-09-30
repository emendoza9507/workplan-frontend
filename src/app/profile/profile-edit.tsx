"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthContext } from "@/contexts/AuthContext"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"
import { authService } from "@/services"
import { User } from "@/types/user"
import { Edit } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useForm, useFormState } from "react-hook-form"

type EditProfileProps = {
    user: User
}

export function EditProfile({ user }: EditProfileProps) {
    const { name, lastname, email, username } = user
    const { setUser } = useContext(AuthContext)
    const { register, handleSubmit, formState } = useForm({values: { name, lastname, email, username }})
    const [open, setOpen] = useState(false)
    const [saving, setSaving] = useState(false)

    const onSubmit = handleSubmit(async data => {     
        setSaving(true);
        await authService.updateProfile(user.id, data as User);
        setUser(user.id);
        setSaving(false);
        setOpen(false);
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Edit className="mt-2" />
            </DialogTrigger>
            <DialogContent  className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar perfil</DialogTitle>
                    <DialogDescription>
                        Realice cambios en su perfil aquí. Haga clic en guardar cuando haya terminado.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nombre
                        </Label>
                        <Input  {...register('name')} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Apellidos
                        </Label>
                        <Input {...register('lastname')} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Usuario
                        </Label>
                        <Input {...register('username')} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Correo
                        </Label>
                        <Input {...register('email')} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={saving} onClick={onSubmit} type="submit">
                        { saving ? "Guardando..." : "Guardar cambios" }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
