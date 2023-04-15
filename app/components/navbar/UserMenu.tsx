"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const UserMenu = () => {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </div>
        <div
          className="hover-shadow-md flex cursor-pointer flex-row items-center rounded-full border-[1px] border-neutral-100 p-4 transition hover:shadow-md md:px-2 md:py-1"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            <>
              <MenuItem onClick={() => {}} label="Login" />
              <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
