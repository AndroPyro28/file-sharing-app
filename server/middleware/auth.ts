import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { createMiddleware } from "hono/factory";
export const authMiddleware = createMiddleware(async (c, next) => {
  const user = c.get("authUser");

  if (user) {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: user.session.user?.email as string,
      },
      include: {
        profile: true,
      },
    }); // Append the user to the request context
    if (!currentUser) {
      c.set("user", user);
    } else {
      const { hashedPassword, ...props } = currentUser;

      c.set("user", {
        ...props,
        createdAt: currentUser.createdAt.toISOString(),
        updatedAt: currentUser.updatedAt.toISOString(),
        emailVerified: currentUser.emailVerified?.toISOString() || null,
      });
    }
  }
  await next();
});

export type TAuthVariables = {
  user: User;
};
