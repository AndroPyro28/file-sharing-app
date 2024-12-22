import { Elysia, t } from 'elysia'
import { messageController } from './controllers/message'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import http from "http"
export const elysiaApp = new Elysia({ prefix: '/api' })
.use(messageController)
.onError(({ code, error }) => {
    return new Response(JSON.stringify({ error: error.toString() }), { status: 500 })
})
export type TElysiaApp = typeof elysiaApp

