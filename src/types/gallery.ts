export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  order?: number;
}

export interface GalleryItem {
  id?: string;
  title: string;
  description: string;
  images: GalleryImage[];
  eventDate: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
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
