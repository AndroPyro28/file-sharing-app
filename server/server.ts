import { Hono } from 'hono'
import messagesRoute from './controller/message'
import usersRoute from './controller/user'
import { authHandler, initAuthConfig, verifyAuth, getAuthUser } from '@hono/auth-js'
import Google from '@auth/core/providers/google'
const server = new Hono()

server.use(
    '*',
    initAuthConfig((c) => ({
      secret: process.env.AUTH_SECRET,
      providers: [
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ],
    }))
  )

server.route('/messages', messagesRoute)
server.route('/users', usersRoute)

export default server;