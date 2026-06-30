"use client";
import { useState, useEffect, useTransition, useRef } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import useDebounce from "@repo/ui/hooks/useDebounce";
import { InputGroupAddon, InputGroupButton } from "@repo/ui/components/input-group";
import { MapPin, Search, TrendingUp } from "lucide-react";
import { Combobox, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxList } from "@repo/ui/components/combobox";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@repo/ui/components/item"
import { useSearchStore } from "@/stores/search-store";
import axios from "axios";
import cities from "@/constants/cities"

const api_url = process.env.AUTH_URL || "http://localhost:3000"

function SearchBar() {
    const [isPending, startTransition] = useTransition()
    const params = useParams<{
        city: string,
        slug: string,
        id: string
    }>();

    const router = useRouter()
    const pathname = usePathname()

    const defaultLocations = [
        {
            type: "Current Location",
            items: []
        },
        {
            type: "Trending Searches",
            items: [
                { place_id: "1", address_line1: "", city: "Mumbai", state: "Maharashtra", postcode: "400001", country: "India" },
                { place_id: "2", address_line1: "", city: "Delhi", state: "Delhi", postcode: "110001", country: "India" },
                { place_id: "3", address_line1: "", city: "Hyderabad", state: "Telangana", postcode: "500001", country: "India" },
                { place_id: "4", address_line1: "", city: "Bangalore", state: "Karnataka", postcode: "560001", country: "India" },
                { place_id: "5", address_line1: "", city: "Chennai", state: "Tamil Nadu", postcode: "600001", country: "India" },
                { place_id: "6", address_line1: "", city: "Kolkata", state: "West Bengal", postcode: "700001", country: "India" },
                { place_id: "7", address_line1: "", city: "Pune", state: "Maharashtra", postcode: "411001", country: "India" },
                { place_id: "8", address_line1: "", city: "Ahmedabad", state: "Gujarat", postcode: "380001", country: "India" },
            ]
        },
        {
            type: "Suggested Areas",
            items: []
        },
        {
            type: "Location Search",
            items: []
        }
    ]
    const defaultServices = [
        {
            type: "Search Popular",
            items: [
                { name: "Hotels", slug: "Hotels", sort_order: "1", id: "1" },
                { name: "Restaurants", slug: "Restaurants", sort_order: "1", id: "2" },
                { name: "Dentists", slug: "Dentists", sort_order: "2", id: "3" },
                { name: "Schools", slug: "Schools", sort_order: "2", id: "4" },
                { name: "Education", slug: "Education", sort_order: "3", id: "5" },
                { name: "Real Estates", slug: "Real-Estates", sort_order: "3", id: "6" },
            ],
        },
        {
            type: "Search Business",
            items: [],
        }
    ]

    const { city, setSearchLocation, area, postcode, setLocQuery, locQuery, query, setQuery } = useSearchStore(state => state)
    const [service, setService] = useState({ is_active: false, name: "", slug: "", id: "" })
    const [location, setLocation] = useState<any>({ place_id: "1", address_line1: "", city: "Delhi", state: "Delhi", postcode: "110001", country: "India" })
    const [services, setServices] = useState(defaultServices)
    const [locations, setLocations] = useState(defaultLocations)
    const debouncedQuery = useDebounce(query, 250)
    const debounceLocQuery = useDebounce(locQuery, 250)


    const controller = useRef(new AbortController())

    async function fetchLocationSuggestion(query: string, postcode: string) {
        try {
            controller.current.abort()
            controller.current = new AbortController()
            const res = await axios.get(`${api_url}/api/suggestions/location?q=${query}&postcode=${postcode}`, {
                signal: controller.current.signal
            })
            return res.data
        } catch (error: any) {
            return error.response.data
        }
    }

    async function fetchServiceSuggestion(query: string, postcode: string, city: string) {
        try {
            controller.current.abort()
            controller.current = new AbortController()
            const res = await axios.get(`${api_url}/api/suggestions/services?q=${query}&city=${city}&postcode=${postcode}`, {
                signal: controller.current.signal
            })
            return res.data
        } catch (error: any) {
            return error.response.data
        }
    }

    useEffect(() => {
        if (!city && params.city) {
            const exist = cities.find((c: string) => c.toLowerCase() === params.city.toLowerCase())
            if (exist) {
                setSearchLocation(params.city, "", "")
            }
        }
    }, [params])

    useEffect(() => {
        if (service.is_active) {
            router.replace(`/${city}/${service.slug}${area && area !== city ? `-in-${area}` : ""}${postcode ? `?postcode=${postcode}` : ""}`)
        } else if (service.slug) {
            router.replace(`/${city}/${service.slug}/${service.id}`)
        }
    }, [service, city, area])


    useEffect(() => {

        if (location.place_id) {
            setSearchLocation(location.city, location.address_line1, location.postcode || "")
        } else {
            setSearchLocation(location.District, location.Name, location.Pincode)
        }
    }, [location])

    useEffect(() => {
        if (debounceLocQuery) {
            startTransition(async () => {
                const result = await fetchLocationSuggestion(debounceLocQuery, postcode)
                if (result.success) {
                    const locs = [
                        { type: "Suggested Areas", items: result.offices },
                        { type: "Suggested Locations", items: result.locations }
                    ]
                    setLocations(locs)
                }
            })
        }

    }, [debounceLocQuery])

    useEffect(() => {
        if (debouncedQuery.length) {
            startTransition(async () => {
                const result = await fetchServiceSuggestion(debouncedQuery, postcode, city)
                if (result.success) {
                    setServices([
                        { type: "Search Category", items: result.categories },
                        { type: "Search Business", items: result.businesses },
                    ])
                }
            })
        } else {
            setServices(defaultServices)
        }
    }, [debouncedQuery])


    return (
        <div className="z-50 sticky top-1.5 max-w-4xl m-4 lg:mx-auto group border
         bg-white text-black border-gray-200 rounded-md sm:rounded-full
          flex flex-wrap md:flex-nowrap">
            <div className="relative w-full md:w-1/2">
                <Combobox
                    onValueChange={(value) => { value && setLocation(value) }}
                    onInputValueChange={(value) => { value && setLocQuery(value) }}
                    itemToStringLabel={(value: any) => (value.address_line1 || value.city || value.Name)}
                    itemToStringValue={(value: any) => (value.address_line1 || value.city|| value.Name)}
                    value={location}
                    items={locations}>
                    <ComboboxInput className="h-10 hover:bg-gray-50 hover:border border-white shadow-none hover:border-gray-200 rounded-full" placeholder="Select Location"
                    >
                        <InputGroupAddon>
                            <MapPin />
                        </InputGroupAddon>
                    </ComboboxInput>
                    <ComboboxContent alignOffset={-10} className="w-sm">
                        <ComboboxEmpty>{isPending ? "Loading ..." : "No Results Found"}</ComboboxEmpty>
                        <ComboboxList>

                            {(group) => (
                                <ComboboxGroup key={group.type} items={group.items}>
                                    <ComboboxLabel>{group.type}</ComboboxLabel>
                                    <ComboboxCollection>
                                        {(item) => (
                                            <ComboboxItem key={item.place_id || item.Name} value={item}>
                                                <Item size="xs" className="p-0">
                                                    <ItemMedia variant="image">
                                                        <MapPin />
                                                    </ItemMedia>
                                                    <ItemContent>
                                                        <ItemTitle>
                                                            {item.address_line1 || item.Name} {item.city && item.city !== item.address_line1 ? `${item.city}` : ''} {item.District && item.District !== item.Name ? `${item.District}` : ''}
                                                        </ItemTitle>
                                                        <ItemDescription>
                                                             {item.Circle ? `${item.Circle}, ` : ''}{item.state ? `${item.state}, ` : ''}{item.country || item.Country}
                                                        </ItemDescription>
                                                    </ItemContent>
                                                </Item>
                                            </ComboboxItem>
                                        )}
                                    </ComboboxCollection>
                                </ComboboxGroup>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </div>
            <div className="my-2 border group-hover:border-hidden delay-200 border-gray-200 transition-all"></div>
            <div className="relative w-full">
                <Combobox
                    items={services}
                    itemToStringLabel={(value) => (value.name)}
                    itemToStringValue={(value) => (value.name)}
                    onInputValueChange={(value) => { value && setQuery(value) }}
                    onValueChange={(value: any) => { value && setService(value) }}>
                    <ComboboxInput showTrigger={false} className="h-10 hover:bg-gray-50 hover:border border-white shadow-none hover:border-gray-200 rounded-full" placeholder="Select For Services">
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                        <InputGroupButton
                            variant="default"
                            className="size-9 rounded-full cursor-pointer"
                            onClick={() => { console.log('coming soon') }}
                        >
                            <Search className="size-5" />
                            <span className="sr-only">Search</span>
                        </InputGroupButton>
                    </ComboboxInput>
                    <ComboboxContent alignOffset={-5} className="">
                        <ComboboxEmpty>{isPending ? "Loading ..." : "No Results Found"}</ComboboxEmpty>
                        <ComboboxList>
                            {(group) => (
                                <ComboboxGroup key={group.type} items={group.items}>
                                    <ComboboxLabel>{group.type}</ComboboxLabel>
                                    <ComboboxCollection>
                                        {(item) => (
                                            <ComboboxItem key={item.id} value={item}>
                                                <Item size="xs" className="p-0">
                                                    <ItemMedia variant="image">
                                                        <Search />
                                                    </ItemMedia>
                                                    <ItemContent>
                                                        <ItemTitle>
                                                            {item.name}
                                                        </ItemTitle>
                                                        <ItemDescription>
                                                            {item.sort_order ? "Category" : "Business"}
                                                        </ItemDescription>
                                                    </ItemContent>
                                                </Item>
                                            </ComboboxItem>
                                        )}
                                    </ComboboxCollection>
                                </ComboboxGroup>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </div>
        </div>
    );
}

export default SearchBar;