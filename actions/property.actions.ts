'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { PropertiesRepository } from '@/lib/repositories/properties.repository'
import { FavoritesRepository } from '@/lib/repositories/favorites.repository'
import { requireAuth } from '@/lib/auth'
import { 
  PropertySchema, 
  PropertyUpdateSchema 
} from '@/lib/validators/schemas'
import { UnauthorizedError } from '@/lib/errors'
import { STORAGE_BUCKETS } from '@/lib/constants'
import { PropertyActionResponse } from '@/types'

// ============================================
// CREATE PROPERTY
// ============================================

export async function createProperty(
  input: z.infer<typeof PropertySchema>
): Promise<PropertyActionResponse<{ id: string }>> {
  try {
    const user = await requireAuth()
    const data = PropertySchema.parse(input)
    
    const repo = new PropertiesRepository()
    
    const property = await repo.create({
      owner_id: user.id,
      title: data.title,
      description: data.description,
      monthly_rent: data.monthly_rent,
      security_deposit: data.security_deposit,
      maintenance_fee: data.maintenance_fee ?? null,
      property_type: data.property_type,
      address: data.address,
      locality: data.locality ?? null,
      city: data.city,
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      balcony: data.balcony,
      parking: data.parking,
      furnished: data.furnished,
      size_sqft: data.size_sqft ?? null,
      available_from: data.available_from,
      gender_preference: data.gender_preference,
      smoking_allowed: data.smoking_allowed,
      pets_allowed: data.pets_allowed,
      food_preference: data.food_preference,
      status: 'active',
    })

    revalidatePath('/properties')
    revalidatePath('/(app)/home')

    return { success: true, data: { id: property.id } }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    if (error instanceof UnauthorizedError) {
      return { success: false, error: 'Unauthorized' }
    }
    return { success: false, error: error.message || 'Failed to create property' }
  }
}

// ============================================
// UPDATE PROPERTY
// ============================================

export async function updateProperty(
  id: string,
  input: z.infer<typeof PropertyUpdateSchema>
): Promise<PropertyActionResponse> {
  try {
    const user = await requireAuth()
    const data = PropertyUpdateSchema.parse(input)
    
    const repo = new PropertiesRepository()
    
    await repo.update(id, data as any, user.id)

    revalidatePath(`/properties/${id}`)
    revalidatePath('/properties')
    revalidatePath('/(app)/home')

    return { success: true, data: null }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    return { success: false, error: error.message || 'Failed to update property' }
  }
}

// ============================================
// SOFT DELETE PROPERTY
// ============================================

export async function deleteProperty(id: string): Promise<PropertyActionResponse> {
  try {
    const user = await requireAuth()
    const repo = new PropertiesRepository()
    
    await repo.softDelete(id, user.id)

    revalidatePath('/properties')
    revalidatePath('/(app)/home')

    return { success: true, data: null }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete property' }
  }
}

// ============================================
// GET PROPERTY BY ID
// ============================================

export async function getPropertyById(id: string) {
  try {
    const repo = new PropertiesRepository()
    const property = await repo.findById(id)
    
    if (!property) {
      return { success: false, error: 'Property not found' }
    }
    
    // Optionally fetch images
    const images = await repo.getPropertyImages(id)
    
    return { 
      success: true, 
      data: { 
        ...property, 
        images 
      } 
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to fetch property' }
  }
}

// ============================================
// GET MY PROPERTIES
// ============================================

export async function getMyProperties(status?: 'active' | 'paused' | 'deleted') {
  try {
    const user = await requireAuth()
    const supabase = await createClient()
    
    let query = supabase
      .from('properties')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false })
    
    if (status) {
      query = query.eq('status', status)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    
    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to fetch properties' }
  }
}

// ============================================
// SEARCH PROPERTIES (public)
// ============================================

export async function searchProperties(filters: any = {}, page = 1, limit = 20) {
  try {
    const repo = new PropertiesRepository()
    const offset = (page - 1) * limit
    
    const result = await repo.findActive(filters, limit, offset)
    
    return { 
      success: true, 
      data: result.data,
      total: result.count 
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Search failed' }
  }
}

// ============================================
// TOGGLE PROPERTY STATUS (active <-> paused)
// ============================================

export async function togglePropertyStatus(id: string): Promise<PropertyActionResponse> {
  try {
    const user = await requireAuth()
    const repo = new PropertiesRepository()
    
    const property = await repo.findById(id)
    if (!property || property.owner_id !== user.id) {
      throw new UnauthorizedError()
    }
    
    const newStatus = property.status === 'active' ? 'paused' : 'active'
    
    await repo.update(id, { status: newStatus as any }, user.id)
    
    revalidatePath(`/properties/${id}`)
    revalidatePath('/properties')
    
    return { success: true, data: { status: newStatus } }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to toggle status' }
  }
}

// ============================================
// UPLOAD PROPERTY IMAGES
// ============================================

export async function uploadPropertyImages(
  propertyId: string, 
  files: File[]
): Promise<PropertyActionResponse<{ urls: string[] }>> {
  try {
    const user = await requireAuth()
    const repo = new PropertiesRepository()
    
    // Verify ownership
    const property = await repo.findById(propertyId)
    if (!property || property.owner_id !== user.id) {
      throw new UnauthorizedError()
    }
    
    const supabase = await createClient()
    const uploadedUrls: string[] = []
    
    // Get current max order
    const existingImages = await repo.getPropertyImages(propertyId)
    let nextOrder = existingImages.length
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${propertyId}/${Date.now()}-${nextOrder}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKETS.PROPERTY_IMAGES)
        .upload(fileName, file, { upsert: true })
      
      if (uploadError) throw uploadError
      
      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKETS.PROPERTY_IMAGES)
        .getPublicUrl(fileName)
      
      const imageUrl = urlData.publicUrl
      
      // Save to DB
      await repo.addPropertyImage(propertyId, imageUrl, nextOrder)
      
      uploadedUrls.push(imageUrl)
      nextOrder++
    }
    
    revalidatePath(`/properties/${propertyId}`)
    
    return { success: true, data: { urls: uploadedUrls } }
  } catch (error: any) {
    return { success: false, error: error.message || 'Image upload failed' }
  }
}

// ============================================
// DELETE PROPERTY IMAGE
// ============================================

export async function deletePropertyImage(imageId: string, propertyId: string): Promise<PropertyActionResponse> {
  try {
    const user = await requireAuth()
    const repo = new PropertiesRepository()
    
    await repo.deletePropertyImage(imageId, propertyId, user.id)
    
    revalidatePath(`/properties/${propertyId}`)
    
    return { success: true, data: null }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete image' }
  }
}

// ============================================
// REORDER PROPERTY IMAGES
// ============================================

export async function reorderPropertyImages(
  propertyId: string, 
  imageOrders: { id: string; order: number }[]
): Promise<PropertyActionResponse> {
  try {
    const user = await requireAuth()
    const repo = new PropertiesRepository()
    
    await repo.reorderPropertyImages(propertyId, imageOrders, user.id)
    
    revalidatePath(`/properties/${propertyId}`)
    
    return { success: true, data: null }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to reorder images' }
  }
}

// ============================================
// FAVORITES (BOOKMARKS)
// ============================================

export async function addPropertyToFavorites(propertyId: string): Promise<PropertyActionResponse> {
  try {
    const user = await requireAuth()
    const repo = new FavoritesRepository()
    await repo.addFavorite({
      user_id: user.id,
      property_id: propertyId,
    })
    revalidatePath('/(app)/home')
    return { success: true, data: null }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to add favorite' }
  }
}

export async function removePropertyFromFavorites(propertyId: string): Promise<PropertyActionResponse> {
  try {
    const user = await requireAuth()
    const repo = new FavoritesRepository()
    await repo.removeFavorite(user.id, propertyId)
    revalidatePath('/(app)/home')
    return { success: true, data: null }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to remove favorite' }
  }
}

export async function isPropertyFavorited(propertyId: string): Promise<boolean> {
  try {
    const user = await requireAuth()
    const repo = new FavoritesRepository()
    return await repo.isFavorited(user.id, propertyId)
  } catch {
    return false
  }
}
