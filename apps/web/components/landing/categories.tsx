"use client"

import Link from "next/link";
import { Button } from "@repo/ui/components/button";
import Heading from "./heading";
import { ChevronRight } from "lucide-react";
import slugGenerator from "@/utils/slug-generator";
import { useSearchStore } from "@/stores/search-store";


const categories = [
  {
    id: 1001,
    name: "Restaurants",
    icon: "/assets/icons/restaurant.png",
  },
  {
    id: 2000,
    name: "Hotels",
    icon: "/assets/icons/hotel.png",
  },
  {
    id: 3021,
    name: "Spa",
    icon: "/assets/icons/spa.png",
  },
  {
    id: 2031,
    name: "Education",
    icon: "/assets/icons/education.png",
  },
  {
    id: 4040,
    name: "Hospital",
    icon: "/assets/icons/repair.png",
  },
  {
    id: 5002,
    name: "Rentel Services",
    icon: "/assets/icons/property.png",
  },
  {
    id: 4515,
    name: "Gym",
    icon: "/assets/icons/gym.png",
  },
  {
    id: 7842,
    name: "Repair Service",
    icon: "/assets/icons/repair.png",
  }
];

export default function Categories() {
  const {city, area} = useSearchStore(state => state)

  return (
    <div>
      <Heading title={`Popular in ${city}`} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link href={`/${city}/${slugGenerator(category.name)}`} key={category.id}
            className="hover:bg-primary/30 relative group p-4 space-y-1 border-gray-200 border rounded-md">
            <img
              src={category.icon}
              alt={category.name}
              className="size-12"
            />
            <h4 className="text-xl font-semibold">{category.name}</h4>
            <span>{category.id} listings</span>
            <Button className="bg-chart-2 hover:bg-chart-2 opacity-0 group-hover:opacity-100 absolute top-4 right-4 rounded-full size-8"><ChevronRight className="size-5" /></Button>
          </Link>
        ))}
      </div>
    </div>
  );
}