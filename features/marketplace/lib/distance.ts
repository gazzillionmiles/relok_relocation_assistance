export interface Coordinates {
  lat: number;
  lng: number;
}

export const CITY_COORDINATES: Record<string, Coordinates> = {
  'Bengaluru': { lat: 12.9716, lng: 77.5946 },
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Delhi NCR': { lat: 28.6139, lng: 77.2090 },
  'Pune': { lat: 18.5204, lng: 73.8567 },
  'Hyderabad': { lat: 17.3850, lng: 78.4867 },
  'Chennai': { lat: 13.0827, lng: 80.2707 },
  'Kolkata': { lat: 22.5726, lng: 88.3639 },
};

/**
 * Calculates distance in kilometers between two GPS coordinates using Haversine formula.
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Number(d.toFixed(1));
}

/**
 * Resolves item location coordinates based on locality string and city context.
 */
export function getItemCoordinates(location: string, city: string): Coordinates {
  const loc = (location || '').toLowerCase();
  const c = (city || '').toLowerCase();

  if (c.includes('bengaluru') || c.includes('bangalore')) {
    if (loc.includes('hsr')) return { lat: 12.9116, lng: 77.6389 };
    if (loc.includes('indiranagar')) return { lat: 12.9784, lng: 77.6408 };
    if (loc.includes('koramangala')) return { lat: 12.9279, lng: 77.6271 };
    if (loc.includes('whitefield')) return { lat: 12.9698, lng: 77.7499 };
    return CITY_COORDINATES['Bengaluru'];
  }

  if (c.includes('mumbai')) {
    if (loc.includes('bandra')) return { lat: 19.0600, lng: 72.8229 };
    if (loc.includes('andheri')) return { lat: 19.1136, lng: 72.8697 };
    if (loc.includes('powai')) return { lat: 19.1176, lng: 72.9060 };
    return CITY_COORDINATES['Mumbai'];
  }

  if (c.includes('hyderabad')) {
    if (loc.includes('gachibowli')) return { lat: 17.4416, lng: 78.3489 };
    if (loc.includes('jubilee')) return { lat: 17.4325, lng: 78.4071 };
    return CITY_COORDINATES['Hyderabad'];
  }

  if (c.includes('pune')) {
    if (loc.includes('koregaon')) return { lat: 18.5362, lng: 73.8940 };
    if (loc.includes('kalyani')) return { lat: 18.5463, lng: 73.9033 };
    return CITY_COORDINATES['Pune'];
  }

  return CITY_COORDINATES[city] || { lat: 12.9116, lng: 77.6389 };
}

/**
 * Calculates distance from user's active coordinates to an item's location.
 */
export function calculateItemDistance(
  userCoords: Coordinates | null,
  location: string,
  city: string
): number | null {
  if (!userCoords) return null;
  const itemCoords = getItemCoordinates(location, city);
  return calculateDistanceKm(
    userCoords.lat,
    userCoords.lng,
    itemCoords.lat,
    itemCoords.lng
  );
}
