import { useState } from 'react';
import { format } from 'date-fns';
import { useEvents } from '@/contexts/EventContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock, Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import type { Event } from '@/contexts/EventContext';

const EventsSection = () => {
  const { events, addEvent, updateEvent, deleteEvent, loading, error } = useEvents();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [currentEvent, setCurrentEvent] = useState<Omit<Event, 'id' | 'createdAt'>>({
    title: "",
    date: "",
    location: "",
    attendees: "",
    time: "",
    description: "",
    poster: "",
    registrationLink: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic validation
    if (!currentEvent.title || !currentEvent.date || !currentEvent.location) {
      setFormError('Please fill in all required fields');
      return;
    }

    try {
      if (isEditing && editingId) {
        await updateEvent(editingId, currentEvent);
      } else {
        await addEvent(currentEvent);
      }
      
      // Reset form
      setCurrentEvent({
        title: "",
        date: "",
        location: "",
        attendees: "",
        time: "",
        description: "",
        poster: "",
        registrationLink: ""
      });
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving event:', error);
      setFormError('Failed to save event. Please try again.');
    }
  };

  const handleEdit = (event: Event) => {
    setCurrentEvent({
      title: event.title,
      date: event.date,
      location: event.location,
      attendees: event.attendees || "",
      time: event.time || "",
      description: event.description || "",
      poster: event.poster || "",
      registrationLink: event.registrationLink || ""
    });
    setIsEditing(true);
    setEditingId(event.id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Event' : 'Add New Event'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="p-4 text-red-700 bg-red-100 rounded-md">
                {formError}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title *
                </label>
                <Input
                  id="title"
                  value={currentEvent.title}
                  onChange={(e) => setCurrentEvent({...currentEvent, title: e.target.value})}
                  placeholder="Event title"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <Input
                  id="date"
                  type="date"
                  value={currentEvent.date}
                  onChange={(e) => setCurrentEvent({...currentEvent, date: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <Input
                  id="time"
                  value={currentEvent.time}
                  onChange={(e) => setCurrentEvent({...currentEvent, time: e.target.value})}
                  placeholder="e.g., 10:00 AM - 12:00 PM"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <Input
                  id="location"
                  value={currentEvent.location}
                  onChange={(e) => setCurrentEvent({...currentEvent, location: e.target.value})}
                  placeholder="Event location"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Attendees
                </label>
                <Input
                  id="attendees"
                  value={currentEvent.attendees}
                  onChange={(e) => setCurrentEvent({...currentEvent, attendees: e.target.value})}
                  placeholder="e.g., 100+ attendees"
                />
              </div>
              
              <div>
                <label htmlFor="poster" className="block text-sm font-medium text-gray-700 mb-1">
                  Poster URL
                </label>
                <Input
                  id="poster"
                  value={currentEvent.poster}
                  onChange={(e) => setCurrentEvent({...currentEvent, poster: e.target.value})}
                  placeholder="URL to event poster image"
                />
              </div>
              
              <div>
                <label htmlFor="registrationLink" className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Link (optional)
                </label>
                <Input
                  id="registrationLink"
                  type="url"
                  value={currentEvent.registrationLink || ''}
                  onChange={(e) => setCurrentEvent({...currentEvent, registrationLink: e.target.value})}
                  placeholder="https://example.com/register"
                />
                <p className="mt-1 text-xs text-gray-500">
                  If provided, the Register Now button will link to this URL
                </p>
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={currentEvent.description}
                onChange={(e) => setCurrentEvent({...currentEvent, description: e.target.value})}
                placeholder="Event description"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingId(null);
                    setCurrentEvent({
                      title: "",
                      date: "",
                      location: "",
                      attendees: "",
                      time: "",
                      description: "",
                      poster: ""
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? 'Updating...' : 'Adding...'}
                  </>
                ) : isEditing ? (
                  'Update Event'
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        {loading && events.length === 0 ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        ) : error ? (
          <div className="p-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No upcoming events. Add your first event above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="h-full flex flex-col">
                {event.poster && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={event.poster}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-event.jpg';
                      }}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(new Date(event.date), 'MMMM d, yyyy')}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {event.time || 'Time TBD'}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location || 'Location TBD'}
                  </div>
                  {event.attendees && (
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Users className="h-4 w-4 mr-1" />
                      {event.attendees}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 line-clamp-3">{event.description}</p>
                </CardContent>
                <div className="p-4 pt-0 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(event)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => event.id && handleDelete(event.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsSection;
