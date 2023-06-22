"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div>
      <Image
        onClick={() => router.push("/")}
        alt="logo"
        src="/images/logo.png"
        width={100}
        height={100}
        className="hidden cursor-pointer md:block"
      />
    </div>
  );
};

export default Logo;
