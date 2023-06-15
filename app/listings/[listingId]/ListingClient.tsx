"use client";

import { Reservation } from "@prisma/client";
import { SafeListing, SafeUser } from "@/app/types";
import { useMemo } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

interface ListingClientProps {
  reservation?: Reservation[];
  listing?: SafeListing & {
    user: SafeUser; //getListingById returns a listing with a user
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing = {
    id: "",
    title: "",
    imageSrc: "",
    locationValue: "",
    category: "",
    description: "",
    roomCount: 0,
    guestCount: 0,
    bathroomCount: 0,
    user: null,
  },
  currentUser = null,
}) => {
  //get categories from navbar with icon and label
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing?.category);
  }, [listing?.category]);

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing?.id}
            currentUser={currentUser}
            title={listing?.title}
            imageSrc={listing?.imageSrc}
            locationValue={listing?.locationValue}
          />
          <div className="mt-6 grid grid-cols-7 md:grid-cols-7 md:gap-10">
            <ListingInfo
              user={listing?.user}
              category={category}
              description={listing?.description}
              roomCount={listing?.roomCount}
              guestCount={listing?.guestCount}
              bathroomCount={listing?.bathroomCount}
              locationValue={listing?.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
