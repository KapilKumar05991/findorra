
import { Award, Check, Eye, Shield } from "lucide-react";
import { Card, CardContent } from "@repo/ui/components/card";

const features = [
  {
    id: 1,
    icon: Check,
    title: "Verified Businesses",
    description: "All listings are verified for authenticity",
  },
  {
    id: 2,
    icon: Shield,
    title: "Trusted Reviews",
    description: "Real reviews from genuine customers",
  },
  {
    id: 3,
    icon: Award,
    title: "Best Quality",
    description: "Top-rated service providers only",
  },
  {
    id: 4,
    icon: Eye,
    title: "Quick Results",
    description: "Find what you need in seconds",
  },
];

export default function WhyChooseUs() {
  return (
    <div>
      <div className="rounded-lg bg-[#f3f4f6] dark:bg-[#080A0D] p-4 md:px-10">
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.id} className="border-0">
                <CardContent className="flex flex-col sm:flex-row items-center justify-start gap-6">
                  <div
                    className="relative w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-r from-cyan-500 to-sky-500 rounded-full flex items-center justify-center"
                    title={feature.title}
                  >
                    <Icon className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                    <div className="absolute animate-spin animation-duration-[4s] mask-x-from-50% mask-x-to-80% border-t-4 rounded-full border-t-white size-full bg-transparent box-border px-2"></div>
                  </div>
                  <div className="text-center md:text-start">
                    <h3 className="mb-1 sm:mb-2  font-semibold text-lg sm:text-xl">
                      {feature.title}
                    </h3>
                    <p>{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}