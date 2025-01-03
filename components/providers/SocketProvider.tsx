"use client";
// import { useRouter } from "next/navigation";
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketIoProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      "http://localhost:3000/",
      { path: "/api/socket/io", addTrailingSlash: false }
    );
    console.log(socketInstance)
    socketInstance.on('connect', () => {
      console.log('connected')
        setIsConnected(true)
    })
    
    socketInstance.on('disconnect', () => {
      console.log('disconnected')
        setIsConnected(false)
    })

    setSocket(socketInstance)

    return () => {
        socketInstance.disconnect()
    }

  }, []);

  return <SocketContext.Provider value={{socket, isConnected}}>{children}</SocketContext.Provider>;
};