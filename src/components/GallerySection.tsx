import { useState } from 'react';
import { useGallery, GALLERY_CATEGORIES } from '@/contexts/GalleryContext';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GallerySection() {
  const { galleryItems, loading } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ['All', ...GALLERY_CATEGORIES];
  
  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <section id="gallery" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Event Gallery</h2>
          <p className="text-lg text-gray-600">Relive the memorable moments from our past events and activities</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                selectedCategory === category && 'bg-blue-600 text-white hover:bg-blue-700'
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No gallery items found</h3>
            <p className="mt-1 text-gray-500">Check back later for updates on our events.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white"
                onClick={() => setSelectedImage(item.imageUrl)}
              >
                <div className="aspect-w-16 aspect-h-9 w-full h-64 overflow-hidden bg-gray-100">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const fallback = document.createElement('div');
                          fallback.className = 'w-full h-full flex flex-col items-center justify-center bg-gray-50 p-6 text-center';
                          const icon = document.createElement('div');
                          icon.className = 'text-gray-400 mb-2';
                          icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
                          const text = document.createElement('p');
                          text.className = 'text-sm text-gray-500';
                          text.textContent = 'Image not available';
                          fallback.appendChild(icon);
                          fallback.appendChild(text);
                          parent.appendChild(fallback);
                        }
                      }}
                      onLoad={(e) => {
                        // Image loaded successfully
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'block';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">No image available</p>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {format(new Date(item.eventDate), 'MMMM d, yyyy')}
                  </p>
                  <p className="text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedImage(null)}>
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="h-8 w-8" />
            </button>
            <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt="Enlarged view" 
                  className="max-w-full max-h-[80vh] mx-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-64 flex flex-col items-center justify-center bg-gray-800 rounded-lg';
                      const icon = document.createElement('div');
                      icon.className = 'text-gray-400 mb-2';
                      icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
                      const text = document.createElement('p');
                      text.className = 'text-white text-lg';
                      text.textContent = 'Failed to load image';
                      fallback.appendChild(icon);
                      fallback.appendChild(text);
                      parent.appendChild(fallback);
                    }
                  }}
                  onLoad={(e) => {
                    // Image loaded successfully
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'block';
                  }}
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-gray-800 rounded-lg">
                  <div className="text-center">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-300">No image available</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
