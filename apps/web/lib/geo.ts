import { prisma } from "@repo/db";

export async function findBusinessesNearby({
    lat,
    lng,
    radiusKm = 10,
    categoryId,
    limit = 20,
}: {
    lat: number;
    lng: number;
    radiusKm?: number;
    categoryId?: string;
    limit?: number;
}) {
    // Haversine formula via raw SQL — returns distance in km
    const results = await prisma.$queryRaw<any[]>`
    SELECT
      b.*,
      (
        6371 * acos(
          cos(radians(${lat})) *
          cos(radians(b.lat)) *
          cos(radians(b.lng) - radians(${lng})) +
          sin(radians(${lat})) *
          sin(radians(b.lat))
        )
      ) AS distance_km
    FROM "Business" b
    WHERE b."isActive" = true
    ${categoryId ? prisma.$queryRaw`AND b."categoryId" = ${categoryId}` : prisma.$queryRaw``}
    HAVING distance_km < ${radiusKm}
    ORDER BY distance_km ASC
    LIMIT ${limit}
  `;

    return results;
}