
import { notFound } from "next/navigation"
import Link from "next/link"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@repo/ui/components/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Globe, InstagramIcon, LinkedinIcon, Mail, MapPin, MessageCircleCheck, Navigation, Phone, Share, Share2, Star, StarIcon, TwitterIcon, Users, Users2, YoutubeIcon } from "lucide-react"
import { Button } from "@repo/ui/components/button"
import WhatsappIcon from "@/components/layout/logo/whatsapp"
import Image from "next/image"
import { Business, BusinessAttribute, BusinessFAQ, BusinessMedia, Contact, Location, Review, User } from "@repo/db"
import { Badge } from "@repo/ui/components/badge"
import ReviewForm from "@/components/business/review-form"

interface BusinessPageProps {
    params: Promise<{
        city: string
        slug: string
        id: string
    }>
}

async function fetchBusiness(id: string) {
    const result = await fetch(`${process.env.AUTH_URL}/api/business/${id}`)
    return result.json()
}


export default async function BusinessPage({ params }: BusinessPageProps) {
    const { city, slug, id } = await params
    const data = await fetchBusiness(id)
    const business: Business & { attributes: BusinessAttribute[], media: BusinessMedia[], faqs: BusinessFAQ[], location: Location, contact: Contact, reviews: (Review & { user: User })[] } = data.data.business

    if (!business) {
        notFound()
    }

    const business_hours = JSON.stringify(business.business_hours)
    const businessHours = JSON.parse(business_hours)

    return (
        <div className="w-full">
            <div className="container p-2 md:px-10">
                <div className="">
                    <Breadcrumb className="mb-4">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">
                                    {business.location.city}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">
                                    {business.location.area}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {business.name}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <main className="">
                    <Card className="border-muted py-0 gap-1 overflow-hidden">
                        <div className="h-[220px] flex gap-1">
                            <div className="w-full md:w-1/2">
                                <Image
                                    width={500}
                                    height={500}
                                    className="h-full w-full object-cover bg-muted"
                                    src={business.media[0].url}
                                    alt={business.name}
                                />
                            </div>
                            <div className="hidden md:block w-1/4">
                                <Image
                                    width={500}
                                    height={500}
                                    className="h-full w-full object-cover bg-muted"
                                    src={business.media[1].url}
                                    alt={business.name}
                                />
                            </div>
                            <div className="hidden md:block w-1/4">
                                <Image
                                    width={500}
                                    height={500}
                                    className="h-full w-full object-cover bg-muted"
                                    src={business.media[2].url}
                                    alt={business.name}
                                />
                            </div>
                        </div>

                        <CardContent className="space-y-3 pb-6">
                            <h1 className="text-2xl font-semibold">{business.name}</h1>

                            {/* Rating */}
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1 rounded-md bg-green-600 px-2 py-0.5 text-sm font-semibold text-white">
                                    <Star color="gold" fill="gold" size={16} />
                                    {business.rating_avg}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {business.rating_count} Reviews
                                </span>
                            </div>

                            {/* Address */}
                            <p className="flex gap-1 text-sm text-muted-foreground">
                                <MapPin size={20} className="mt-0.5" />
                                {business.location.address_line1},{" "}
                                {business.location.landmark},{" "}
                                {business.location.area},{" "}
                                {business.location.city} –{" "}
                                {business.location.pincode}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {business.attributes.map((attribute: any) => (
                                    <Badge key={attribute.id} variant="secondary">
                                        {attribute.key}
                                    </Badge>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                <Button className="cursor-pointer gap-2 bg-green-500 hover:bg-green-600">
                                    <Phone className="animate-bounce ease-in-out" size={16} />
                                    {business.contact.phone}
                                </Button>

                                <Button variant="outline" className="cursor-pointer gap-2">
                                    <WhatsappIcon />
                                    Whatsapp
                                </Button>

                                <Button className="cursor-pointer gap-2 bg-blue-500 hover:bg-blue-600">
                                    <MessageCircleCheck size={16} />
                                    Get Best Deal
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* LEFT */}
                        <div className="lg:col-span-2 md:mb-4">
                            <Card className="border-muted pt-2">
                                <CardContent className="p-0">

                                    {/* SECTION MENU */}
                                    <div className="border-b">
                                        <nav className="flex gap-6 overflow-x-auto px-6 py-3 text-sm font-medium">
                                            {[
                                                { label: "Overview", id: "overview" },
                                                { label: "Photos", id: "photos" },
                                                { label: "Services", id: "services" },
                                                { label: "Reviews", id: "reviews" },
                                                { label: "FAQ", id: "faq" },
                                            ].map((item) => (
                                                <Link href={'#' + item.id}
                                                    key={item.id}
                                                    className="whitespace-nowrap p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-primary transition"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>

                                    {/* CONTENT SECTIONS */}
                                    <div className="space-y-12 p-6">

                                        {/* OVERVIEW */}
                                        <section id="overview" className="scroll-mt-40">
                                            <p className="text-xl font-semibold mb-2">Overview</p>
                                            <div className="whitespace-pre-line">
                                                <p className="text-muted-foreground text-lg font-semibold">Business Summary</p>
                                                <p>{business.description || "No description available."}</p>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-muted-foreground text-lg font-semibold">Established in</p>
                                                <p>{new Date(business.created_at).getFullYear()}</p>
                                            </div>
                                        </section>

                                        {/* PHOTOS */}
                                        <section id="photos" className="scroll-mt-40">
                                            <h2 className="text-xl font-semibold mb-4">Photos</h2>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {business.media.map((img) => (
                                                    <div
                                                        key={img.id}
                                                        className="h-28 rounded-md bg-muted overflow-hidden"
                                                    >
                                                        <Image
                                                           height={200}
                                                           width={200}
                                                            src={img.url}
                                                            alt={img.caption || "Business Photo"}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        {/* SERVICES */}
                                        <section id="services" className="scroll-mt-40">
                                            <h2 className="text-xl font-semibold mb-2">Services</h2>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {business.attributes.map((attribute: any) => (
                                                    <li key={attribute.id}>
                                                        {attribute.key}: {attribute.value}
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>

                                        {/* WORKING HOURS */}

                                        <section id="info" className="scroll-mt-40">
                                            <h2 className="text-xl font-semibold mb-2">Working Hours</h2>
                                            <div className="space-y-2 text-sm">
                                                <table className="table **:px-2">
                                                    <thead>
                                                        <tr>
                                                            <th>Day</th>
                                                            <th>Open</th>
                                                            <th>Close</th>
                                                            <th>Closed</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Object.keys(businessHours).map((key) => (
                                                            <tr key={key}>
                                                                <td>{key.toUpperCase()}</td>
                                                                <td>{businessHours[key].open}</td>
                                                                <td>{businessHours[key].close}</td>
                                                                <td>{businessHours[key].closed ? "Yes" : "No"}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                        </section>




                                        {/* REVIEWS */}
                                        <section id="reviews" className="scroll-mt-40">
                                            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                                            <Card className="mb-4">
                                                <CardHeader>
                                                    <CardTitle>Add a Review</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <ReviewForm />
                                                </CardContent>
                                            </Card>
                                            <div className="space-y-4">
                                                {business.reviews.map((rev) => (
                                                    <div
                                                        key={rev.id}
                                                        className="border rounded-lg p-4 text-sm text-muted-foreground"
                                                    >
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-semibold text-foreground">{rev.user.name}</span>
                                                            <span className="text-xs text-muted-foreground">{new Date(rev.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="flex text-yellow-500 mb-2">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={14}
                                                                    fill={i < rev.rating ? "currentColor" : "none"}
                                                                    className={i < rev.rating ? "text-yellow-500" : "text-gray-300"}
                                                                />
                                                            ))}
                                                        </div>
                                                        <p>{rev.body}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        {/* FAQS */}
                                        <section id="faq" className="scroll-mt-40">
                                            <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions</h2>
                                            <div className="space-y-4">
                                                {business.faqs.map((faq, index) => (
                                                    <div key={faq.id} className="border-b pb-2">
                                                        <h3 className="font-medium text-foreground">{index + 1}. {faq.question}</h3>
                                                        <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>


                        {/* RIGHT */}
                        <div className="lg:col-span-1 space-y-6 mb-4">
                            <Card className="border-muted p-0">
                                <CardContent className="flex flex-col items-start space-y-4 p-6">
                                    <h2 className="text-xl font-semibold">Contact</h2>

                                    <Button className="cursor-pointer" size="lg" variant="ghost">
                                        <Phone fill="white" className="animate-bounce ease-in-out" size={20} />
                                        {business.contact?.phone}
                                    </Button>

                                    <h2 className="text-xl font-semibold">Address</h2>
                                    <p className="px-2">
                                        {business.location.address_line1},{" "}
                                        {business.location.address_line2},{" "}
                                        {business.location.area},{" "}
                                        {business.location.city},{" "}
                                        {business.location.state},{" "}
                                        {business.location.country}
                                    </p>
                                    {business.contact.website &&
                                        <Button asChild className="cursor-pointer" size="lg" variant="ghost">
                                            <Link href={business.contact.website}>
                                                <Globe className="size-6" />
                                                {business.contact.website}
                                            </Link>
                                        </Button>
                                    }
                                    {business.contact.instagram &&
                                        <Button className="cursor-pointer" size="lg" variant="ghost">
                                            <InstagramIcon fill="red" className="size-6" />
                                            Instagram
                                        </Button>
                                    }
                                    {business.contact.twitter &&
                                        <Button asChild className="cursor-pointer" size="lg" variant="ghost">
                                            <Link href={business.contact.twitter}>
                                                <TwitterIcon fill="red" className="size-6" />
                                                Twitter
                                            </Link>
                                        </Button>
                                    }
                                    {business.contact.youtube &&
                                        <Button asChild className="cursor-pointer" size="lg" variant="ghost">
                                            <Link href={business.contact.youtube}>
                                                <YoutubeIcon fill="red" className="size-6" />
                                                Youtube
                                            </Link>
                                        </Button>
                                    }
                                    {business.contact.linkedin &&
                                        <Button asChild className="cursor-pointer" size="lg" variant="ghost">
                                            <Link href={business.contact.linkedin}>
                                                <LinkedinIcon fill="red" className="size-6" />
                                                Linkedin
                                            </Link>
                                        </Button>
                                    }

                                    <Button className="cursor-pointer" size="lg" variant="ghost">
                                        <StarIcon fill="white" className="size-6" />
                                        Add to favourite
                                    </Button>

                                    <Button className="cursor-pointer" size={"lg"} variant="ghost">
                                        <Mail className="size-6" />
                                        {business.contact.email}
                                    </Button>

                                    <Button className="cursor-pointer" size={"lg"} variant="ghost">
                                        <Share2 className="size-6" />
                                        Share
                                    </Button>

                                    <Button className="cursor-pointer" size={"lg"} variant="ghost">
                                        <MapPin className="size-6" />
                                        Get Directions
                                    </Button>

                                    <Button className="cursor-pointer" size={"lg"} variant="ghost">
                                        <Users2 className="size-6" />
                                        Join
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}