import { useRef, useState, useEffect } from 'react';
import { useGallery, GALLERY_CATEGORIES } from '@/contexts/GalleryContext';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, [filteredItems]);

  return (
    <section id="gallery" className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Our Event Gallery</h2>
          <p className="text-gray-600">Relive the memorable moments from our past events and activities</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex space-x-2 p-1 bg-gray-100 rounded-full">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
                  selectedCategory === category 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-200'
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No gallery items found</h3>
            <p className="mt-1 text-gray-500">Check back later for updates on our events.</p>
          </div>
        ) : (
          <div className="relative">
            {showLeftButton && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-6 -mx-2 px-2 scrollbar-hide"
              style={{
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none', // For Firefox
                msOverflowStyle: 'none', // For IE and Edge
              }}
            >
              <style dangerouslySetInnerHTML={{
                __html: `
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                  .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                `
              }} />
              <div className="flex space-x-6">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="group relative flex-shrink-0 w-80 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <div 
                      className="relative h-48 overflow-hidden bg-gray-100 cursor-pointer"
                      onClick={() => item.images[0]?.url && setSelectedImage(item.images[0].url)}
                    >
                      {item.images[0]?.url ? (
                        <img
                          src={item.images[0].url}
                          alt={item.images[0]?.caption || item.title}
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
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'block';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                          <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">No image available</p>
                        </div>
                      )}
                      {item.images && item.images.length > 0 && (
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                          {item.images.map((_, idx) => (
                            <div 
                              key={idx}
                              className={`h-1.5 w-1.5 rounded-full ${idx === 0 ? 'bg-white' : 'bg-white/50'}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {format(new Date(item.eventDate), 'MMM d, yyyy')}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {item.description}
                      </p>
                    </div>
                    {item.images && item.images.length > 1 && (
                      <div className="p-3 pt-0 flex justify-between items-center border-t border-gray-100">
                        <div className="flex space-x-1">
                          {item.images.slice(0, 3).map((_, idx) => (
                            <div 
                              key={idx}
                              className={`h-1.5 w-4 rounded-full ${idx === 0 ? 'bg-blue-500' : 'bg-gray-200'}`}
                            />
                          ))}
                          {item.images.length > 3 && (
                            <span className="text-xs text-gray-400 ml-1">+{item.images.length - 3}</span>
                          )}
                        </div>
                        <button 
                          className="text-xs font-medium text-blue-600 hover:text-blue-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.images[0]?.url) {
                              setSelectedImage(item.images[0].url);
                            }
                          }}
                        >
                          View all
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {showRightButton && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Image Modal */}
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
