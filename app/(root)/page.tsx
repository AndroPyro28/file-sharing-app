"use client"
import getCurrentUser from "@/actions/getCurrentUser";
import SignIn from "./components/signin";
import { redirect } from "next/navigation";
import { Navbar } from "./components/navbar";
import { elysia } from "@/elysia/client";
import {GetMessageType, GetMessageByIdType} from "@/elysia/services/message"
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import axios from "axios";
import { useSocket } from "@/components/providers/SocketProvider";
import { useEffect } from "react";
import { useSampleSocket } from "@/hooks/use-sample-socket";

export default function Home() {
  // const currentUser = await getCurrentUser()
  // const message = await elysia.api.message.index.get() as { data: GetMessageType, error:any, status:number}

  useSampleSocket({chatKey:"hello", queryKey: ["hello"]})

  const message = useQueryProcessor<GetMessageType>({
    url: `/comments`,
    key: ['message'],
  })


  const data = message.data
  if(message.isError && axios.isAxiosError(message.error)) {
    console.log(message.error?.response?.data)
  }
  // if(currentUser) {
  //   return redirect(`/authorized`);
  // }
  return (
    <div className="overflow-hidden">
      <video src="bg3.mp4" autoPlay={true} muted loop={true} className="absolute w-auto min-w-full min-h-full z-1"></video>
      <Navbar />
    </div>
  );
}
