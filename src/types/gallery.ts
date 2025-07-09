export interface GalleryItem {
  id?: string;
  imageUrl: string;
  title: string;
  description: string;
  eventDate: string;
  category: string;
  createdAt: number;
  updatedAt: number;
}

export const GALLERY_CATEGORIES = [
  'Workshop',
  'Hackathon',
  'Seminar',
  'Competition',
  'Meetup',
  'Other'
] as const;

export type GalleryCategory = typeof GALLERY_CATEGORIES[number];
