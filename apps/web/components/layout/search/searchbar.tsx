"use client";
import { useState, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import useDebounce from "@repo/ui/hooks/useDebounce";
import { InputGroupAddon, InputGroupButton } from "@repo/ui/components/input-group";
import { MapPin, Search } from "lucide-react";
import { Combobox, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxList } from "@repo/ui/components/combobox";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@repo/ui/components/item"
import { cities } from "@/constants/cities";
import { Business, Category } from "@repo/db";
import { useSearchStore } from "@/stores/search-store";

const api_url = process.env.AUTH_URL || "http://localhost:3000"


async function fetchServiceSuggestions(query: string, city: string) {
    const res = await fetch(`${api_url}/api/suggestions/services?q=${query}&city=${city}`)
    const data = await res.json()
    return data
}

function SearchBar() {
    const params = useParams<{
        city: string,
        slug: string,
        id: string
    }>();

    const router = useRouter()
    const pathname = usePathname()
    const defaultServices = [
        {
            type: "Category",
            items: [
                { name: "Hotels", slug: "Hotels", type: "Category", id: "1" },
                { name: "Restaurants", slug: "Restaurants", type: "Category", id: "2" },
                { name: "Dentists", slug: "Dentists", type: "Category", id: "3" },
                { name: "Schools", slug: "Schools", type: "Category", id: "4" },
                { name: "Education", slug: "Education", type: "Category", id: "5" },
                { name: "Real Estates", slug: "Real-Estates", type: "Category", id: "6" },
            ],
        },
        {
            type: "Business",
            items: [],
        }
    ]

    const {city,setCity,query,setQuery} = useSearchStore(state => state)
    const [service, setService] = useState({ name: "", slug: "", type: "", id: "" })
    const [services, setServices] = useState(defaultServices)
    const debouncedQuery = useDebounce(query, 500)


    async function setSuggestions() {
        
        const result = await fetchServiceSuggestions(debouncedQuery, city)
        if (result.success) {
            const suggestCategories = result.data.categories
            const suggestBusinesses = result.data.businesses
            const categoriesItems = suggestCategories.map((category: Category) => { return { name: category.name, slug: category.slug, type: "Category", id: category.id } })
            const businessesItems = suggestBusinesses.map((business: Business) => { return { name: business.name, slug: business.slug, type: "Business", id: business.id } })

            console.log(categoriesItems)
            console.log(businessesItems)
            setServices([
                {
                    type: "Category",
                    items: categoriesItems,
                },
                {
                    type: "Business",
                    items: businessesItems,
                }
            ])
        } else {
            setServices(defaultServices)
        }
    }
    function handleSearch(data: typeof service) {
        if (data.type == 'Category') {
            const url = `${api_url}/${city}/${data.slug}`
            router.replace(url)

        } else {
            const url = `${api_url}/${city}/${data.slug}/${data.id}`
            router.replace(url)
        }
    }

    useEffect(() => { 
        if(params.city) {
            const exist = cities.includes(params.city)
            if(exist) {
                setCity(params.city)
            } else {
                const currentUrl = pathname
                const arr = currentUrl.split('/')
                arr[1] = city
                router.replace(arr.join('/'))
            }
        }
     }, [params])
    useEffect(() => {
        console.log("Selected City", city)
    }, [city])

    useEffect(() => {
        console.log("Selected Service", service)
        if (service.name) { 
            handleSearch(service)
        } else {}
    }, [service])

    useEffect(() => {
        if(query.trim().length > 2) {
            setSuggestions()
        }
    }, [query])


    return (
        <div className="z-50 sticky top-1.5 max-w-4xl m-4 lg:mx-auto group border
         bg-white text-black border-gray-200 rounded-md sm:rounded-full
          flex flex-wrap md:flex-nowrap">
            <div className="relative w-full md:w-1/2">
                <Combobox onValueChange={(value) => { value ? setCity(value) : setCity("Agra") }} value={city} items={cities}>
                    <ComboboxInput className="h-10 hover:bg-gray-50 hover:border border-white shadow-none hover:border-gray-200 rounded-full" placeholder="Select Location">
                        <InputGroupAddon>
                            <MapPin />
                        </InputGroupAddon>
                    </ComboboxInput>
                    <ComboboxContent alignOffset={-10} className="w-60">
                        <ComboboxEmpty>No Results Found</ComboboxEmpty>
                        <ComboboxList>
                            <ComboboxList>
                                {(item) => (
                                    <ComboboxItem key={item} value={item}>
                                        {item}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>

                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </div>
            <div className="my-2 border group-hover:border-hidden delay-200 border-gray-200 transition-all"></div>
            <div className="relative w-full">
                <Combobox
                    items={services}
                    itemToStringLabel={(value) => (value.name)}
                    itemToStringValue={(value) => (value.value)}
                    onInputValueChange={(value) => { value ? setQuery(value) : setQuery("") }}
                    onValueChange={(value: any) => { value ? setService(value) : setService({ name: "", slug: "", type: "", id: "" }) }}>
                    <ComboboxInput showTrigger={false} className="h-10 hover:bg-gray-50 hover:border border-white shadow-none hover:border-gray-200 rounded-full" placeholder="Select For Services">
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                        <InputGroupButton
                            variant="default"
                            className="size-9 rounded-full cursor-pointer"
                            onClick={() => handleSearch(service)}
                        >
                            <Search className="size-5" />
                            <span className="sr-only">Search</span>
                        </InputGroupButton>
                    </ComboboxInput>
                    <ComboboxContent alignOffset={-5} className="">
                        <ComboboxEmpty>No Results Found</ComboboxEmpty>
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
                                                            {item.type}
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