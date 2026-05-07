import Banner from "@/components/landing/banner/banner";
import BusinessPromotion from "@/components/landing/business-promotion";
import Categories from "@/components/landing/categories";
import Heading from "@/components/landing/heading";
import MajorCities from "@/components/landing/major-cities";
import WhyChooseUs from "@/components/landing/why-choose-us";


export default function Page() {
  return (
    <div>
      <section className="py-8 px-6 space-y-4 bg-[#f8f9fa] dark:bg-[#030405] text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl font-semibold">
          India’s No #1 Ai based Local Search Engine
        </h1>
        <h2 className="text-2xl">
          Search from millions of verified businesses near you
        </h2>
      </section>

      <Banner />

      <section id="major-cities" className="container mx-auto p-4 md:px-12">
        <MajorCities />
      </section>

      <section id="popular" className="container mx-auto p-4 md:px-12">
        <Categories />
      </section>

      <section id="why-choose-us" className="container mx-auto p-4 md:px-12">
        <Heading title="Why Choose Us?" />
        <WhyChooseUs />
      </section>

      <section id="grow-business" className="container mx-auto p-4 md:px-12">
        <Heading title="Grow Your Business with Naestero" />
        <BusinessPromotion />
      </section>
    </div>
  );
}
