// lib/utils/search.ts
export interface SearchFilters {
  query?: string
  city?: string
  minRent?: number
  maxRent?: number
  propertyType?: string
  bedrooms?: number
  genderPreference?: string
  smokingAllowed?: boolean
  petsAllowed?: boolean
  foodPreference?: string
}

export function buildPropertySearchParams(filters: SearchFilters) {
  const params = new URLSearchParams()

  if (filters.query) params.set('q', filters.query)
  if (filters.city) params.set('city', filters.city)
  if (filters.minRent) params.set('min_rent', filters.minRent.toString())
  if (filters.maxRent) params.set('max_rent', filters.maxRent.toString())
  if (filters.propertyType) params.set('type', filters.propertyType)
  if (filters.bedrooms) params.set('bedrooms', filters.bedrooms.toString())
  if (filters.genderPreference) params.set('gender', filters.genderPreference)
  if (filters.smokingAllowed !== undefined) params.set('smoking', filters.smokingAllowed.toString())
  if (filters.petsAllowed !== undefined) params.set('pets', filters.petsAllowed.toString())
  if (filters.foodPreference) params.set('food', filters.foodPreference)

  return params
}

export function parseSearchParams(searchParams: URLSearchParams): SearchFilters {
  return {
    query: searchParams.get('q') || undefined,
    city: searchParams.get('city') || undefined,
    minRent: searchParams.get('min_rent') ? parseInt(searchParams.get('min_rent')!) : undefined,
    maxRent: searchParams.get('max_rent') ? parseInt(searchParams.get('max_rent')!) : undefined,
    propertyType: searchParams.get('type') || undefined,
    bedrooms: searchParams.get('bedrooms') ? parseInt(searchParams.get('bedrooms')!) : undefined,
    genderPreference: searchParams.get('gender') || undefined,
    smokingAllowed: searchParams.get('smoking') ? searchParams.get('smoking') === 'true' : undefined,
    petsAllowed: searchParams.get('pets') ? searchParams.get('pets') === 'true' : undefined,
    foodPreference: searchParams.get('food') || undefined,
  }
}
