/**
 * Deletes a reservation either if the user is the owner of the reservation or the owner of the listing
 */

import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect("/login");
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid reservation");
  }

  const deleteReservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id }, //either the user is the owner of the reservation
        { listing: { userId: currentUser.id } }, //or the user is the owner of the listing
      ],
    },
  });

  return NextResponse.json(deleteReservation);
}
