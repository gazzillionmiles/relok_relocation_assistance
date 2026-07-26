// lib/utils/images.ts
import { STORAGE_BUCKETS } from '@/lib/constants'

export function getAvatarUrl(userId: string, filename: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKETS.AVATARS}/${userId}/${filename}`
}

export function getPropertyImageUrl(propertyId: string, filename: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKETS.PROPERTY_IMAGES}/${propertyId}/${filename}`
}

export function getPropertyImagePath(propertyId: string, order: number, ext: string): string {
  return `${propertyId}/${order}.${ext}`
}

export function getAvatarPath(userId: string, ext: string): string {
  return `${userId}/avatar.${ext}`
}
