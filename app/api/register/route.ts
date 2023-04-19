// Using prisma to create a new user. Getting called by RegisterModal.tsx
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, name, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create a new user
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
