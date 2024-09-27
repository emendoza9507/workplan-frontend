

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { UserForm } from "./user-form"

export default function UserNewPage() {
    return (
        <div className="flex justify-center items-center">
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle className="text-xl uppercase">
                        Create User
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <UserForm/>
                </CardContent>
            </Card>
        </div>
    )
}
