// controller/auth.ts


import { Hono } from "hono";
import { z } from "zod";

import { verifyAuth, getAuthUser, AuthUser,  } from "@hono/auth-js";
import { hc, InferRequestType, InferResponseType } from "hono/client";
import { authMiddleware, TAuthVariables, } from "../middleware/auth";

const auth = new Hono<{Variables: TAuthVariables}>()
.use("*", authMiddleware)
.get(
  "/me",
  verifyAuth(),
  authMiddleware,
  async (c) => {
    return c.json(c.get('user'))
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

export const authClient = hc<TAuthRoutes>("/api/auth-user");

export type TGetMe = {
  response: InferResponseType<typeof authClient.me.$get>;
//   request: InferRequestType<typeof authClient.me.$post>["form"];
};

export default auth;
