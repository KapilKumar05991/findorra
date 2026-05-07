import MyBusiness from "@/components/dashboard/business/my-business";
import Heading from "@/components/landing/heading";

export default function Page() {
  return (
    <div className="px-4">
      <Heading title="My Business" />
      <section className="w-full" id="my-business">
        <MyBusiness />
      </section>
    </div>
  )
}