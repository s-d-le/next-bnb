"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser, SafeReservation } from "@/app/types";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { Range } from "react-date-range";

const dateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
};
interface ListingCardProps {
  data: SafeListing; //listing data
  reservation?: SafeReservation; //reservation data
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue); //turn country code into country name
  const [totalNights, setTotalNights] = useState(0); //total days of reservation

  useEffect(() => {
    if (reservation) {
      dateRange.startDate = new Date(reservation.startDate);
      dateRange.endDate = new Date(reservation.endDate);

      setTotalNights(
        differenceInCalendarDays(dateRange.endDate, dateRange.startDate)
      );
    }
  }, [reservation]);

  //cancel reservation
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); //stop event bubbling
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [data.price, reservation]);

  //If not reserved, show category(render)
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`; //format date
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)} //redirect to listing page
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt="Listing"
            className="h-full w-full object-cover transition group-hover:scale-110"
          />
          <div className="absolute right-3 top-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-bold">$ {price}</div>
          {/* If reserved, show total price instead of pernight */}
          {!reservation ? (
            <div className="font-light">night</div>
          ) : (
            <div className="text-xs font-light text-neutral-500">
              /for {totalNights} nights
            </div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
