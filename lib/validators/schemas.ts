// lib/validators/schemas.ts
import { z } from 'zod'

// Common enums matching DATABASE_SCHEMA_DESIGN_V2.md
export const UserRoleSchema = z.enum(['tenant', 'owner', 'admin'])
export const PropertyStatusSchema = z.enum(['active', 'paused', 'deleted'])
export const PropertyTypeSchema = z.enum(['PG', 'Hostel', 'Apartment', 'Independent Room', 'Co-Living'])
export const FurnishedStatusSchema = z.enum(['Full', 'Semi', 'Unfurnished'])
export const GenderPreferenceSchema = z.enum(['Any', 'Male', 'Female'])
export const FoodPreferenceSchema = z.enum(['Veg', 'Non-Veg', 'Both'])
export const SmokingPreferenceSchema = z.enum(['Allowed', 'Not Allowed', 'Occasional'])
export const ReportReasonSchema = z.enum(['Spam', 'Fake Listing', 'Inappropriate Content', 'Scam', 'Harassment', 'Other'])
export const ReportStatusSchema = z.enum(['open', 'in_review', 'resolved', 'rejected'])
export const InquiryStatusSchema = z.enum(['new', 'contacted', 'closed'])

// Profile
export const ProfileSchema = z.object({
  full_name: z.string().min(1).max(100),
  bio: z.string().max(500).optional(),
  avatar_url: z.string().url().optional(),
  phone: z.string().max(20).optional(),
  date_of_birth: z.string().date().optional(),
  gender: GenderPreferenceSchema.optional(),
  occupation: z.string().max(100).optional(),
  city: z.string().min(1).max(100),
  locality: z.string().max(100).optional(),
})

export const ProfileUpdateSchema = ProfileSchema.partial()

// User Preferences
export const UserPreferencesSchema = z.object({
  budget_min: z.number().int().min(0).optional(),
  budget_max: z.number().int().min(0).optional(),
  move_in_date: z.string().date().optional(),
  food_preference: FoodPreferenceSchema.optional(),
  smoking_preference: SmokingPreferenceSchema.optional(),
  pets_allowed: z.boolean().optional(),
  cleanliness_level: z.number().int().min(1).max(5).optional(),
  noise_tolerance: z.number().int().min(1).max(5).optional(),
  guest_policy: z.string().max(200).optional(),
  age_range_min: z.number().int().min(18).optional(),
  age_range_max: z.number().int().max(100).optional(),
  gender_preference: GenderPreferenceSchema.optional(),
})

// House Rules
export const HouseRulesSchema = z.object({
  quiet_hours_start: z.string().optional(),
  quiet_hours_end: z.string().optional(),
  visitors_allowed: z.boolean().optional(),
  overnight_guests: z.boolean().optional(),
  chores: z.string().max(300).optional(),
  additional_rules: z.record(z.string(), z.any()).optional(),
})

// Property
export const PropertySchema = z.object({
  title: z.string().min(5).max(150),
  description: z.string().min(20).max(2000),
  monthly_rent: z.number().int().positive(),
  security_deposit: z.number().int().min(0),
  maintenance_fee: z.number().int().min(0).optional(),
  property_type: PropertyTypeSchema,
  address: z.string().min(5).max(300),
  locality: z.string().max(100).optional(),
  city: z.string().min(1).max(100),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  balcony: z.boolean().default(false),
  parking: z.boolean().default(false),
  furnished: FurnishedStatusSchema,
  size_sqft: z.number().int().positive().optional(),
  available_from: z.string().date(),
  gender_preference: GenderPreferenceSchema,
  smoking_allowed: z.boolean().default(false),
  pets_allowed: z.boolean().default(false),
  food_preference: FoodPreferenceSchema,
})

export const PropertyUpdateSchema = PropertySchema.partial()

// Inquiry
export const InquirySchema = z.object({
  property_id: z.string().uuid(),
  message: z.string().min(10).max(1000),
  contact_phone: z.string().max(20).optional(),
})

// Message
export const MessageSchema = z.object({
  conversation_id: z.string().uuid(),
  content: z.string().min(1).max(2000),
})

// Report
export const ReportSchema = z.object({
  target_type: z.enum(['listing', 'user']),
  target_id: z.string().uuid(),
  reason: ReportReasonSchema,
  description: z.string().max(1000).optional(),
})

// Saved Search
export const SavedSearchSchema = z.object({
  name: z.string().max(100).optional(),
  filters_json: z.record(z.string(), z.any()),
  notify_on_new: z.boolean().default(false),
})

// Favorites
export const FavoriteSchema = z.object({
  property_id: z.string().uuid(),
})

// House Rules for Property
export const PropertyHouseRulesSchema = HouseRulesSchema.extend({
  property_id: z.string().uuid(),
})

export type ProfileFormData = z.infer<typeof ProfileSchema>
export type PropertyFormData = z.infer<typeof PropertySchema>
export type InquiryFormData = z.infer<typeof InquirySchema>
export type MessageFormData = z.infer<typeof MessageSchema>
export type ReportFormData = z.infer<typeof ReportSchema>
export type SavedSearchFormData = z.infer<typeof SavedSearchSchema>
export type UserPreferencesFormData = z.infer<typeof UserPreferencesSchema>
export type HouseRulesFormData = z.infer<typeof HouseRulesSchema>

// ============================================
// ZOD SCHEMAS FOR AUTH
// ============================================

const EmailSchema = z.string().email('Invalid email address')
const PasswordSchema = z.string().min(8, 'Password must be at least 8 characters')

export const SignUpSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  full_name: z.string().min(1, 'Full name is required').max(100),
  city: z.string().min(1).max(100).optional(),
  locality: z.string().max(100).optional(),
})

export const SignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
})

export const ResetPasswordSchema = z.object({
  email: EmailSchema,
})

export const UpdatePasswordSchema = z.object({
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})
