import { Hono } from 'hono'

const usersRoute = new Hono()

usersRoute.get('/', (ctx) => {
    return ctx.json({
        user: 1
    })
})

export default usersRoute