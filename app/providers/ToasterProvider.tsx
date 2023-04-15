"use client";

//Third party import that needs to run on SSR so we have to wrap it here then it can run in <ClientOnly />

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return <Toaster />;
};

export default ToasterProvider;
