"use client";
import React from "react";
import QueryProvider from "./QueryProvider";
import ToastProvider from "./ToastProvider";
// import { ThemeProvider } from "next-themes";
import { SocketIoProvider } from "./SocketProvider";
import SessionProvider from "./SessionProvider";

const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ToastProvider />
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        storageKey="enrollment-system"
        > */}
        <SocketIoProvider>
          <QueryProvider>
            <SessionProvider>
              {children}
            </SessionProvider>
          </QueryProvider>
        </SocketIoProvider>
      {/* </ThemeProvider> */}
    </>
  );
};

export default Provider;
