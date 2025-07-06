import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { collection, doc, setDoc, getDocs, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type Event = {
  id?: string;
  title: string;
  date: string;
  location: string;
  attendees: string;
  time: string;
  description: string;
  poster: string;
  registrationLink?: string;
  createdAt?: Date;
};

type EventContextType = {
  events: Event[];
  loading: boolean;
  error: string | null;
  addEvent: (event: Omit<Event, 'id' | 'createdAt'>) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events from Firestore
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const eventsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[];
      
      setEvents(eventsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Add a new event
  const addEvent = async (event: Omit<Event, 'id' | 'createdAt'>) => {
    try {
      setLoading(true);
      const eventsRef = collection(db, 'events');
      const docRef = doc(eventsRef);
      
      const newEvent = {
        ...event,
        createdAt: new Date(),
      };
      
      await setDoc(docRef, newEvent);
      await fetchEvents(); // Refresh the events list
    } catch (err) {
      console.error('Error adding event:', err);
      throw new Error('Failed to add event');
    } finally {
      setLoading(false);
    }
  };

  // Update an existing event
  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    try {
      setLoading(true);
      const eventRef = doc(db, 'events', id);
      await updateDoc(eventRef, {
        ...eventData,
        updatedAt: new Date(),
      });
      await fetchEvents(); // Refresh the events list
    } catch (err) {
      console.error('Error updating event:', err);
      throw new Error('Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  // Delete an event
  const deleteEvent = async (id: string) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'events', id));
      await fetchEvents(); // Refresh the events list
    } catch (err) {
      console.error('Error deleting event:', err);
      throw new Error('Failed to delete event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventContext.Provider value={{ 
      events, 
      loading, 
      error,
      addEvent, 
      updateEvent, 
      deleteEvent 
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

// Helper function to format date for display
export const formatEventDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
