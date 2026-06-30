import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet"

import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import { Button } from "@repo/ui/components/button"
import { Briefcase, Calendar, CalendarRangeIcon, ChevronRight, Clock, Edit, Globe, Image, Link, MapPin, MenuSquare, Phone, Store } from "lucide-react"
import { Business } from "@repo/db"
import { useRouter } from "next/navigation"

type Prop = {
  biz: Business
}



export function BusinessProfile({ biz }: Prop) {
  const router = useRouter()
  const Menu = [
    {
      title: 'Business Name',
      icon: Briefcase,
      text: biz.name,
      action: () => { router.push(`/dashboard/business/${biz.id}/info`)}
    },
    {
      title: 'Timings',
      icon: Clock,
      text: null,
      action: () => { router.push(`/dashboard/business/${biz.id}/hours`)}
    },
    {
      title: 'Location',
      icon: MapPin,
      text: null,
      action: () => { router.push(`/dashboard/business/${biz.id}/location`)}
    },
    {
      title: 'Contact',
      icon: Phone,
      text: null,
      action: () => { router.push(`/dashboard/business/${biz.id}/contact`)}
    },
    {
      title: 'Category',
      icon: Store,
      text: null,
      action: () => { router.push(`/dashboard/business/${biz.id}/category`)}
    },
    {
      title: 'Photos',
      icon: Image,
      text: null,
      action: () => { router.push(`/dashboard/business/${biz.id}/gallery`)}
    },
    {
      title: 'Catalog / Rate List',
      icon: MenuSquare,
      text: null,
      action: () => { router.push(`/dashboard/business/${biz.id}/catalog`)}
    },
    {
      title: 'Year of Establishment',
      icon: CalendarRangeIcon,
      text: null,
      action: () => { router.push(`/dashboard/business/${biz.id}/info`)}
    },
    {
      title: 'Website',
      icon: Globe,
      text: null,
      action: () => { router.push(`/dashboard/business/${biz.id}/contact`)}
    },
    {
      title: 'Social Links',
      icon: Link,
      text: null,
      action: () => { router.push(`/dashboard/business/${biz.id}/contact`)}
    },
  ]
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button><Edit className="size-5" />Profile</Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Business profile</SheetTitle>
          <SheetDescription>
            Set your business so everyone can find you easily
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          {Menu.map((item, index) => (
            <button className="w-full h-16 bg-muted hover:bg-primary transition-all cursor-pointer flex justify-between gap-4 p-4 border-b" key={index} onClick={item.action}>
              <div className="flex items-center gap-4">
                <item.icon />
                <div className="flex flex-col justify-center items-start">
                  <p className="font-semibold">{item.title}</p>
                  {item.text && <p>{item.text}</p>}
                </div>
              </div>
              <ChevronRight />
            </button>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
