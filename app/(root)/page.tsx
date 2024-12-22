import getCurrentUser from "@/actions/getCurrentUser";
import SignIn from "./components/signin";
import { redirect } from "next/navigation";
import { Navbar } from "./components/navbar";
import { elysia } from "@/elysia/client";
export default async function Home() {
  const currentUser = await getCurrentUser()
  const { data, error } = await elysia.api.message.index.get()
  if(currentUser) {
    return redirect(`/authorized`);
  }
  return (
    <div className="overflow-hidden">
      <video src="bg3.mp4" autoPlay={true} muted loop={true} className="absolute w-auto min-w-full min-h-full z-1"></video>
      {data}
      <Navbar />
    </div>
  );
}
