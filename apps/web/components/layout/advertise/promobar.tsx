import { ExternalLink, Phone } from "lucide-react";

interface PromoBarProps {
  business?: {
    name: string;
    subcategory: string;
    phone: string;
    image: string;
  };
  category?: string;
  city?: string;
}

export default function PromoBar({ business, category, city }: PromoBarProps) {
  const getPromoContent = () => {
    if (business) {
      return {
        title: business.name.toUpperCase(),
        subtitle: business.subcategory,
        phone: business.phone,
        image: business.image,
        bgGradient: "from-amber-900/80 to-amber-800/80",
      };
    }

    const categoryPromos = {
      restaurants: {
        title: "BEST RESTAURANTS IN " + (city || "MUMBAI").toUpperCase(),
        subtitle: "Fine Dining & Local Cuisine",
        phone: "8882137886",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
        bgGradient: "from-orange-900/80 to-red-900/80",
      },
      hotels: {
        title: "LUXURY HOTELS IN " + (city || "MUMBAI").toUpperCase(),
        subtitle: "Premium Accommodation Services",
        phone: "8882137886",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
        bgGradient: "from-blue-900/80 to-indigo-900/80",
      },
      "beauty-spa": {
        title: "TOP BEAUTY & SPA IN " + (city || "MUMBAI").toUpperCase(),
        subtitle: "Professional Beauty Services",
        phone: "8882137886",
        image:
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200",
        bgGradient: "from-pink-900/80 to-purple-900/80",
      },
      hospitals: {
        title: "BEST HOSPITALS IN " + (city || "MUMBAI").toUpperCase(),
        subtitle: "Quality Healthcare Services",
        phone: "8882137886",
        image:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200",
        bgGradient: "from-green-900/80 to-teal-900/80",
      },
      "estate-agents": {
        title: "REAL ESTATE AGENTS IN " + (city || "MUMBAI").toUpperCase(),
        subtitle: "Property Solutions",
        phone: "8882137886",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
        bgGradient: "from-slate-900/80 to-gray-900/80",
      },
      gyms: {
        title: "PREMIUM GYMS IN " + (city || "MUMBAI").toUpperCase(),
        subtitle: "Fitness & Wellness Centers",
        phone: "8882137886",
        image:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200",
        bgGradient: "from-red-900/80 to-orange-900/80",
      },
    };

    const categoryKey: string = category || "";
    return (
      (categoryPromos as Record<string, typeof categoryPromos.restaurants>)[
        categoryKey
      ] || {
        title: "DISCOVER LOCAL BUSINESSES",
        subtitle: "Find the best services near you",
        phone: "8882137886",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
        bgGradient: "from-gray-900/80 to-slate-900/80",
      }
    );
  };

  const promo = getPromoContent();

  return (
    <div className="relative w-full h-28 sm:h-32 md:h-36 lg:h-42 overflow-hidden rounded-lg shadow-lg">
      <div className="absolute -z-10 inset-0 bg-linear-to-r from-primary to-red-500 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex-1 min-w-0">
          <h2 className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-1 font-bold tracking-wide">
            {promo.title}
          </h2>
          <p className="text-white/90 text-xs sm:text-sm md:text-base uppercase tracking-wider font-medium">
            {promo.subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 ml-4">
          <div className="text-right">
            <p className="text-white/80 text-xs mb-1 uppercase tracking-wide">
              Call:
            </p>
            <a
              href={`tel:${promo.phone}`}
              className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold hover:text-yellow-300 transition-colors flex items-center gap-2 whitespace-nowrap"
              title={`Call ${promo.phone}`}
              aria-label={`Call ${promo.phone}`}
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              {promo.phone}
            </a>
          </div>

          <button
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-sm border border-white/30 whitespace-nowrap"
            title="More information"
            aria-label="More information"
            suppressHydrationWarning
          >
            More Info
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}