import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const parentId = searchParams.get("parentId")
  
  try {
    const categories = await prisma.category.findMany({
      where: { parent_id: parentId !== "null" ? parentId : null },
      select: {
        id: true,
        name: true
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error("[CATEGORIES_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}