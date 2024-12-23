"use client"
import { useSocket } from "@/components/providers/SocketProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ChatSocketProps = {
  chatKey: string;
  queryKey: (string | any)[];
};

export const useSampleSocket = ({ queryKey, chatKey }: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(chatKey, (data:any) => {
        console.log("hey")
      }
    );

    return () => {
      socket.off(chatKey);
    };

  }, [chatKey, queryKey]);
};