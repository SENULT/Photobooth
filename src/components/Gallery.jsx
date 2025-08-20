import React, { useState } from 'react';
import { Button } from './ui/button';

const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [gridSize, setGridSize] = useState('medium'); // small, medium, large
  const imagesPerPage = gridSize === 'small' ? 24 : gridSize === 'medium' ? 12 : 6;
  
  // Sample images data - thay thế bằng dữ liệu thật từ API
  const sampleImages = [
    "https://picsum.photos/400/400?random=1",
    "https://picsum.photos/400/400?random=2", 
    "https://picsum.photos/400/400?random=3",
    "https://picsum.photos/400/400?random=4",
    "https://picsum.photos/400/400?random=5",
    "https://picsum.photos/400/400?random=6",
    "https://picsum.photos/400/400?random=7",
    "https://picsum.photos/400/400?random=8",
    "https://picsum.photos/400/400?random=9",
    "https://picsum.photos/400/400?random=10",
    "https://picsum.photos/400/400?random=11",
    "https://picsum.photos/400/400?random=12",
    "https://picsum.photos/400/400?random=13",
    "https://picsum.photos/400/400?random=14",
    "https://picsum.photos/400/400?random=15",
    "https://picsum.photos/400/400?random=16",
    "https://picsum.photos/400/400?random=17",
    "https://picsum.photos/400/400?random=18",
    "https://picsum.photos/400/400?random=19",
    "https://picsum.photos/400/400?random=20",
    "https://picsum.photos/400/400?random=21",
    "https://picsum.photos/400/400?random=22",
    "https://picsum.photos/400/400?random=23",
    "https://picsum.photos/400/400?random=24",
    "https://picsum.photos/400/400?random=25",
    "https://picsum.photos/400/400?random=26",
    "https://picsum.photos/400/400?random=27",
    "https://picsum.photos/400/400?random=28",
    "https://picsum.photos/400/400?random=29",
    "https://picsum.photos/400/400?random=30",
  ];

  const totalPages = Math.ceil(sampleImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = sampleImages.slice(startIndex, startIndex + imagesPerPage);

  const getGridCols = () => {
    switch(gridSize) {
      case 'small': return 'grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8';
      case 'medium': return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 'large': return 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      default: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        {/* Grid Size Controls */}
        <div className="flex items-center gap-2">
          <span className="text-gray-300 text-sm">View:</span>
          <div className="flex bg-black/30 backdrop-blur rounded-lg p-1">
            <Button
              onClick={() => setGridSize('small')}
              className={`px-3 py-2 rounded text-xs transition-all ${
                gridSize === 'small' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white bg-transparent'
              }`}
            >
              Small
            </Button>
            <Button
              onClick={() => setGridSize('medium')}
              className={`px-3 py-2 rounded text-xs transition-all ${
                gridSize === 'medium' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white bg-transparent'
              }`}
            >
              Medium
            </Button>
            <Button
              onClick={() => setGridSize('large')}
              className={`px-3 py-2 rounded text-xs transition-all ${
                gridSize === 'large' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white bg-transparent'
              }`}
            >
              Large
            </Button>
          </div>
        </div>

        {/* Pagination Info */}
        <div className="text-gray-300 text-sm">
          Page {currentPage} of {totalPages} ({sampleImages.length} images)
        </div>
      </div>

      {/* Image Grid */}
      <div className={`grid ${getGridCols()} gap-4 mb-8`}>
        {currentImages.map((image, index) => (
          <div 
            key={startIndex + index} 
            className="aspect-square bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer group"
          >
            <img 
              src={image} 
              alt={`Gallery image ${startIndex + index + 1}`}
              className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-200"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-black/30 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 text-sm transition-all ${
                  currentPage === page 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-black/30 text-gray-300 hover:text-white'
                }`}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-black/30 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
