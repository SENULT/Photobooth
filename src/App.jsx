import React, { useState } from 'react';
import Header from './components/Header';
import ImageGenerator from './components/ImageGenerator';
import Gallery from './components/Gallery';
import { Button } from './components/ui/button';

function App() {
  const [currentView, setCurrentView] = useState('generator');

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Header với Title và Navigation Tabs */}
      <div className="mb-8 px-4 md:px-8">
        {/* Navigation Tabs - luôn ở bên phải và vị trí cố định */}
        <div className="flex justify-end mb-8">
          <div className="flex bg-black/30 backdrop-blur rounded-full p-1">
            <Button
              onClick={() => setCurrentView('generator')}
              className={`px-8 py-3 rounded-full font-medium transition-all ${
                currentView === 'generator' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white bg-transparent'
              }`}
            >
              Generator
            </Button>
            <Button
              onClick={() => setCurrentView('gallery')}
              className={`px-8 py-3 rounded-full font-medium transition-all ${
                currentView === 'gallery' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white bg-transparent'
              }`}
            >
              Gallery
            </Button>
          </div>
        </div>
        
        {/* Title - vùng cố định với min-height */}
        <div className="min-h-[200px] flex items-center justify-center">
          {currentView === 'generator' && (
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-2">
                Image to Image
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold gradient-text">
                AI Generator
              </h2>
            </div>
          )}
          {currentView === 'gallery' && (
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold gradient-text">
                ITSC GALLERY
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main>
        {currentView === 'generator' && <ImageGenerator />}
        {currentView === 'gallery' && <Gallery />}
      </main>

      {/* Footer */}
      <footer className="mt-16 pb-8 text-center text-gray-400">
        <p>&copy; 2025 Innovative Technology Student Club. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
