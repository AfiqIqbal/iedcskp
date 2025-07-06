import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { collection, doc, setDoc, getDocs, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Winner as WinnerType, WinnerInput } from '@/types/winners';

// Re-export the Winner type for use in other components
export type Winner = WinnerType;

type WinnerContextType = {
  winners: Winner[];
  loading: boolean;
  error: string | null;
  addWinner: (winner: WinnerInput) => Promise<void>;
  updateWinner: (id: string, winner: Partial<Winner>) => Promise<void>;
  deleteWinner: (id: string) => Promise<void>;
  getWinnersByEvent: (eventId: string) => Winner | undefined;
};

const WinnerContext = createContext<WinnerContextType | undefined>(undefined);

export const WinnerProvider = ({ children }: { children: ReactNode }) => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch winners from Firestore
  const fetchWinners = useCallback(async () => {
    try {
      setLoading(true);
      const winnersRef = collection(db, 'winners');
      const q = query(winnersRef, orderBy('eventDate', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const winnersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Winner[];
      
      setWinners(winnersData);
      setError(null);
    } catch (err) {
      console.error('Error fetching winners:', err);
      setError('Failed to load winners. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchWinners();
  }, [fetchWinners]);

  // Add a new winner entry
  const addWinner = async (winner: WinnerInput) => {
    try {
      setLoading(true);
      const winnersRef = collection(db, 'winners');
      const docRef = doc(winnersRef);
      
      const newWinner = {
        ...winner,
        createdAt: new Date(),
      };
      
      await setDoc(docRef, newWinner);
      await fetchWinners(); // Refresh the winners list
    } catch (err) {
      console.error('Error adding winner:', err);
      throw new Error('Failed to add winner');
    } finally {
      setLoading(false);
    }
  };

  // Update an existing winner entry
  const updateWinner = async (id: string, winnerData: Partial<Winner>) => {
    try {
      setLoading(true);
      const winnerRef = doc(db, 'winners', id);
      await updateDoc(winnerRef, {
        ...winnerData,
        updatedAt: new Date(),
      });
      await fetchWinners(); // Refresh the winners list
    } catch (err) {
      console.error('Error updating winner:', err);
      throw new Error('Failed to update winner');
    } finally {
      setLoading(false);
    }
  };

  // Delete a winner entry
  const deleteWinner = async (id: string) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'winners', id));
      await fetchWinners(); // Refresh the winners list
    } catch (err) {
      console.error('Error deleting winner:', err);
      throw new Error('Failed to delete winner');
    } finally {
      setLoading(false);
    }
  };

  // Get winners by event ID
  const getWinnersByEvent = (eventId: string) => {
    return winners.find(winner => winner.eventId === eventId);
  };

  return (
    <WinnerContext.Provider value={{ 
      winners, 
      loading, 
      error,
      addWinner, 
      updateWinner, 
      deleteWinner,
      getWinnersByEvent,
    }}>
      {children}
    </WinnerContext.Provider>
  );
};

export const useWinners = (): WinnerContextType => {
  const context = useContext(WinnerContext);
  if (context === undefined) {
    throw new Error('useWinners must be used within a WinnerProvider');
  }
  return context;
};
