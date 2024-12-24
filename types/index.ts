import { NextApiResponse } from "next";
import { Server as NetServer, Socket } from "net";
import {Server as SocketIOServer} from 'socket.io'
import { ClientResponse,ClientRequest } from "hono/client";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
      server: NetServer & {
          io: SocketIOServer
      }
  }
}

export type ExtractResponse<T> = T extends ClientResponse<infer R, any, any> ? R : never;
export type ExtractRequest<T> = T extends ClientRequest<infer R> ? R : never;
