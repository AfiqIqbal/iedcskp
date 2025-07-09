import { createContext, useContext, useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { GalleryItem, GALLERY_CATEGORIES } from '@/types/gallery';

export type { GalleryItem };
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
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        eventDate: doc.data().eventDate?.toDate().toISOString()
      } as GalleryItem));
      setGalleryItems(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addGalleryItem = async (item: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = Date.now();
    await addDoc(collection(db, 'gallery'), {
      ...item,
      createdAt: now,
      updatedAt: now,
    });
  };

  const updateGalleryItem = async (id: string, updates: Partial<GalleryItem>) => {
    await updateDoc(doc(db, 'gallery', id), {
      ...updates,
      updatedAt: Date.now(),
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
