/**
 * Will be called by useFavorite hook
 */
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId: string;
}

async function updateUserFavoriteListing(currentUser: any, listingId: string) {
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listingId");
  }

  if (!favoriteIds.includes(listingId)) {
    favoriteIds.push(listingId);
  } else {
    favoriteIds = favoriteIds.filter((id) => id !== listingId);
  }

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return user;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;
  const user = await updateUserFavoriteListing(currentUser, listingId);

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;
  const user = await updateUserFavoriteListing(currentUser, listingId);

  return NextResponse.json(user);
}
