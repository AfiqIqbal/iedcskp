import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  orderBy, 
  Timestamp, 
  updateDoc 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type Message = {
  id?: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date | Timestamp;
};

type MessageContextType = {
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (message: Omit<Message, 'id' | 'read' | 'createdAt'>) => Promise<boolean>;
  markAsRead: (id: string) => Promise<boolean>;
  deleteMessage: (id: string) => Promise<boolean>;
  unreadCount: number;
  refreshMessages: () => Promise<void>;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch messages from Firestore
  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      
      if (!db) {
        throw new Error('Firestore not initialized');
      }
      
      const messagesRef = collection(db, 'messages');
      const q = query(messagesRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : doc.data().createdAt,
      })) as Message[];
      
      setMessages(messagesData);
      setError(null);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load messages';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Send a new message
  const sendMessage = useCallback(async (message: Omit<Message, 'id' | 'read' | 'createdAt'>): Promise<boolean> => {
    try {
      setLoading(true);
      
      if (!db) {
        throw new Error('Firestore not initialized');
      }
      
      const messagesRef = collection(db, 'messages');
      const newDocRef = doc(messagesRef);
      
      await setDoc(newDocRef, {
        ...message,
        read: false,
        createdAt: Timestamp.now(),
      });
      
      await fetchMessages();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchMessages]);

  // Mark message as read
  const markAsRead = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      if (!db) {
        throw new Error('Firestore not initialized');
      }
      
      await updateDoc(doc(db, 'messages', id), { read: true });
      await fetchMessages();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mark as read';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchMessages]);

  // Delete a message
  const deleteMessage = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      if (!db) {
        throw new Error('Firestore not initialized');
      }
      
      await deleteDoc(doc(db, 'messages', id));
      await fetchMessages();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete message';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchMessages]);

  // Manually refresh messages
  const refreshMessages = useCallback(async () => {
    await fetchMessages();
  }, [fetchMessages]);

  // Calculate unread count
  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <MessageContext.Provider
      value={{
        messages,
        loading,
        error,
        sendMessage,
        markAsRead,
        deleteMessage,
        unreadCount,
        refreshMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
