"use client"
import { Card, CardContent } from "@repo/ui/components/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@repo/ui/components/carousel"
import {  MapPin, MessageCircleCheck, Phone, Star } from "lucide-react"
import Link from "next/link"
import { Badge } from '@repo/ui/components/badge'
import { Button } from "@repo/ui/components/button"
import { Business, Contact, Location } from "@repo/db"
import Image from "next/image"
import WhatsappIcon from "../layout/logo/whatsapp"

interface ExtendBusiness {
  business: Business & { location: Location, contact: Contact }
}

export default function BusinessCard({ business }: ExtendBusiness) {
  console.log(business)

  return (
    <Card className="border-muted">
      <CardContent>
        <div className="flex flex-col md:flex-row">
          {/* Carousel */}
          <Carousel className="size-32 md:size-56">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <Image
                    width={400}
                    height={400}
                    className='rounded-md object-cover'
                    alt='banner'
                    src={`https://picsum.photos/400/400?random=${index + 1}`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-muted left-4" />
            <CarouselNext className="border-muted right-4" />
          </Carousel>

          <div className="space-y-3 p-4">
            <Link href={`/${business.location.city}/${business.slug}/${business.id}`}>
              <h2 className="text-xl mb-2 md:text-2xl font-semibold hover:text-primary transition-colors">
                {business.name}
              </h2>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-4">


              <span className="flex items-center  gap-1 rounded-md bg-green-600 px-2 py-0.5 text-sm font-semibold text-white">
                <Star fill="gold" color="gold" size={20} />
                <span className="ml-0.5">{business.rating_avg}</span>
              </span>
              <span className="text-sm text-muted-foreground">
                {business.rating_count} Reviews
              </span>


            </div>

            {/* Address */}
            <p className="flex gap-1 font-semibold  line-clamp-1">
              <MapPin className="size-5" />
              <span>
                {business.location.address_line1},{" "}
                {business.location.landmark},{" "}
                {business.location.area},{" "}
                {business.location.city} –{" "}
                {business.location.pincode}
              </span>
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {/* @ts-ignore */}
              {business.attributes.slice(0, 5).map((attribute:any) => (
                <Badge key={attribute.id} variant="secondary">
                  {attribute.key}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button className="cursor-pointer bg-green-600  hover:bg-green-700 gap-2">
                <Phone fill="white" className="animate-bounce ease-in-out" size={16} />
                {business.contact.phone}
              </Button>

              <Button variant="outline" className="cursor-pointer gap-2">
                <WhatsappIcon />
                WhatsApp
              </Button>

              <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700 gap-2">
                <MessageCircleCheck size={16} />
                Get Best Deal
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}