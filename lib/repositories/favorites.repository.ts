// lib/repositories/favorites.repository.ts
import { createClient } from '@/lib/supabase/server'

type FavoriteInsert = any

export class FavoritesRepository {
  private async getClient() {
    return (await createClient()) as any
  }

  async getUserFavorites(userId: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('favorites')
      .select('*, properties(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async addFavorite(data: FavoriteInsert) {
    const supabase = await this.getClient()
    const { data: favorite, error } = await supabase
      .from('favorites')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return favorite
  }

  async removeFavorite(userId: string, propertyId: string) {
    const supabase = await this.getClient()
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('property_id', propertyId)

    if (error) throw error
  }

  async isFavorited(userId: string, propertyId: string): Promise<boolean> {
    const supabase = await this.getClient()
    const { data } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('property_id', propertyId)
      .single()

    return !!data
  }
}
