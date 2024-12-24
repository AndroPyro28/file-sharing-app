import { Hono } from 'hono'

const users = new Hono()
.get('/', (ctx) => {
    return ctx.json({
        user: 1
    })
})

export default users