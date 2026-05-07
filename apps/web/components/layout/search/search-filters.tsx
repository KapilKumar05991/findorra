"use client"

import { Button } from "@repo/ui/components/button"
import { Filter, Star } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select"
import { Toggle } from "@repo/ui/components/toggle"


export function SearchFilters() {
    return (
        <div className="flex flex-wrap items-center gap-3 py-4">
            <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-500" />
                <span className="text-sm font-medium">Filters:</span>
            </div>

            {/* Sort By */}
            <Select defaultValue="relevance">
                <SelectTrigger className="w-[140px] h-9">
                    <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviewed</SelectItem>
                    <SelectItem value="distance">Nearest</SelectItem>
                </SelectContent>
            </Select>

            {/* Rating Filter */}
            <Select defaultValue="all">
                <SelectTrigger className="w-[130px] h-9">
                    <div className="flex items-center gap-1">
                        <Star size={14} className="fill-current" />
                        <SelectValue placeholder="Rating" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Any Rating</SelectItem>
                    <SelectItem value="4.5">4.5+</SelectItem>
                    <SelectItem value="4.0">4.0+</SelectItem>
                    <SelectItem value="3.5">3.5+</SelectItem>
                </SelectContent>
            </Select>

            {/* Price Filter (Optional - Keeping simple for now) */}
            {/* <Select>
        <SelectTrigger className="w-[120px] h-9">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">$</SelectItem>
          <SelectItem value="medium">$$</SelectItem>
          <SelectItem value="high">$$$</SelectItem>
        </SelectContent>
      </Select> */}

            {/* Open Now Toggle */}
            <Toggle variant="outline" size="sm" className="h-9 gap-2">
                <span className="text-sm">Open Now</span>
            </Toggle>

            {/* Clear Filters (Visual only for now) */}
            <Button variant="ghost" size="sm" className="text-muted-foreground h-9">
                Reset
            </Button>
        </div>
    )
}