import { Button } from "@repo/ui/components/button";
import { Building2, TrendingUp, UserCheck, Users } from "lucide-react";
import Pattern from "../layout/pattern";



export default function BusinessPromotion() {

  return (

    <div className="text-white space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="relative hover:scale-y-105 group p-6 transition-all rounded-md bg-linear-to-r hover:bg-linear-to-l from-[#1E90FF] to-blue-500">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Building2 className="size-10 group-hover:size-11 transition-all" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">List Your Business</h3>
          <p className="text-lg">
            Get discovered by millions of potential customers
            who are actively searching for trusted local businesses
            like yours
          </p>
          <span className='absolute -top-4 rounded-full px-2 py-1 bg-white text-black'>
            List Your Business
          </span>
        </div>
        <div className="relative p-6 hover:scale-y-105 group transition-all rounded-md bg-linear-to-r hover:bg-linear-to-l from-[#19B36A] to-green-500">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Users className="size-10 group-hover:size-11 transition-all" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Connect with Customers</h3>
          <p className="text-lg">
            Build strong relationships with your customer base and create meaningful connections that drive loyalty
          </p>
          <span className='absolute -top-4 rounded-full px-2 py-1 bg-white text-black'>
            Connect with Customers
          </span>
        </div>
        <div className="relative p-6 hover:scale-y-105 group transition-all rounded-md bg-linear-to-r hover:bg-linear-to-l from-[#F28C28] to-orange-500">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <TrendingUp className="size-10 group-hover:size-11 transition-all" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Grow Your Revenue</h3>
          <p className="text-lg">
            Increase sales with our powerful marketing tools and accelerate your business growth effortlessly
          </p>
          <span className='absolute -top-4 rounded-full px-2 py-1 bg-white text-black'>
            Grow Your Revenue
          </span>
        </div>
        <div className="relative p-6 hover:scale-y-105 group transition-all rounded-md bg-linear-to-r hover:bg-linear-to-l from-[#8B5CF6] to-violet-500">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <UserCheck className="size-10 group-hover:size-11 transition-all" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Build Your Brand</h3>
          <p className="text-lg">
            Get discovered by millions of potential customers who are actively searching for trusted local businesses like yours
          </p>
          <span className='absolute -top-4 rounded-full px-2 py-1 bg-white text-black'>
            Build Your Brand
          </span>
        </div>
      </div>
      <Button size="lg">Add Your Business Now</Button>

      <div className='relative text-center items-center grid grid-cols-2 sm:grid-cols-4 h-40 rounded-md bg-violet-400 '>
        <Pattern />
        <div className='space-y-2'>
          <h5 className='text-2xl sm:text-4xl'>10M+</h5>
          <p>Monthly Users</p>
        </div>
        <div className='space-y-2'>
          <h5 className='text-2xl sm:text-4xl'>500K+</h5>
          <p>Listed Businesses</p>
        </div>
        <div className='space-y-2'>
          <h5 className='text-2xl sm:text-4xl'>2M+</h5>
          <p>Reviews</p>
        </div>
        <div className='space-y-2'>
          <h5 className='text-2xl sm:text-4xl'>50+</h5>
          <p>Citites Covered</p>
        </div>
      </div>
    </div>
  );
}