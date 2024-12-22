"use client"
import getCurrentUser from "@/actions/getCurrentUser";
import SignIn from "./components/signin";
import { redirect } from "next/navigation";
import { Navbar } from "./components/navbar";
import { elysia } from "@/elysia/client";
import {GetMessageType, GetMessageByIdType} from "@/elysia/services/message"
import { useMutateProcessor, useQueryProcessor } from "@/hooks/useTanstackQuery";
import axios from "axios";
import { useEffect } from "react";
import { socket } from "@/lib/socket";
export default function Home() {



  useEffect(() => {
    onClick()
  }, [])

  // const currentUser = await getCurrentUser()
  // const message = await elysia.api.message.index.get() as { data: GetMessageType, error:any, status:number}
  // const message = useQueryProcessor<GetMessageType>({
  //   url: `/message`,
  //   key: ['message'],
  // })

  const add = useMutateProcessor<any, any>({
    url: '/message',
    key:["message"],
    method: "POST"
  })

  const onClick = () => {
    add.mutate({count: 1}, {
      onSuccess(data, variables, context) {
        socket.emit("hello", data.count)
      },
    })
  }
 
  // if(currentUser) {
  //   return redirect(`/authorized`);
  // }
  return (
    <div className="overflow-hidden">
      <button onClick={onClick}>
    click me
      </button>
      {/* <video src="bg3.mp4" autoPlay={true} muted loop={true} className="absolute w-auto min-w-full min-h-full z-1"></video> */}
   
      <Navbar />
    </div>
  );
}
