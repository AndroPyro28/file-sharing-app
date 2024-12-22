
import type { NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseServerIo } from "@/types";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
 
  if (req.method === "GET") {
    setTimeout(() => {
      console.log('socket emitted')
      res.socket?.server?.io.emit("hello", 1);
    }, 2000)
    return res.status(200).json({ message: "hello1" });
  } else {
    // Handle any other HTTP method
    return res.status(405).json({ message: "Invalid HTTP method!" });
  }
}