"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@repo/ui/components/carousel";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { cn } from "@repo/ui/lib/utils";
import { ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import BannerText from "./banner-text";

const slider = [
    {
        id: 1,
        image: "/assets/slider/slider.png",
        link: "/real-state",
    },
    {
        id: 2,
        image: "/assets/slider/slider-1.png",
        link: "/doctors",
    },
    {
        id: 3,
        image: "/assets/slider/slider-2.png",
        link: "/repair-services",
    },
    {
        id: 4,
        image: "/assets/slider/slider-3.png",
        link: "/software-companies",
    },
    {
        id: 5,
        image: "/assets/slider/slider-4.png",
        link: "/repair-services",
    },
];

export default function Banner() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const autoplayPlugin = useRef(
        Autoplay({
            delay: 4000,
            stopOnInteraction: false,
        }),
    );

    useEffect(() => {
        if (!api) {
            return;
        }
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const toggleAutoplay = () => {
        const autoplay = autoplayPlugin.current;
        if (isPlaying) {
            autoplay.stop();
        } else {
            autoplay.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="max-w-screen mx-auto p-4 md:px-12">
            <div className="mx-auto flex flex-wrap md:flex-nowrap gap-2 md:gap-4 md:h-80">
                <div className="md:w-1/2 h-80">
                    <Carousel
                        plugins={[autoplayPlugin.current]}
                        setApi={setApi}
                        className="h-full relative min-w-full max-w-2xl"
                    >
                        <CarouselContent className="h-full">
                            {slider.map((item) => (
                                <CarouselItem key={item.id} className="h-full">
                                    <Link
                                        href={item.link}
                                        className="block rounded-sm h-full w-full overflow-hidden"
                                    >
                                        <img
                                            className="h-full w-full object-cover"
                                            alt="banner"
                                            src={item.image}
                                        />
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4 text-white border-none bg-black/40" />
                        <CarouselNext className="right-4 text-white border-none bg-black/40" />

                        {/* Dots overlay on slider */}
                        <div className="absolute left-1/2 -translate-x-1/2 flex gap-2 bottom-4 z-10">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => api?.scrollTo(index)}
                                    className={cn(
                                        "w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-lg shadow-black/50",
                                        index === current
                                            ? "bg-white w-8"
                                            : "bg-white/60 hover:bg-white/90",
                                    )}
                                    suppressHydrationWarning
                                />
                            ))}
                        </div>

                        {/* Play/Pause button */}
                        <button
                            onClick={toggleAutoplay}
                            className="absolute right-4 bottom-4 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-200"
                            aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
                            suppressHydrationWarning
                        >
                            {isPlaying ? (
                                <Pause size={16} />
                            ) : (
                                <Play size={16} />
                            )}
                        </button>
                    </Carousel>
                </div>
                <div className="md:w-1/2 h-80 flex overflow-auto gap-2 lg:gap-4 items-center">
                    <div className="cursor-pointer group bg-linear-to-b from-[#31C0FF] to-[#0669B1] relative rounded-sm w-1/3 h-full overflow-hidden">
                        <BannerText title="real state" text="Explore Properties" />
                        <img
                            className="absolute transition-all duration-500 group-hover:scale-110 bottom-0 right-0 rounded-sm object-cover"
                            alt="banner"
                            src="/assets/banner/exp1.png"
                        />
                        <Button
                            size={"sm"}
                            className="bg-transparent brightness-110 inset-shadow-xs
                         inset-shadow-white/50 shadow-white shadow-xs backdrop-blur-xs hover:bg-tansparent
                         absolute -left-16 group-hover:-left-1.5 bottom-4"
                        >
                            Explore <ChevronRight />
                        </Button>
                    </div>
                    <div className="cursor-pointer group bg-linear-to-b from-[#5DE3AD] to-[#17B877] rounded-sm relative w-1/3 h-full overflow-hidden">
                        <BannerText title="doctors" text="Quality Healthcare you can" />
                        <img
                            className="absolute transition-all duration-500 group-hover:scale-110 bottom-0 right-0 rounded-sm object-cover"
                            alt="banner"
                            src="/assets/banner/exp2.png"
                        />
                        <Button
                            size={"sm"}
                            className="bg-transparent brightness-110 inset-shadow-xs
                         inset-shadow-white/50 shadow-white shadow-xs backdrop-blur-xs
                         hover:bg-tansparent absolute -left-16 group-hover:-left-1.5 bottom-4"
                        >
                            Explore <ChevronRight />
                        </Button>
                    </div>
                    <div className="cursor-pointer group bg-linear-to-b from-[#B89CFF] to-[#8964E8] relative rounded-sm w-1/3 h-full overflow-hidden">
                        <BannerText title="repair & services" text="Skilled Professional" />
                        <img
                            className="absolute transition-all duration-500 group-hover:scale-110 bottom-0 right-0 rounded-sm object-cover"
                            alt="banner"
                            src="/assets/banner/exp3.png"
                        />
                        <Button
                            size={"sm"}
                            className="bg-transparent brightness-110 inset-shadow-xs
                         inset-shadow-white/50 shadow-white shadow-xs
                         backdrop-blur-xs hover:bg-tansparent absolute
                         -left-16 group-hover:-left-1.5 bottom-4"
                        >
                            Explore <ChevronRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}