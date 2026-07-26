// lib/constants/lookups.ts
// Static lookup data (to be moved to database in future)

export const INDIAN_CITIES = [
  'Bengaluru', 'Delhi', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai',
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
] as const;

export const OCCUPATIONS = [
  'Student', 'Software Engineer', 'Designer', 'Doctor', 'Teacher',
  'Business Owner', 'Freelancer', 'Marketing', 'Finance', 'Other',
] as const;

export const PROPERTY_TYPES = [
  'PG', 'Hostel', 'Apartment', 'Independent Room', 'Co-Living',
] as const;

export const AMENITIES = [
  'WiFi', 'AC', 'Washing Machine', 'Fridge', 'Microwave',
  'Geyser', 'TV', 'Sofa', 'Dining Table', 'Wardrobe',
  'Study Table', 'Gym', 'Swimming Pool', 'Parking', 'Balcony',
] as const;

export const FOOD_PREFERENCES = ['Veg', 'Non-Veg', 'Both'] as const;
export const GENDER_PREFERENCES = ['Any', 'Male', 'Female'] as const;
export const FURNISHED_OPTIONS = ['Full', 'Semi', 'Unfurnished'] as const;
