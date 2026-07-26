// lib/repositories/profiles.repository.ts
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/types/database'
import { NotFoundError } from '@/lib/errors'

type Profile = Database['public']['Tables']['profiles']['Row']
type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export class ProfilesRepository {
  private async getClient() {
    return (await createClient()) as any
  }

  async findByUserId(userId: string): Promise<Profile | null> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  async create(data: ProfileInsert): Promise<Profile> {
    const supabase = await this.getClient()
    const { data: profile, error } = await supabase
      .from('profiles')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return profile
  }

  async update(userId: string, updates: ProfileUpdate): Promise<Profile> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    if (!data) throw new NotFoundError('Profile not found')
    return data
  }

  // ============================================
  // USER PREFERENCES (1:1 with profile)
  // ============================================

  async getPreferences(profileId: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('profile_id', profileId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  async upsertPreferences(profileId: string, data: any) {
    const supabase = await this.getClient()
    const { data: pref, error } = await supabase
      .from('user_preferences')
      .upsert({ profile_id: profileId, ...data })
      .select()
      .single()

    if (error) throw error
    return pref
  }

  // ============================================
  // HOUSE RULES (linked to profile for tenant)
  // ============================================

  async getHouseRules(profileId: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('house_rules')
      .select('*')
      .eq('profile_id', profileId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  async upsertHouseRules(profileId: string, data: any) {
    const supabase = await this.getClient()
    const { data: rules, error } = await supabase
      .from('house_rules')
      .upsert({ profile_id: profileId, ...data })
      .select()
      .single()

    if (error) throw error
    return rules
  }

  async findAllActiveProfiles(filters: any = {}): Promise<any[]> {
    const supabase = await this.getClient()
    let query = supabase
      .from('profiles')
      .select('*, user_preferences(*), house_rules(*)')
    
    if (filters.city) {
      query = query.eq('city', filters.city)
    }
    if (filters.gender && filters.gender !== 'Any') {
      query = query.eq('gender', filters.gender)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data || []
  }
}
