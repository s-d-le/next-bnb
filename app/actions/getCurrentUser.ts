// DB communication with prisma
// This is a custom action that is used to get the current user from the session
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    //Session not exists
    if (!session?.user?.email) {
      return null;
    }

    //Prisma.user is genereated by prisma after npx prisma db push
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    //Fix SSR issue with dates
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    //Dont need to do anything here since this is communication with the server, not api
    return null;
  }
}
