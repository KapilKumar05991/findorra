import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.GEOAPIFY_API_KEY

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams
    const q = searchParams.get("q")
    const postcode = searchParams.get("postcode")

    if (!q) {
        return NextResponse.json({
            success: false,
            error: "query and pincode required to search"
        }, { status: 400 })
    }

    const res = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${q}&limit=5&lang=en&filter=countrycode%3Ain&format=json&type=city&apiKey=${API_KEY}`)

    let result = []
    if (postcode) {
        const res = await axios.get(`https://api.postalpincode.in/pincode/${postcode}`)
        result = res.data[0].PostOffice || []
    }


    return NextResponse.json({
        success: true,
        locations: res.data.results,
        offices: result
    })
}