import { client } from "@/lib/hono";
import messagesRoute from "@/server/controller/message";
import { ExtractResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetMessages = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
        const response = await client.messages.$get()
        const data = await response.json()
        return data
    }
})