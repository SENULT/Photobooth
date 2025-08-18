import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample gallery images với heights khác nhau cho masonry layout
  const galleryImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
      style: 'cyberpunk',
      title: 'Cyberpunk Motorcycle',
      height: 'h-80'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&crop=face',
      style: 'anime',
      title: 'Anime Character',
      height: 'h-64'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=700&fit=crop',
      style: 'oil-painting',
      title: 'Oil Painting Landscape',
      height: 'h-96'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1516557070061-c3d1653fa646?w=400&h=450&fit=crop',
      style: 'fantasy',
      title: 'Fantasy Portrait',
      height: 'h-56'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=800&fit=crop',
      style: 'nature',
      title: 'Mountain Landscape',
      height: 'h-72'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=550&fit=crop',
      style: 'cyberpunk',
      title: 'Neon City',
      height: 'h-68'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=650&fit=crop&crop=face',
      style: 'anime',
      title: 'Anime Warrior',
      height: 'h-80'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=480&fit=crop',
      style: 'abstract',
      title: 'Abstract Art',
      height: 'h-60'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1516557070061-c3d1653fa646?w=400&h=750&fit=crop',
      style: 'portrait',
      title: 'Digital Portrait',
      height: 'h-88'
    },
    {
      id: 10,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=420&fit=crop',
      style: 'landscape',
      title: 'Sunset Valley',
      height: 'h-52'
    },
    {
      id: 11,
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=680&fit=crop',
      style: 'sci-fi',
      title: 'Space Station',
      height: 'h-84'
    },
    {
      id: 12,
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=520&fit=crop&crop=face',
      style: 'character',
      title: 'Hero Character',
      height: 'h-66'
    },
    {
      id: 13,
      url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop',
      style: 'fantasy',
      title: 'Magic Portal',
      height: 'h-76'
    },
    {
      id: 14,
      url: 'https://images.unsplash.com/photo-1516557070061-c3d1653fa646?w=400&h=460&fit=crop',
      style: 'cyberpunk',
      title: 'Cyber Warrior',
      height: 'h-58'
    },
    {
      id: 15,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=720&fit=crop',
      style: 'nature',
      title: 'Forest Scene',
      height: 'h-90'
    }
  ];

  const filteredImages = galleryImages.filter(image =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.style.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-8">
          ITSC GALLERY
        </h1>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for an AI image"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-20 h-12 text-white placeholder-gray-400"
          />
          <Button
            variant="gradient"
            className="absolute right-1 top-1 bottom-1 px-6"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-105"
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
              <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="font-semibold text-sm">{image.title}</h3>
                <p className="text-xs text-gray-300 capitalize">{image.style}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredImages.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No images found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
