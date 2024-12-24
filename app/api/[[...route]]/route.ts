import server from '@/server/server'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { authHandler, initAuthConfig, verifyAuth, getAuthUser } from '@hono/auth-js'
import Google from '@auth/core/providers/google'

export const runtime = 'edge'

const app = new Hono()

app.use(
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
  
  app.use('/api/auth/*', authHandler())
  
  app.use('/api/*', verifyAuth())

   app.route('/api', server)

export const GET = handle(app)
export const POST = handle(app)