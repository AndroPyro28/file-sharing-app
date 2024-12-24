// messages-cli.ts
import users from '../controller/user'
import { hc } from 'hono/client'

const usersClient = hc<typeof users>('/users')
