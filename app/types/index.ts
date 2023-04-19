// CurrentUser expects type User from prisma client but we cleaned it up as string inside getCurrentUser.ts
// This will replace the type User with SafeUser custom props

import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
