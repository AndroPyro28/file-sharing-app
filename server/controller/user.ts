import { ExtractResponse } from '@/types';
import { Hono } from 'hono'
import { hc } from 'hono/client';

const usersRoute = new Hono()

.get('/', (ctx) => {
    return ctx.json({
        user: 1
    })
})

.post('/', (ctx) => {
    return ctx.json({
        success: true
    })
})


export type TUserRoutes = typeof usersRoute;
export const userClient = hc<TUserRoutes>('/api/users')

export type TGetUser = ExtractResponse<Awaited<ReturnType<typeof userClient.index.$get>>>
export type TCreateUser = ExtractResponse<Awaited<ReturnType<typeof userClient.index.$post>>>

export default usersRoute