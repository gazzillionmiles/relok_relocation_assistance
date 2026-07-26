// lib/types/database.ts
// Auto-generated style types matching DATABASE_SCHEMA_DESIGN_V2.md
// Tables: users, profiles, user_preferences, house_rules, properties, property_images,
// amenities, property_amenities, favorites, saved_searches, conversations,
// conversation_participants, messages, reports, blocks, inquiries

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'tenant' | 'owner' | 'admin'
          is_active: boolean
          created_at: string
          updated_at: string
          last_login: string | null
        }
        Insert: {
          id: string
          email: string
          role?: 'tenant' | 'owner' | 'admin'
          is_active?: boolean
          last_login?: string | null
        }
        Update: {
          email?: string
          role?: 'tenant' | 'owner' | 'admin'
          is_active?: boolean
          last_login?: string | null
        }
      }
      profiles: {
        Row: any
        Insert: any
        Update: any
      }
      user_preferences: {
        Row: any
        Insert: any
        Update: any
      }
      house_rules: {
        Row: any
        Insert: any
        Update: any
      }
      properties: {
        Row: any
        Insert: any
        Update: any
      }
      property_images: {
        Row: any
        Insert: any
        Update: any
      }
      amenities: {
        Row: any
        Insert: any
        Update: any
      }
      property_amenities: {
        Row: any
        Insert: any
        Update: any
      }
      favorites: {
        Row: any
        Insert: any
        Update: any
      }
      saved_searches: {
        Row: any
        Insert: any
        Update: any
      }
      conversations: {
        Row: any
        Insert: any
        Update: any
      }
      conversation_participants: {
        Row: any
        Insert: any
        Update: any
      }
      messages: {
        Row: any
        Insert: any
        Update: any
      }
      reports: {
        Row: any
        Insert: any
        Update: any
      }
      blocks: {
        Row: any
        Insert: any
        Update: any
      }
      inquiries: {
        Row: any
        Insert: any
        Update: any
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
