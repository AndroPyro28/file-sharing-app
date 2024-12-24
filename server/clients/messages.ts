// messages-cli.ts
import messages from '../controller/message'
import { hc } from 'hono/client'

const authorsClient = hc<typeof messages>('/messages')