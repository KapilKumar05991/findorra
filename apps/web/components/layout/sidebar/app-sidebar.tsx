"use client";

import slugGenerator from "@/utils/slug-generator";
import Link from "next/link";
import { useState } from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@repo/ui/components/input-group"
import { Search } from "lucide-react";
import { Input } from "@repo/ui/components/input";
import { useSearchStore } from "@/stores/search-store";

const categories = [
    {
        id: 1,
        name: "Restaurants",
        icon: "/assets/icons/restaurant.png",
    },
    {
        id: 2,
        name: "Hotels",
        icon: "/assets/icons/hotel.png",
    },
    {
        id: 3,
        name: "Beauty",
        icon: "/assets/icons/spa.png",
    },
    {
        id: 4,
        name: "Education",
        icon: "/assets/icons/education.png",
    },
    {
        id: 5,
        name: "Hospital",
        icon: "/assets/icons/repair.png",
    },
    {
        id: 6,
        name: "Rental Services",
        icon: "/assets/icons/property.png",
    },
    {
        id: 7,
        name: "Gym",
        icon: "/assets/icons/gym.png",
    },
    {
        id: 8,
        name: "Repair Service",
        icon: "/assets/icons/repair.png",
    },
    {
        id: 9,
        name: "Software Companies",
        icon: "/assets/icons/software.png",
    }
];


export default function AppSidebar() {

    const { city } = useSearchStore(state => state)



    const getCategoryUrl = (categoryName: string) => {
        const citySlug = slugGenerator(city);
        const categorySlug = slugGenerator(categoryName);
        return `/${citySlug}/${categorySlug}`;
    };

    return (
        <div className="hidden lg:block min-h-screen border-muted border-r w-full lg:w-xs">
            <div className="z-10 absolute sm:sticky top-2 h-screen w-full">
                <div className="bg-background h-full px-3">
                    <InputGroup className="bg-muted">
                        <InputGroupInput
                            placeholder="Search Category"

                        />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>

                    <div className="mt-4 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
                        {
                            categories.map((cate) => (
                                <Link
                                    href={getCategoryUrl(cate.name)}
                                    key={cate.id}
                                    className="flex rounded-md gap-2 p-2 hover:bg-muted transition-colors"
                                >
                                    <img
                                        className="size-6"
                                        src={cate.icon}
                                        alt={cate.name}
                                    />
                                    <span className="text-sm font-semibold">{cate.name}</span>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}