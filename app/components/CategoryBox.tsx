import React, { FC, useCallback } from "react";
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  description: string;
  selected?: boolean;
}

const CategoryBox: FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  description,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  //Asign params to category
  const handleClick = useCallback(() => {
    let currentQuery = {};

    //If there are params, create an object out of them
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    //label of icon will be the category param
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    //If the clicked item is the same as the current category, bring us back to the homepage
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    //generating new url with paht / and params updatedQuery
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [params, label, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800 ${
        selected
          ? "border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      }`}
    >
      <Icon size={26} />
      <div className="font-meidum text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
