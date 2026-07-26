// lib/auth.ts
import { createClient } from '@/lib/supabase/server'
import { UnauthorizedError, ForbiddenError } from '@/lib/errors'

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    throw new UnauthorizedError('Not authenticated')
  }
  
  return user
}

export async function requireAuth() {
  return await getCurrentUser()
}

export async function requireAdmin() {
  const user = await getCurrentUser()
  const supabase = (await createClient()) as any
  
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (profile?.role !== 'admin') {
    throw new ForbiddenError('Admin access required')
  }
  
  return user
}

export async function getProfile(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (error) throw new Error('Failed to fetch profile')
  return data
}

export async function canAccessConversation(userId: string, conversationId: string): Promise<boolean> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('conversation_participants')
    .select('id')
    .eq('conversation_id', conversationId)
    .eq('user_id', userId)
    .single()
  
  return !!data
}
