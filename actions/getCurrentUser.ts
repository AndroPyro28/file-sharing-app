import prisma from "@/lib/prisma";
import { auth } from "../auth";
import { authClient } from "@/server/controller/auth";
import { client } from "@/lib/hono";
// export async function getSession() {
//   return await auth()
// }

export type GetCurrentUserType = Awaited<ReturnType<typeof getCurrentUser>>;
export default async function getCurrentUser() {
  try {
    const res = await client.api.me.$get()

    if(!res.ok) {
      throw new Error("User Not Found")
    }

    const data = await res.json()

    console.log("data", data)
    return data;
    
  } catch (error: any) {
    return null;
  }
}