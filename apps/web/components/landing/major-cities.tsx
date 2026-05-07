import Link from "next/link"
import Heading from "./heading"
import Image from "next/image"

const majorCities = [
    {
        image: '/assets/city/New-Delhi.webp',
        city: "New Delhi"
    },
    {
        image: '/assets/city/Mumbai.webp',
        city: "Mumbai"
    },
    {
        image: '/assets/city/Banglore.webp',
        city: "Banglore"
    },
    {
        image: '/assets/city/Chennai.webp',
        city: "Chennai"
    },
    {
        image: '/assets/city/Hyderabad.webp',
        city: "Hyderabad"
    },
    {
        image: '/assets/city/Pune.webp',
        city: "Pune"
    },
    {
        image: '/assets/city/Jaipur.webp',
        city: "Jaipur"
    },
    {
        image: '/assets/city/Ahmedabad.webp',
        city: "Ahmedabad"
    },
    {
        image: '/assets/city/Amritsar.webp',
        city: "Amritsar"
    },

]

export default function MajorCities() {
    return (
        <>
            <Heading title="Discover Major Cities" />
            <div className="grid gap-4 sm:gap-6 grid-cols-4 sm:grid-cols-6 md:grid-cols-9">
                {majorCities.map((city, index) => (
                    <Link className="relative group rounded-sm overflow-hidden" key={index} href={city.city}>
                        <img
                            width={150}
                            height={150}
                            loading="lazy"
                            className="rounded-sm transition-all ease-in-out hover:scale-105" src={city.image} alt={city.city} />
                        <span className="text-sm break-all group-hover:font-semibold md:text-base absolute left-2 bottom-1 text-white">{city.city}</span>
                    </Link>
                ))}
            </div>
        </>
    )
}