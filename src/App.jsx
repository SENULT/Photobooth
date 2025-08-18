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
      
      {/* Navigation Tabs - giống thiết kế */}
      <div className="flex justify-center mb-8">
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
