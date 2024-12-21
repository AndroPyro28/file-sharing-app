import getCurrentUser from "@/actions/getCurrentUser";
import SignIn from "./components/signin";
import { redirect } from "next/navigation";

export default async function Home() {

  const currentUser = await getCurrentUser()

  if(currentUser) {
    return redirect(`/authorized`);
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <SignIn />
    </div>
  );
}
