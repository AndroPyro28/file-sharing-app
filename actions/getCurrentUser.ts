import prisma from "@/lib/prisma";
import { auth } from "../auth";
export async function getSession() {
  return await auth()
}

export type GetCurrentUserType = Awaited<ReturnType<typeof getCurrentUser>>;
export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session || !session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.users.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        profile: {
          include: {
          },
        },
      },
    });

    if (!currentUser) {
      return null;
    }

    const { hashedPassword, ...props } = currentUser;

    return {
      ...props,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}