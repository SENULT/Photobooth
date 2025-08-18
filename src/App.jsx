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
      
      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-black bg-opacity-20 rounded-lg p-1 glass-effect">
          <Button
            variant={currentView === 'generator' ? 'gradient' : 'ghost'}
            onClick={() => setCurrentView('generator')}
            className="px-6 py-2 text-white"
          >
            Generator
          </Button>
          <Button
            variant={currentView === 'gallery' ? 'gradient' : 'ghost'}
            onClick={() => setCurrentView('gallery')}
            className="px-6 py-2 text-white"
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
