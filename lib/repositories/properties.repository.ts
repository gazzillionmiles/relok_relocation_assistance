// lib/repositories/properties.repository.ts
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/types/database'
import { NotFoundError } from '@/lib/errors'

type Property = Database['public']['Tables']['properties']['Row']
type PropertyInsert = Database['public']['Tables']['properties']['Insert']
type PropertyUpdate = Database['public']['Tables']['properties']['Update']

export class PropertiesRepository {
  private async getClient() {
    return (await createClient()) as any
  }

  async findById(id: string): Promise<Property | null> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  async findActive(filters: any = {}, limit = 20, offset = 0) {
    const supabase = await this.getClient()
    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .eq('status', 'active')
      .range(offset, offset + limit - 1)

    if (filters.city) query = query.eq('city', filters.city)
    if (filters.min_rent) query = query.gte('monthly_rent', filters.min_rent)
    if (filters.max_rent) query = query.lte('monthly_rent', filters.max_rent)

    const { data, error, count } = await query
    if (error) throw error
    return { data, count }
  }

  async create(data: PropertyInsert): Promise<Property> {
    const supabase = await this.getClient()
    const { data: property, error } = await supabase
      .from('properties')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return property
  }

  async update(id: string, updates: PropertyUpdate, ownerId: string): Promise<Property> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .eq('owner_id', ownerId)
      .select()
      .single()

    if (error) throw error
    if (!data) throw new NotFoundError('Property not found or not owned by user')
    return data
  }

  async softDelete(id: string, ownerId: string) {
    const supabase = await this.getClient()
    const { error } = await supabase
      .from('properties')
      .update({ status: 'deleted', deleted_at: new Date().toISOString() })
      .eq('id', id)
      .eq('owner_id', ownerId)

    if (error) throw error
  }

  // ============================================
  // PROPERTY IMAGES (DB operations)
  // ============================================

  async getPropertyImages(propertyId: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('property_images')
      .select('*')
      .eq('property_id', propertyId)
      .order('display_order', { ascending: true })

    if (error) throw error
    return data || []
  }

  async addPropertyImage(propertyId: string, url: string, displayOrder: number, isPrimary = false) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('property_images')
      .insert({
        property_id: propertyId,
        url,
        display_order: displayOrder,
        is_primary: isPrimary,
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async deletePropertyImage(imageId: string, propertyId: string, ownerId: string) {
    // Verify ownership first
    const property = await this.findById(propertyId)
    if (!property || property.owner_id !== ownerId) {
      throw new Error('Unauthorized')
    }

    const supabase = await this.getClient()
    const { error } = await supabase
      .from('property_images')
      .delete()
      .eq('id', imageId)
      .eq('property_id', propertyId)

    if (error) throw error
  }

  async reorderPropertyImages(propertyId: string, imageOrders: { id: string; order: number }[], ownerId: string) {
    const property = await this.findById(propertyId)
    if (!property || property.owner_id !== ownerId) {
      throw new Error('Unauthorized')
    }

    const supabase = await this.getClient()

    // Use Promise.all for batch update
    await Promise.all(
      imageOrders.map(({ id, order }) =>
        supabase
          .from('property_images')
          .update({ display_order: order })
          .eq('id', id)
          .eq('property_id', propertyId)
      )
    )
  }

  async setPrimaryImage(propertyId: string, imageId: string, ownerId: string) {
    const property = await this.findById(propertyId)
    if (!property || property.owner_id !== ownerId) {
      throw new Error('Unauthorized')
    }

    const supabase = await this.getClient()

    // Set all to false first
    await supabase
      .from('property_images')
      .update({ is_primary: false })
      .eq('property_id', propertyId)

    // Set the selected one to true
    const { error } = await supabase
      .from('property_images')
      .update({ is_primary: true })
      .eq('id', imageId)
      .eq('property_id', propertyId)

    if (error) throw error
  }
}
