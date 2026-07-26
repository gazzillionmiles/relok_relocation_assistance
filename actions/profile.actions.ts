'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { ProfilesRepository } from '@/lib/repositories/profiles.repository'
import { requireAuth } from '@/lib/auth'
import { 
  ProfileUpdateSchema, 
  UserPreferencesSchema, 
  HouseRulesSchema 
} from '@/lib/validators/schemas'
import { STORAGE_BUCKETS } from '@/lib/constants'
import { ProfileActionResponse } from '@/types'

// ============================================
// GET PROFILE (current user + preferences + house rules)
// ============================================

export async function getProfile() {
  try {
    const user = await requireAuth()
    const repo = new ProfilesRepository()

    const profile = await repo.findByUserId(user.id)
    if (!profile) {
      return { success: false, error: 'Profile not found' }
    }

    const preferences = await repo.getPreferences(profile.id)
    const houseRules = await repo.getHouseRules(profile.id)

    return {
      success: true,
      data: {
        profile,
        preferences,
        houseRules,
      },
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to fetch profile' }
  }
}

// ============================================
// UPDATE PROFILE
// ============================================

export async function updateProfile(
  input: z.infer<typeof ProfileUpdateSchema>
): Promise<ProfileActionResponse> {
  try {
    const user = await requireAuth()
    const data = ProfileUpdateSchema.parse(input)

    const repo = new ProfilesRepository()
    await repo.update(user.id, data)

    revalidatePath('/profile')
    revalidatePath('/(app)/profile')

    return { success: true, data: null }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    return { success: false, error: error.message || 'Failed to update profile' }
  }
}

// ============================================
// UPDATE PREFERENCES
// ============================================

export async function updatePreferences(
  input: z.infer<typeof UserPreferencesSchema>
): Promise<ProfileActionResponse> {
  try {
    const user = await requireAuth()
    const data = UserPreferencesSchema.parse(input)

    const repo = new ProfilesRepository()
    const profile = await repo.findByUserId(user.id)
    if (!profile) throw new Error('Profile not found')

    await repo.upsertPreferences(profile.id, data)

    revalidatePath('/profile')
    revalidatePath('/(app)/profile')

    return { success: true, data: null }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    return { success: false, error: error.message || 'Failed to update preferences' }
  }
}

// ============================================
// UPDATE HOUSE RULES
// ============================================

export async function updateHouseRules(
  input: z.infer<typeof HouseRulesSchema>
): Promise<ProfileActionResponse> {
  try {
    const user = await requireAuth()
    const data = HouseRulesSchema.parse(input)

    const repo = new ProfilesRepository()
    const profile = await repo.findByUserId(user.id)
    if (!profile) throw new Error('Profile not found')

    await repo.upsertHouseRules(profile.id, data)

    revalidatePath('/profile')
    revalidatePath('/(app)/profile')

    return { success: true, data: null }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    return { success: false, error: error.message || 'Failed to update house rules' }
  }
}

// ============================================
// UPLOAD AVATAR
// ============================================

export async function uploadAvatar(
  file: File
): Promise<ProfileActionResponse<{ avatarUrl: string }>> {
  try {
    const user = await requireAuth()
    const repo = new ProfilesRepository()

    const supabase = await createClient()

    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' }
    }

    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: 'File size must be less than 5MB' }
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/avatar.${fileExt}`

    // Upload to avatars bucket
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKETS.AVATARS)
      .upload(fileName, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKETS.AVATARS)
      .getPublicUrl(fileName)

    const avatarUrl = urlData.publicUrl

    // Update profile with new avatar URL
    await repo.update(user.id, { avatar_url: avatarUrl })

    revalidatePath('/profile')
    revalidatePath('/(app)/profile')

    return { success: true, data: { avatarUrl } }
  } catch (error: any) {
    return { success: false, error: error.message || 'Avatar upload failed' }
  }
}

// ============================================
// SEARCH ROOMMATES (public)
// ============================================

export async function searchRoommates(filters: any = {}) {
  try {
    const repo = new ProfilesRepository()
    const result = await repo.findAllActiveProfiles(filters)
    return { success: true, data: result }
  } catch (error: any) {
    return { success: false, error: error.message || 'Roommate search failed' }
  }
}

// ============================================
// ADMIN REPORT MODERATION
// ============================================

export async function getAllReports() {
  try {
    const supabase = (await createClient()) as any
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { success: true, data: data || [] }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to fetch reports' }
  }
}

export async function updateReportStatus(id: string, status: string) {
  try {
    const supabase = (await createClient()) as any
    const { data, error } = await supabase
      .from('reports')
      .update({ 
        status: status as any, 
        resolved_at: (status === 'resolved' || status === 'rejected') ? new Date().toISOString() : null 
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update report status' }
  }
}
