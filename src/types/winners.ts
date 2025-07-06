export type Winner = {
  id?: string;
  eventId: string;
  eventName: string;
  winners: {
    position: string; // e.g., "1st", "2nd", "Best Design", etc.
    name: string;
    team?: string;
    prize?: string;
    photoUrl?: string; // URL to winner's photo
  }[];
  eventDate: string;
  poster?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type WinnerInput = Omit<Winner, 'id' | 'createdAt' | 'updatedAt'>;
