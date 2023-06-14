import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const isFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId); //if listingId is in list, return true
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      //Open login modal if user is not logged in
      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        //if listing is favorited, remove it from favorites
        if (isFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          //if listing is not favorited, add it to favorites
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Listing updated");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, isFavorited, listingId, loginModal, router]
  );

  return {
    isFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
