// lib/constants.ts
export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  PROPERTY_IMAGES: 'property-images',
} as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const

export const SEARCH_DEFAULTS = {
  MIN_RENT: 0,
  MAX_RENT: 500000,
} as const

export const PROPERTY_DEFAULTS = {
  STATUS: 'active',
  FURNISHED: 'Semi',
} as const

export const LIMITS = {
  MAX_PROPERTY_IMAGES: 12,
  MAX_AVATAR_SIZE_MB: 5,
  MAX_PROPERTY_IMAGE_SIZE_MB: 10,
} as const
