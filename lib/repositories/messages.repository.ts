// lib/repositories/messages.repository.ts
import { createClient } from '@/lib/supabase/server'

type MessageInsert = any

export class MessagesRepository {
  private async getClient() {
    return (await createClient()) as any
  }

  async getConversationMessages(conversationId: string, limit = 50) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .limit(limit)

    if (error) throw error
    return data
  }

  async sendMessage(data: MessageInsert) {
    const supabase = await this.getClient()
    const { data: message, error } = await supabase
      .from('messages')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return message
  }

  async markAsRead(conversationId: string, userId: string) {
    const supabase = await this.getClient()
    const { error } = await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .neq('sender_id', userId)
      .is('read_at', null)

    if (error) throw error
  }
}
