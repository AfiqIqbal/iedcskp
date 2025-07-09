import { createContext, useContext, useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { GalleryItem, GALLERY_CATEGORIES, GalleryImage } from '@/types/gallery';

export type { GalleryItem, GalleryImage };
export { GALLERY_CATEGORIES };

interface GalleryContextType {
  galleryItems: GalleryItem[];
  loading: boolean;
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateGalleryItem: (id: string, updates: Partial<GalleryItem>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
}

const GalleryContext = createContext<GalleryContextType | null>(null);

export const GalleryProvider = ({ children }: { children: React.ReactNode }) => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('eventDate', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => {
      const data = doc.data();
      // Handle both Firestore Timestamp and string dates
      const eventDate = data.eventDate?.toDate 
        ? data.eventDate.toDate().toISOString() 
        : data.eventDate;
        
      return {
        id: doc.id,
        ...data,
        eventDate: eventDate || new Date().toISOString(), // Fallback to current date if not set
        createdAt: data.createdAt || Date.now(),
        updatedAt: data.updatedAt || Date.now()
      } as GalleryItem;
    });
      setGalleryItems(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addGalleryItem = async (item: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const galleryItem = {
      ...item,
      // Ensure we have at least one image
      images: item.images?.length ? item.images : [{ url: '', caption: '' }],
      eventDate: item.eventDate || now,
      createdAt: now,
      updatedAt: now,
    };
    await addDoc(collection(db, 'gallery'), galleryItem);
  };

  const updateGalleryItem = async (id: string, updates: Partial<GalleryItem>) => {
    const now = new Date().toISOString();
    await updateDoc(doc(db, 'gallery', id), {
      ...updates,
      updatedAt: now,
    });
  };

  const deleteGalleryItem = async (id: string) => {
    await deleteDoc(doc(db, 'gallery', id));
  };

  return (
    <GalleryContext.Provider value={{ galleryItems, loading, addGalleryItem, updateGalleryItem, deleteGalleryItem }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};
