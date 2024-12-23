// import getCurrentUser from "@/actions/getCurrentUser";
// import SignIn from "./components/signin";
// import { redirect } from "next/navigation";
// import { elysia } from "@/elysia/client";
// import {GetMessageType, GetMessageByIdType} from "@/elysia/services/message"
// import { useQueryProcessor } from "@/hooks/useTanstackQuery";
// import axios from "axios";
// import { useSocket } from "@/components/providers/SocketProvider";
// import { useEffect } from "react";
import { useSampleSocket } from "@/hooks/use-sample-socket";
import UploadForm from "./components/upload-form";

export default function Home() {
  // const currentUser = await getCurrentUser()
  // const message = await elysia.api.message.index.get() as { data: GetMessageType, error:any, status:number}

  // useSampleSocket({chatKey:"hello", queryKey: ["hello"]})

  // const message = useQueryProcessor<GetMessageType>({
  //   url: `/comments`,
  //   key: ['message'],
  // })

  // const data = message.data
  // if(message.isError && axios.isAxiosError(message.error)) {
  //   console.log(message.error?.response?.data)
  // }
  // if(currentUser) {
  //   return redirect(`/authorized`);
  // }
  return (
    <div className="overflow-hidden">
      <UploadForm />

      <section className="z-5 fixed text-[##333333] top-[30%] left-[35%] w-[600px] flex flex-col gap-y-5 ">
        <h1 className="font-bold text-4xl text-shadow-custom">We Transfer Clone</h1>
        <p className="font-semibold leading-8 text-shadow-custom">
          Share files and folders effortlessly with We Transfer Clone—a secure,
          fast, and user-friendly platform designed to make file sharing simple.
          No hassles, no limits, just seamless transfers you can trust.
        </p>
      </section>
    </div>
  );
}
