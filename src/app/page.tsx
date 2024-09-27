import { Send, User2 } from "lucide-react";
import { getUsers } from "./users/users.api";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React from "react";
import { Navbar } from "@/components/Navbar";

export default async function Home() {

  const users = await getUsers();

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-[300px_1fr] gap-3">
        <div className="w-[300px] border-r">
          <div className="max-h-screen overflow-y-auto no-scrollbar">
            {users.map((user: any) => (
              <div className="flex items-center py-2 gap-1">
                <div className="profile flex items-center justify-center rounded-full border w-[46px] h-[46px]">
                  <User2 size={42} strokeWidth={1} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name} {user.lastname}
                  </p>
                  <p className="text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 grid-rows-[1fr_100px] gap-3">
          <div className="messages-box">
            {[{ length: 20 }].map((m) => (
              <div className="message">
                <header>Eduardo Mendoza Campos</header>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cum delectus omnis sunt accusamus voluptatibus quis incidunt. Nulla laudantium mollitia illo a doloribus quibusdam in nisi modi, ipsum minima officiis?</p>
              </div>
            ))}
          </div>
          <div className="grid w-full gap-2 message-input">
            <Textarea rows={2} placeholder="Que estas pensando?" />
            <Button className="">
              <Send />
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}