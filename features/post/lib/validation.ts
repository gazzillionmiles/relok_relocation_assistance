export interface PostingFormData {
  listingType: 'Room' | '1BHK' | '2BHK' | 'Shared Room';
  title: string;
  monthlyRent: number | '';
  securityDeposit: number | '';
  availableFrom: string;
  stayDuration: string;
  description: string;
  amenities: string[];
  houseRules: string[];
  lifestylePrefs: string[];
  preferredGender: 'Male' | 'Female' | 'Any';
  preferredAgeMin: number;
  preferredAgeMax: number;
  address: string;
  landmark: string;
  mapCenter: { lat: number; lng: number };
  pinAccuracy: 'Exact' | 'Near Exact' | 'Approximate';
  photos: string[];
}

export function validateStep1(data: Partial<PostingFormData>): boolean {
  return (
    typeof data.monthlyRent === 'number' &&
    data.monthlyRent > 0 &&
    typeof data.securityDeposit === 'number' &&
    data.securityDeposit >= 0 &&
    !!data.availableFrom &&
    !!data.stayDuration
  );
}

export function validateStep2(data: Partial<PostingFormData>): boolean {
  return (
    !!data.amenities &&
    data.amenities.length > 0
  );
}

export function validateStep3(data: Partial<PostingFormData>): boolean {
  return (
    !!data.preferredGender &&
    typeof data.preferredAgeMin === 'number' &&
    typeof data.preferredAgeMax === 'number' &&
    data.preferredAgeMax >= data.preferredAgeMin
  );
}

export function validateStep4(data: Partial<PostingFormData>): boolean {
  return !!data.address && data.address.trim().length > 3;
}

export function validateStep5(data: Partial<PostingFormData>): boolean {
  return !!data.photos && data.photos.length > 0;
}

/**
 * Auto-generates property title if left blank.
 */
export function getEffectiveTitle(data: Partial<PostingFormData>): string {
  if (data.title && data.title.trim()) return data.title.trim();
  const typeLabel =
    data.listingType === '1BHK'
      ? '1 BHK Flat'
      : data.listingType === '2BHK'
      ? '2 BHK Flat'
      : data.listingType === 'Shared Room'
      ? 'Shared Room'
      : 'Single Room';

  const locality = data.address ? data.address.split(',')[0].trim() : 'Locality';
  return `${typeLabel} in ${locality}`;
}

/**
 * Auto-generates property description if left blank.
 */
export function getEffectiveDescription(data: Partial<PostingFormData>): string {
  if (data.description && data.description.trim()) return data.description.trim();
  const typeLabel =
    data.listingType === '1BHK'
      ? '1 BHK Flat'
      : data.listingType === '2BHK'
      ? '2 BHK Flat'
      : data.listingType === 'Shared Room'
      ? 'Shared Room'
      : 'Single Room';

  const date = data.availableFrom || 'Immediate';
  const amenities = data.amenities?.join(', ') || 'Wi-Fi, Kitchen, AC';
  return `Fully furnished ${typeLabel} available from ${date}. Key amenities include: ${amenities}.`;
}
