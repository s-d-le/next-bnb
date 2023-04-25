"use client";

import { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  // Label based on first or last step
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Submit this home";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  //Dynamic content based on step
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best descrives your place?"
        subtitle="Pick a category"
      />
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
        {categories.map((category) => (
          <div key={category.label} className="col-span-1">
            <CategoryInput
              label={category.label}
              icon={category.icon}
              onClick={() => {}}
              selected={false}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      title="Airbnb your home!"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    ></Modal>
  );
};

export default RentModal;
