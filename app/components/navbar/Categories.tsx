import React from "react";
import Container from "../Container";
import { GiWindmill } from "react-icons/gi";
import { TbBeach } from "react-icons/tb";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "Seafront properties with a view of the port",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "Apartment near a large old windmill",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "Modern villa with a private pool",
  },
];

const Categories = () => {
  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
        {categories.map((category) => (
          <CategoryBox key={category.label} {...category} />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
