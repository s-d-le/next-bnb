"use client";

import { useEffect } from "react";

import EmptyState from "@/app/components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    //Can send analytics here
    console.error(error);
  }, [error]);

  return <EmptyState title="Oops...!" subTitle="Something went wrong!" />;
};

export default ErrorState;
