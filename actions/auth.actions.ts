'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { ProfilesRepository } from '@/lib/repositories/profiles.repository'
import { 
  SignUpSchema, 
  SignInSchema, 
  ResetPasswordSchema, 
  UpdatePasswordSchema 
} from '@/lib/validators/schemas'
import { AuthActionResponse } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// ============================================
// SIGN UP WITH EMAIL
// ============================================

export async function signUpWithEmail(
  input: z.infer<typeof SignUpSchema>
): Promise<AuthActionResponse<{ user: any; needsVerification: boolean }>> {
  try {
    const data = SignUpSchema.parse(input)
    const supabase = await createClient()

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.full_name,
        },
        emailRedirectTo: `${SITE_URL}/auth/callback`,
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    // Create profile for new user if it doesn't exist
    if (authData.user) {
      const profilesRepo = new ProfilesRepository()
      const existingProfile = await profilesRepo.findByUserId(authData.user.id)

      if (!existingProfile) {
        await profilesRepo.create({
          user_id: authData.user.id,
          full_name: data.full_name,
          city: data.city || 'Bengaluru',
          locality: data.locality || null,
        })
      }
    }

    const needsVerification = !authData.session // Email confirmation enabled in Supabase

    return {
      success: true,
      data: {
        user: authData.user,
        needsVerification,
      },
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    return { success: false, error: error.message || 'Sign up failed' }
  }
}

// ============================================
// SIGN IN WITH EMAIL
// ============================================

export async function signInWithEmail(
  input: z.infer<typeof SignInSchema>
): Promise<AuthActionResponse<{ user: any }>> {
  try {
    const data = SignInSchema.parse(input)
    const supabase = await createClient()

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return {
      success: true,
      data: { user: authData.user },
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    return { success: false, error: error.message || 'Sign in failed' }
  }
}

// ============================================
// SIGN IN WITH GOOGLE
// ============================================

export async function signInWithGoogle(
  redirectTo?: string
): Promise<AuthActionResponse<{ url: string }>> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo || `${SITE_URL}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return {
      success: true,
      data: { url: data.url! },
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Google sign in failed' }
  }
}

// ============================================
// SIGN IN WITH FACEBOOK
// ============================================

export async function signInWithFacebook(
  redirectTo?: string
): Promise<AuthActionResponse<{ url: string }>> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: redirectTo || `${SITE_URL}/auth/callback`,
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return {
      success: true,
      data: { url: data.url! },
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Facebook sign in failed' }
  }
}

// ============================================
// SIGN OUT
// ============================================

export async function signOut(): Promise<AuthActionResponse> {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data: null }
  } catch (error: any) {
    return { success: false, error: error.message || 'Sign out failed' }
  }
}

// ============================================
// GET CURRENT SESSION
// ============================================

export async function getCurrentSession() {
  try {
    const supabase = await createClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data: { session } }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to get session' }
  }
}

// ============================================
// REQUEST PASSWORD RESET
// ============================================

export async function requestPasswordReset(
  input: z.infer<typeof ResetPasswordSchema>
): Promise<AuthActionResponse> {
  try {
    const data = ResetPasswordSchema.parse(input)
    const supabase = await createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${SITE_URL}/auth/reset-password`,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data: { message: 'Password reset email sent' } }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    return { success: false, error: error.message || 'Password reset request failed' }
  }
}

// ============================================
// UPDATE PASSWORD
// ============================================

export async function updatePassword(
  input: z.infer<typeof UpdatePasswordSchema>
): Promise<AuthActionResponse> {
  try {
    const data = UpdatePasswordSchema.parse(input)
    const supabase = await createClient()

    const { error } = await supabase.auth.updateUser({
      password: data.password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data: { message: 'Password updated successfully' } }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    return { success: false, error: error.message || 'Password update failed' }
  }
}
