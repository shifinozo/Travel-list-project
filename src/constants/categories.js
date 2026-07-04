export const CATEGORIES = [
  { value: 'beach', label: 'Beach', icon: '🏖' },
  { value: 'mountain', label: 'Mountain', icon: '🏔' },
  { value: 'city', label: 'City', icon: '🏙' },
  { value: 'heritage', label: 'Heritage', icon: '🏰' },
  { value: 'nature', label: 'Nature', icon: '🌳' },
  { value: 'food', label: 'Food', icon: '🍜' },
  { value: 'other', label: 'Other', icon: '📍' },
]

export const getCategory = (value) =>
  CATEGORIES.find((c) => c.value === value) || CATEGORIES[CATEGORIES.length - 1]
