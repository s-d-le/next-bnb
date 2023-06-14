import prisma from "@/app/libs/prismadb";

export default async function getListings() {
  try {
    const listing = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    //convert createdAt to ISO string
    const safeListing = listing.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
