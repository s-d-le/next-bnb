//Communcation between server component and db
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true, //get user who created the listing
      },
    });

    if (!listing) return null;

    //return listing; //will be warning about date format

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (eror: any) {
    throw new Error(eror);
  }
}
