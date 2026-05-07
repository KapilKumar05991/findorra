import Heading from "@/components/landing/heading";
import Image from "next/image";

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params
  return (
    <div className="w-full">
      <section className="container mx-auto ">
        <div className="w-full p-4">
          <Heading title={`Welcome to ${city}`} />
          <Image src={`/assets/city/${city}.webp`} alt={city} width={500} height={500} className="w-full rounded-lg" />
        </div>
      </section>
    </div>
  );
}
