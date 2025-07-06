import { Calendar, MapPin, Users, Clock, Loader2, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEvents, formatEventDate } from '@/contexts/EventContext';
import { Link } from 'react-router-dom';

// Helper function to convert Google Drive shareable links to direct image URLs
const getDirectImageUrl = (url: string): string => {
  if (!url) return '';
  
  // Check if it's already a direct link
  if (url.includes('drive.google.com/uc?')) {
    return url;
  }
  
  console.log('Original URL:', url);
  
  // Try to extract file ID from various Google Drive URL formats
  const patterns = [
    /drive\.google\.com\/file\/d\/([^/]+)/,
    /drive\.google\.com\/open\?id=([^&]+)/,
    /drive\.google\.com\/thumbnail\?id=([^&]+)/,
    /drive\.google\.com\/thumbnail\?sz=w[0-9]+-h[0-9]+-no&id=([^&]+)/,
    /id=([^&]+)/, // Generic ID extractor
  ];
  
  // Try direct file ID (32-char alphanumeric)
  const fileIdMatch = url.match(/([a-zA-Z0-9_-]{25,})/);
  if (fileIdMatch) {
    const directUrl = `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
    console.log('Generated direct URL (from ID match):', directUrl);
    return directUrl;
  }
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }
  
  // If no pattern matched, return the original URL
  console.log('No pattern matched, returning original URL');
  return url;
};

const EventsSection = () => {
  const { events, loading, error } = useEvents();

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center bg-indigo-100 rounded-full px-6 py-2 mb-6">
            <Calendar className="w-5 h-5 text-indigo-500 mr-2" />
            <span className="text-indigo-700 font-medium">Upcoming Events</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore Our Exciting Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest events, workshops, and competitions designed to foster innovation and entrepreneurship.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll">
          {loading && !events.length ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-8 text-red-600">
              Failed to load events. Please try again later.
            </div>
          ) : events.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No upcoming events. Check back soon!
            </div>
          ) : (
            events.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                <div className="relative aspect-square overflow-hidden">
                  {event.poster ? (
                    <>
                      <div className="relative w-full h-full">
                        <img 
                          src={getDirectImageUrl(event.poster)} 
                          alt={event.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            console.error('Error loading direct image URL:', e);
                            // Fallback to the original URL if the direct link fails
                            if (e.currentTarget.src !== event.poster) {
                              console.log('Falling back to original URL:', event.poster);
                              e.currentTarget.src = event.poster;
                            } else {
                              console.log('Already tried the original URL, showing error state');
                              e.currentTarget.style.display = 'none';
                              const errorDiv = document.createElement('div');
                              errorDiv.className = 'absolute inset-0 bg-red-50 flex flex-col items-center justify-center p-4 text-center';
                              errorDiv.innerHTML = `
                                <ImageIcon className="w-8 h-8 text-red-400 mb-2" />
                                <p class="text-sm text-red-600">Could not load image</p>
                                <p class="text-xs text-gray-500 mt-1">URL: ${event.poster.substring(0, 30)}...</p>
                              `;
                              e.currentTarget.parentNode?.appendChild(errorDiv);
                            }
                          }}
                          onLoad={(e) => {
                            console.log('Image loaded successfully:', e.currentTarget.src);
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold group-hover:text-blue-600 transition-colors">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{formatEventDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{event.attendees} Attendees</span>
                  </div>
                  <p className="text-gray-700">{event.description}</p>
                  <div className="mt-auto pt-4">
                    <Button 
                      asChild 
                      className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white"
                    >
                      {event.registrationLink ? (
                        <a 
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center"
                        >
                          Register Now
                        </a>
                      ) : (
                        <Link to="/register">
                          Register Now
                        </Link>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
