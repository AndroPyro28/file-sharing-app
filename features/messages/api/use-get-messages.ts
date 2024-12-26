import { client } from "@/lib/hono";
import messagesRoute from "@/server/controller/message";
import { ExtractResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {InferResponseType} from "hono"

export const useGetMessages = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
        const response = await client.messages.$get()
        const data = await response.json()
        return data
    }
})