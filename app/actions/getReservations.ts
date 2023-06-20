/**
 * Use this function to get reservations from the database.
 * Returns calender, listing, and user information.
 */
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string; //individual listing
  userId?: string; //user who made the reservation on the listing
  authorId?: string; //user who owns the listing
}

export default async function getReservations(params: IParams) {
  try {
    //Depends on the params we'll querry the database differently
    const { listingId, userId, authorId } = params;

    const query: any = {};

    //get all the reservations for a specific listing
    if (listingId) {
      query.listingId = listingId;
    }

    //get all the reservations for a specific user
    if (userId) {
      query.userId = userId;
    }

    //get all the reservations that other users have made on a specific user's listings
    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(), //convert to ISO string
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
