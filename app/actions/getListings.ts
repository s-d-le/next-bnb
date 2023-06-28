/**
 * Get all listings for landing page and current users properties
 */
import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {userId} = params;

    let query: any = {};

    //If userId is provided, then filter by userId
    if(userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    //convert createdAt to ISO string
    const safeListing = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
