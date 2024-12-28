// controller/auth.ts


import { Hono } from "hono";
import { z } from "zod";

import { verifyAuth, getAuthUser, AuthUser,  } from "@hono/auth-js";
import { hc, InferRequestType, InferResponseType } from "hono/client";
import { authMiddleware, TAuthVariables, } from "../middleware/auth";

const auth = new Hono<{Variables: TAuthVariables}>()
.use("*", authMiddleware)
.get(
  "/",
  verifyAuth(),
  authMiddleware,
  async (c) => {
    // console.log("USER", c.get('user'))
    return c.json({hello: 1})
  }
)

// .post(
//   "/me",
//   verifyAuth(),
//   authMiddleware,
//   async (c) => {
//     return c.json(c.get('user'))
//   }
// );

export type TAuthRoutes = typeof auth;

export const authClient = hc<TAuthRoutes>("/auth-user");

// export type TGetMe = {
//   response: InferResponseType<typeof authClient.me.$get>;
// //   request: InferRequestType<typeof authClient.me.$post>["form"];
// };

export default auth;
