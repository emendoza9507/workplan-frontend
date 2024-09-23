import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getUsers } from "./users/users.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic"

export default async function Home() {

  const users = await getUsers();

  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="text-4xl font-bold">Work Plan Application</h1>

        <Link href={"/users/new"} className={buttonVariants()}>
          Create user
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {
          users.map((user: any) => (
            <Card key={user.id}>
              <CardHeader>
                <CardTitle>
                  {user.name} {user.lastname}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{user.email}</p>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </>
  );
}
