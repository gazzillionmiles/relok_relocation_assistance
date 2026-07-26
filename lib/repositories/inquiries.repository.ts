// lib/repositories/inquiries.repository.ts
import { createClient } from '@/lib/supabase/server'

type InquiryInsert = any

export class InquiriesRepository {
  private async getClient() {
    return (await createClient()) as any
  }

  async getInquiriesForProperty(propertyId: string, _ownerId: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .eq('property_id', propertyId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async createInquiry(data: InquiryInsert) {
    const supabase = await this.getClient()
    const { data: inquiry, error } = await supabase
      .from('inquiries')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return inquiry
  }
}
