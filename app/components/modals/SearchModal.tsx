"use client";

import { useState } from "react";
import { Range } from "react-date-range";

import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";

import useSearchModal from "@/app/hooks/useSearchModal";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel="Search"
      onClose={searchModal.onClose}
    />
  );
};

export default SearchModal;
