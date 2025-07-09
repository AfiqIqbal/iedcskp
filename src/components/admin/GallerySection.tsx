import { useState, useEffect, useRef } from 'react';
import { useGallery, type GalleryItem, GALLERY_CATEGORIES, type GalleryImage } from '@/contexts/GalleryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2, Trash2, Edit, Plus, X, Image as ImageIcon, ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

interface GalleryCarouselProps {
  item: GalleryItem;
  currentIndex: number;
  onImageChange: (itemId: string, index: number) => void;
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ item, currentIndex, onImageChange }) => {
  const hasMultipleImages = item.images.length > 1;

  return (
    <div className="relative h-48 bg-gray-100 overflow-hidden">
      <div 
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${item.images.length * 100}%`
        }}
      >
        {item.images.map((img) => (
          <div key={img.id} className="w-full h-full flex-shrink-0 relative">
            <img
              src={img.url}
              alt={img.caption || item.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'w-full h-full flex items-center justify-center bg-gray-100';
                const icon = document.createElement('div');
                icon.className = 'text-gray-400';
                icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
                fallback.appendChild(icon);
                target.parentNode?.insertBefore(fallback, target.nextSibling);
              }}
            />
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
                {img.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {hasMultipleImages && (
        <>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onImageChange(item.id!, (currentIndex - 1 + item.images.length) % item.images.length);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onImageChange(item.id!, (currentIndex + 1) % item.images.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
            {item.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  onImageChange(item.id!, idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function GallerySection() {
  const { galleryItems, loading, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useGallery();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [formData, setFormData] = useState<Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    description: '',
    images: [{ url: '', caption: '', id: uuidv4() }],
    eventDate: new Date().toISOString().split('T')[0],
    category: 'Workshop'
  });

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying || galleryItems.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % galleryItems.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [galleryItems.length, isPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    // Resume auto-play after manual navigation
    const timer = setTimeout(() => setIsPlaying(true), 10000);
    return () => clearTimeout(timer);
  };
  
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getCurrentImageIndex = (itemId: string) => {
    return currentImageIndices[itemId] || 0;
  };

  const handleImageChange = (itemId: string, index: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [itemId]: index
    }));
  };

  const setCurrentImageIndex = (itemId: string, index: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [itemId]: index
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (index: number, url: string) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = { ...updatedImages[index], url };
    setFormData(prev => ({ ...prev, images: updatedImages }));
  };

  const handleImageCaptionChange = (index: number, caption: string) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = { ...updatedImages[index], caption };
    setFormData(prev => ({ ...prev, images: updatedImages }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, { url: '', caption: '', id: uuidv4() }]
    }));
  };

  const removeImageField = (index: number) => {
    if (formData.images.length <= 1) return;
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      images: updatedImages
    }));
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const galleryItem: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'> = {
      ...formData,
      images: formData.images.filter(img => img.url.trim() !== '')
    };

    try {
      if (editingId) {
        await updateGalleryItem(editingId, galleryItem);
      } else {
        await addGalleryItem(galleryItem);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving gallery item:', error);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setFormData({
      title: item.title || '',
      description: item.description || '',
      images: item.images && item.images.length > 0 
        ? item.images 
        : [{ id: uuidv4(), url: '', caption: '' }],
      eventDate: item.eventDate ? item.eventDate.split('T')[0] : new Date().toISOString().split('T')[0],
      category: item.category || 'Workshop'
    });
    setCurrentImageIndices(prev => ({
      ...prev,
      [item.id!]: 0
    }));
    setEditingId(item.id!);
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      images: [{ url: '', caption: '', id: uuidv4() }],
      eventDate: new Date().toISOString().split('T')[0],
      category: 'Workshop'
    });
    setCurrentImageIndices({});
    setEditingId(null);
    setIsFormOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Event Gallery</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Gallery Item
        </Button>
      </div>

      {isFormOpen && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Gallery Item' : 'Add New Gallery Item'}</CardTitle>
            <CardDescription>
              {editingId ? 'Update the gallery item details' : 'Fill in the details for a new gallery item'}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Event title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({...formData, category: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {GALLERY_CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Date</label>
                  <Input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Images</label>
                    <Button type="button" variant="ghost" size="sm" onClick={addImageField}>
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Image
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="flex space-x-2 overflow-x-auto py-2" ref={scrollContainerRef}>
                      {formData.images.map((img, index) => (
                        <div key={img.id || index} className="flex-shrink-0 w-48 space-y-2">
                          <div className="relative">
                            <Input
                              value={img.url}
                              onChange={(e) => handleImageUrlChange(index, e.target.value)}
                              placeholder="https://example.com/image.jpg"
                              className="pr-8"
                              required={index === 0}
                            />
                            {formData.images.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full w-8"
                                onClick={() => removeImageField(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <Textarea
                            value={img.caption || ''}
                            onChange={(e) => handleImageCaptionChange(index, e.target.value)}
                            placeholder="Image caption (optional)"
                            rows={2}
                            className="text-xs"
                          />
                          {img.url && (
                            <div className="w-full h-32 border rounded-md overflow-hidden">
                              <img
                                src={img.url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                    onClick={scrollLeft}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                    onClick={scrollRight}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e)}
                    placeholder="Event description"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit">
                {editingId ? 'Update' : 'Add'} Item
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      <div className="w-full rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Events Gallery</h2>
        {galleryItems.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium">No gallery items yet</h3>
            <p className="mt-1 text-sm">Get started by adding a new gallery item.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <div className="w-full h-full overflow-hidden relative">
                    <div 
                      className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(-${getCurrentImageIndex(item.id!) * 100}%)`,
                        width: `${item.images.length * 100}%`
                      }}
                    >
                      {item.images.map((img, imgIndex) => (
                        <div key={imgIndex} className="w-full h-full flex-shrink-0">
                          <img
                            src={img.url}
                            alt={`${item.title} ${imgIndex + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    {item.images.length > 1 && (
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                        {item.images.map((_, idx) => {
                          const currentIndex = getCurrentImageIndex(item.id!);
                          return (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(item.id!, idx);
                              }}
                              className={`h-1.5 rounded-full transition-all ${
                                idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
                              }`}
                              aria-label={`Go to image ${idx + 1}`}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {format(new Date(item.eventDate), 'MMM d, yyyy')}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end p-4 pt-0">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(item)}
                      className="h-8"
                    >
                      <Edit className="h-3.5 w-3.5 mr-1.5" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => deleteGalleryItem(item.id!)}
                      className="h-8"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
