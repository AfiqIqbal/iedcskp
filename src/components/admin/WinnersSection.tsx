import { useState, useEffect } from 'react';
import { useEvents } from '@/contexts/EventContext';
import { useWinners, type Winner } from '@/contexts/WinnerContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Pencil, X, Check, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';

export default function WinnersSection() {
  const { events } = useEvents();
  const { winners, loading, error, addWinner, updateWinner, deleteWinner } = useWinners();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Winner>>({
    eventId: '',
    eventName: '',
    eventDate: '',
    winners: [{ position: '', name: '', team: '', prize: '' }],
    poster: ''
  });

  // Reset form
  const resetForm = () => {
    setFormData({
      eventId: '',
      eventName: '',
      eventDate: '',
      winners: [{ position: '', name: '', team: '', prize: '' }],
      poster: ''
    });
    setEditingId(null);
    setIsAdding(false);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle winner entry changes
  const handleWinnerChange = (index: number, field: string, value: string) => {
    const updatedWinners = [...(formData.winners || [])];
    updatedWinners[index] = {
      ...updatedWinners[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      winners: updatedWinners
    }));
  };

  // Helper function to validate image URL
  const isValidImageUrl = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
  };

  // Add a new winner entry
  const handleAddWinner = () => {
    setFormData(prev => ({
      ...prev,
      winners: [...(prev.winners || []), { position: '', name: '', team: '', prize: '' }]
    }));
  };

  // Remove a winner entry
  const handleRemoveWinner = (index: number) => {
    if (formData.winners && formData.winners.length > 1) {
      const updatedWinners = [...formData.winners];
      updatedWinners.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        winners: updatedWinners
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.eventId || !formData.eventName || !formData.eventDate) {
        alert('Please fill in all required fields');
        return;
      }

      const winnerData = {
        eventId: formData.eventId,
        eventName: formData.eventName,
        eventDate: formData.eventDate,
        winners: formData.winners?.filter(w => w.name && w.position) || [],
        poster: formData.poster || ''
      };

      if (editingId) {
        await updateWinner(editingId, winnerData);
      } else {
        await addWinner(winnerData as any);
      }
      resetForm();
    } catch (err) {
      console.error('Error saving winner:', err);
      alert('Failed to save winner. Please try again.');
    }
  };

  // Edit an existing winner
  const handleEdit = (winner: Winner) => {
    setFormData({
      eventId: winner.eventId,
      eventName: winner.eventName,
      eventDate: winner.eventDate,
      winners: winner.winners,
      poster: winner.poster || ''
    });
    setEditingId(winner.id);
    setIsAdding(true);
  };

  // Set form data when an event is selected
  useEffect(() => {
    if (formData.eventId) {
      const selectedEvent = events.find(e => e.id === formData.eventId);
      if (selectedEvent) {
        setFormData(prev => ({
          ...prev,
          eventName: selectedEvent.title,
          eventDate: selectedEvent.date,
          poster: selectedEvent.poster || ''
        }));
      }
    }
  }, [formData.eventId, events]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Event Winners</h2>
        <Button onClick={() => { resetForm(); setIsAdding(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Add Winners
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Winners' : 'Add New Winners'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventId">Event *</Label>
                  <select
                    id="eventId"
                    name="eventId"
                    value={formData.eventId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select an event</option>
                    {events.map(event => (
                      <option key={event.id} value={event.id}>
                        {event.title} - {new Date(event.date).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>Event Name</Label>
                  <Input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Event Date</Label>
                  <Input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Poster URL</Label>
                  <Input
                    type="url"
                    name="poster"
                    value={formData.poster}
                    onChange={handleChange}
                    placeholder="https://example.com/poster.jpg"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Winners</Label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddWinner}>
                    <Plus className="h-4 w-4 mr-2" /> Add Winner
                  </Button>
                </div>
                
                {formData.winners?.map((winner, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-1">
                      <Label>Position *</Label>
                      <Input
                        placeholder="1st, 2nd, Best Design, etc."
                        value={winner.position}
                        onChange={(e) => handleWinnerChange(index, 'position', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Name *</Label>
                      <Input
                        placeholder="Winner's name"
                        value={winner.name}
                        onChange={(e) => handleWinnerChange(index, 'name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Team (optional)</Label>
                      <Input
                        placeholder="Team name"
                        value={winner.team || ''}
                        onChange={(e) => handleWinnerChange(index, 'team', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Prize (optional)</Label>
                      <Input
                        placeholder="Prize details"
                        value={winner.prize || ''}
                        onChange={(e) => handleWinnerChange(index, 'prize', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Photo URL (optional)</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="url"
                          placeholder="https://example.com/photo.jpg"
                          value={winner.photoUrl || ''}
                          onChange={(e) => handleWinnerChange(index, 'photoUrl', e.target.value)}
                          className="flex-1"
                        />
                        {winner.photoUrl && (
                          <div className="relative">
                            <img 
                              src={winner.photoUrl} 
                              alt={`${winner.name}'s photo`} 
                              className="h-10 w-10 rounded-full object-cover border"
                              onError={(e) => {
                                // If image fails to load, clear the URL
                                handleWinnerChange(index, 'photoUrl', '');
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {formData.winners && formData.winners.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        onClick={() => handleRemoveWinner(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingId ? 'Update' : 'Save'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {winners.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No winners have been added yet.
            </CardContent>
          </Card>
        ) : (
          winners.map(winner => (
            <Card key={winner.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {winner.poster && (
                  <div className="md:w-1/3 h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={winner.poster}
                      alt={`${winner.eventName} poster`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{winner.eventName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(winner.eventDate), 'MMMM d, yyyy')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(winner as Winner)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => winner.id && deleteWinner(winner.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    {winner.winners.map((w, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b">
                        <div className="flex items-center space-x-3">
                      {w.photoUrl && (
                        <div className="flex-shrink-0">
                          <img 
                            src={w.photoUrl} 
                            alt={`${w.name}'s photo`} 
                            className="h-10 w-10 rounded-full object-cover border"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">
                          {w.position}: {w.name}
                        </div>
                        {w.team && <div className="text-sm text-muted-foreground">{w.team}</div>}
                      </div>
                    </div>
                        {w.prize && <span className="text-sm font-medium">{w.prize}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
