import { ExtractResponse } from '@/types';
import { zValidator } from '@hono/zod-validator';
import { Hono, InferRequestType, InferResponseType } from 'hono'
import { hc } from 'hono/client';
import { z } from 'zod';

const usersRoute = new Hono()

.get('/', (ctx) => {
    return ctx.json({
        user: 1
    })
})

.post('/',zValidator(
    "json",
    z.object({
      name: z.string().min(1, "required"),
    })
  ),
  zValidator(
    "param",
    z.object({
      name: z.string().min(1, "required"),
    })
  )
  , (ctx) => {
    return ctx.json({
        success: true
    })
})


export type TUserRoutes = typeof usersRoute;
export const userClient = hc<TUserRoutes>('/api/users')

export type TGetUser = {
    response: InferResponseType<typeof userClient.index.$get>;
    request: InferRequestType<typeof userClient.index.$get>;
}

export type TCreateUser = {
    response: InferResponseType<typeof userClient.index.$post>;
    request: InferRequestType<typeof userClient.index.$post>['json'];
}

export default usersRoute