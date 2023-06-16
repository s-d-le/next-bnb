"use client";

import { Reservation } from "@prisma/client";
import { SafeListing, SafeUser } from "@/app/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection", // Add this key. Without it react-calendar will display a warning
};

interface ListingClientProps {
  reservations?: Reservation[];
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
    price: 0,
  },
  reservations = [],
  currentUser = null,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  //Iterate through reservations and get all reserved dates to show as disabled on calendar
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then(() => {
        toast.success("Reservation created successfully!");
        // router.push("/trips");
        router.refresh();
      });
  }, [currentUser, dateRange, totalPrice, loginModal, router]);

  //Calculate total price based on date range and listing price on every calendar change
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      //ignore hours and only count days
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

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
