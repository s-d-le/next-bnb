"use client";

/**
 * Show an empty page while there are no results
 */

import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results found",
  subTitle = "Try adjusting your search or filter to find what you're looking for.",
  showReset = false,
}) => {
  const router = useRouter();
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Heading center title={title} subtitle={subTitle} />
      <div className="mt-4 w-48">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
