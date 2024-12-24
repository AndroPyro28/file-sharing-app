import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { authHandler, verifyAuth, getAuthUser } from "@hono/auth-js";
import prisma from "@/lib/prisma";
const messagesRoute = new Hono();

messagesRoute.get("/", verifyAuth(), async (ctx) => {
  // fix prisma
  const users = await prisma.user.findMany();

  return ctx.json(
    {
      count: 2,
      users: users.length,
    },
    {
      status: 200,
    }
  );
});

messagesRoute.post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string().min(1, "required"),
    })
  ),
  (ctx) => {
    return ctx.json(
      {
        count: 1,
      },
      {
        status: 200,
      }
    );
  }
);

export default messagesRoute;
