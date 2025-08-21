import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { X, Download, Share2, Frame, Sticker, Undo, Redo, Palette, Type } from 'lucide-react';

const ImageEditor = ({ image, onClose, onSave }) => {
  const canvasRef = useRef(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedStickers, setSelectedStickers] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState('frames');

  // Frames với nhiều style hơn
  const frames = [
    { id: 1, name: 'Gold Classic', color: '#FFD700', width: 25, style: 'solid' },
    { id: 2, name: 'Silver Elegant', color: '#C0C0C0', width: 20, style: 'solid' },
    { id: 3, name: 'Wood Vintage', color: '#8B4513', width: 30, style: 'solid' },
    { id: 4, name: 'Pink Sweet', color: '#FF69B4', width: 20, style: 'solid' },
    { id: 5, name: 'Purple Magic', color: '#9932CC', width: 22, style: 'solid' },
  ];

  // Stickers phong phú hơn
  const stickerCategories = {
    emotions: [
      { id: 1, emoji: '❤️', name: 'Heart' },
      { id: 2, emoji: '😍', name: 'Love Eyes' },
      { id: 3, emoji: '🥰', name: 'Smiling Heart' },
      { id: 4, emoji: '😘', name: 'Kiss' },
      { id: 5, emoji: '🤩', name: 'Star Eyes' },
      { id: 6, emoji: '😎', name: 'Cool' },
      { id: 7, emoji: '🔥', name: 'Fire' },
      { id: 8, emoji: '💯', name: 'Hundred' },
    ],
    symbols: [
      { id: 9, emoji: '⭐', name: 'Star' },
      { id: 10, emoji: '✨', name: 'Sparkles' },
      { id: 11, emoji: '🌈', name: 'Rainbow' },
      { id: 12, emoji: '🌟', name: 'Glowing Star' },
      { id: 13, emoji: '💖', name: 'Sparkling Heart' },
      { id: 14, emoji: '💫', name: 'Dizzy' },
      { id: 15, emoji: '⚡', name: 'Lightning' },
      { id: 16, emoji: '🎯', name: 'Target' },
    ],
    party: [
      { id: 17, emoji: '🎉', name: 'Party' },
      { id: 18, emoji: '🎊', name: 'Confetti' },
      { id: 19, emoji: '🥳', name: 'Party Face' },
      { id: 20, emoji: '🎈', name: 'Balloon' },
      { id: 21, emoji: '🎁', name: 'Gift' },
      { id: 22, emoji: '🍾', name: 'Champagne' },
      { id: 23, emoji: '🎂', name: 'Cake' },
      { id: 24, emoji: '🎪', name: 'Circus' },
    ],
    nature: [
      { id: 25, emoji: '🌺', name: 'Hibiscus' },
      { id: 26, emoji: '🌸', name: 'Cherry Blossom' },
      { id: 27, emoji: '🌼', name: 'Daisy' },
      { id: 28, emoji: '🦋', name: 'Butterfly' },
      { id: 29, emoji: '🌙', name: 'Moon' },
      { id: 30, emoji: '☀️', name: 'Sun' },
      { id: 31, emoji: '🌊', name: 'Wave' },
      { id: 32, emoji: '🍀', name: 'Four Leaf Clover' },
    ]
  };

  useEffect(() => {
    drawCanvas();
  }, [image, selectedFrame, selectedStickers]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate proper aspect ratio to avoid distortion
      const maxSize = 500;
      const aspectRatio = img.width / img.height;
      
      let canvasWidth, canvasHeight;
      
      if (aspectRatio > 1) {
        // Landscape
        canvasWidth = maxSize;
        canvasHeight = maxSize / aspectRatio;
      } else {
        // Portrait or square
        canvasHeight = maxSize;
        canvasWidth = maxSize * aspectRatio;
      }
      
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      // Clear canvas with white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      
      // Draw main image without distortion
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      
      // Draw frame if selected
      if (selectedFrame) {
        ctx.strokeStyle = selectedFrame.color;
        ctx.lineWidth = selectedFrame.width;
        
        if (selectedFrame.style === 'double') {
          // Draw double frame
          const outer = selectedFrame.width;
          const inner = selectedFrame.width / 3;
          const gap = 5;
          
          // Outer frame
          ctx.strokeRect(outer/2, outer/2, canvasWidth - outer, canvasHeight - outer);
          
          // Inner frame
          const innerOffset = outer + gap;
          ctx.lineWidth = inner;
          ctx.strokeRect(innerOffset + inner/2, innerOffset + inner/2, 
                        canvasWidth - 2*innerOffset - inner, canvasHeight - 2*innerOffset - inner);
        } else {
          // Single frame
          const offset = selectedFrame.width / 2;
          ctx.strokeRect(offset, offset, canvasWidth - selectedFrame.width, canvasHeight - selectedFrame.width);
        }
      }
      
      // Draw stickers
      selectedStickers.forEach(sticker => {
        ctx.font = `${sticker.size || 50}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(sticker.emoji, sticker.x, sticker.y);
      });
    };
    
    img.crossOrigin = 'anonymous';
    img.src = image;
  };

  const addSticker = (sticker) => {
    const newSticker = {
      ...sticker,
      x: Math.random() * 300 + 100,
      y: Math.random() * 300 + 100,
      size: 50,
      id: Date.now()
    };
    
    setSelectedStickers(prev => [...prev, newSticker]);
    saveToHistory();
  };

  const removeSticker = (stickerId) => {
    setSelectedStickers(prev => prev.filter(s => s.id !== stickerId));
    saveToHistory();
  };

  const updateStickerSize = (stickerId, newSize) => {
    setSelectedStickers(prev => 
      prev.map(s => s.id === stickerId ? { ...s, size: newSize } : s)
    );
  };

  const saveToHistory = () => {
    const newHistory = history.slice(0, currentHistoryIndex + 1);
    newHistory.push({ frame: selectedFrame, stickers: [...selectedStickers] });
    setHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (currentHistoryIndex > 0) {
      const prevState = history[currentHistoryIndex - 1];
      setSelectedFrame(prevState.frame);
      setSelectedStickers(prevState.stickers);
      setCurrentHistoryIndex(currentHistoryIndex - 1);
    }
  };

  const redo = () => {
    if (currentHistoryIndex < history.length - 1) {
      const nextState = history[currentHistoryIndex + 1];
      setSelectedFrame(nextState.frame);
      setSelectedStickers(nextState.stickers);
      setCurrentHistoryIndex(currentHistoryIndex + 1);
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `edited-image-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const shareToFacebook = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, '_blank', 'width=600,height=400');
    });
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    const clickedSticker = selectedStickers.find(sticker => {
      const distance = Math.sqrt((x - sticker.x) ** 2 + (y - sticker.y) ** 2);
      return distance < 30;
    });
    
    if (clickedSticker) {
      setSelectedStickers(prev => 
        prev.map(s => s.id === clickedSticker.id ? { ...s, x, y } : s)
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-7xl w-full max-h-[95vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h3 className="text-2xl font-bold text-white">Image Editor</h3>
          <div className="flex items-center gap-2">
            <Button 
              onClick={undo} 
              disabled={currentHistoryIndex <= 0} 
              className="p-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              <Undo className="w-5 h-5" />
            </Button>
            <Button 
              onClick={redo} 
              disabled={currentHistoryIndex >= history.length - 1} 
              className="p-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              <Redo className="w-5 h-5" />
            </Button>
            <Button onClick={onClose} className="p-2 hover:bg-gray-700">
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row">
          {/* Tools Sidebar */}
          <div className="w-full xl:w-96 border-b xl:border-r xl:border-b-0 border-gray-700">
            {/* Tabs */}
            <div className="flex border-b border-gray-700">
              <Button
                onClick={() => setActiveTab('frames')}
                className={`flex-1 py-3 px-4 rounded-none ${
                  activeTab === 'frames' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-transparent text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Frame className="w-4 h-4 mr-2" />
                Frames
              </Button>
              <Button
                onClick={() => setActiveTab('stickers')}
                className={`flex-1 py-3 px-4 rounded-none ${
                  activeTab === 'stickers' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-transparent text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Sticker className="w-4 h-4 mr-2" />
                Stickers
              </Button>
            </div>

            <div className="p-4 max-h-96 xl:max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Frames Tab */}
              {activeTab === 'frames' && (
                <div className="space-y-6">
                  {/* First row - 3 frames */}
                  <div className="grid grid-cols-3 gap-3">
                    {frames.slice(0, 3).map(frame => (
                      <div
                        key={frame.id}
                        onClick={() => {setSelectedFrame(frame); saveToHistory();}}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedFrame?.id === frame.id ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-gray-800' : ''
                        }`}
                      >
                        <div className="w-20 h-24 bg-white rounded-sm flex flex-col items-center justify-between p-2 mx-auto hover:shadow-lg transition-shadow">
                          <div className="w-full flex-1 bg-black rounded-sm mb-1"></div>
                          <div className="text-xs text-black font-medium">
                            Frame {frame.id}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Second row - 2 frames */}
                  <div className="flex justify-center gap-8">
                    {frames.slice(3, 5).map(frame => (
                      <div
                        key={frame.id}
                        onClick={() => {setSelectedFrame(frame); saveToHistory();}}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedFrame?.id === frame.id ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-gray-800' : ''
                        }`}
                      >
                        <div className="w-20 h-24 bg-white rounded-sm flex flex-col items-center justify-between p-2 hover:shadow-lg transition-shadow">
                          <div className="w-full flex-1 bg-black rounded-sm mb-1"></div>
                          <div className="text-xs text-black font-medium">
                            Frame {frame.id}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stickers Tab */}
              {activeTab === 'stickers' && (
                <div className="space-y-6">
                  {Object.entries(stickerCategories).map(([category, stickers]) => (
                    <div key={category}>
                      <h4 className="font-semibold text-white mb-3 capitalize">{category}</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {stickers.map(sticker => (
                          <Button
                            key={sticker.id}
                            onClick={() => addSticker(sticker)}
                            className="p-3 text-2xl hover:bg-gray-700 border border-gray-600 rounded-lg transition-all hover:scale-110"
                            title={sticker.name}
                          >
                            {sticker.emoji}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Active Stickers Management */}
              {selectedStickers.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <h4 className="font-semibold text-white mb-3">Active Stickers</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedStickers.map(sticker => (
                      <div key={sticker.id} className="bg-gray-800 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg">{sticker.emoji}</span>
                          <Button
                            onClick={() => removeSticker(sticker.id)}
                            className="p-1 text-red-400 hover:text-red-300 hover:bg-red-400/20"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">Size:</span>
                          <input
                            type="range"
                            min="20"
                            max="100"
                            value={sticker.size}
                            onChange={(e) => updateStickerSize(sticker.id, parseInt(e.target.value))}
                            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-xs text-gray-400 w-8">{sticker.size}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 p-6">
            <div className="text-center">
              <div className="bg-gray-800 rounded-xl p-6 mb-6 inline-block">
                <canvas 
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="rounded-lg shadow-2xl cursor-pointer border-2 border-gray-600 hover:border-purple-500/50 transition-colors"
                  style={{ maxWidth: '500px', maxHeight: '500px', width: '100%', height: 'auto' }}
                />
              </div>
              
              <p className="text-sm text-gray-400 mb-6">
                Click on stickers to reposition them
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={downloadImage}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3"
                >
                  <Download className="w-5 h-5" />
                  Download
                </Button>
                <Button
                  onClick={shareToFacebook}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3"
                >
                  <Share2 className="w-5 h-5" />
                  Share to Facebook
                </Button>
                <Button
                  onClick={() => onSave && onSave(canvasRef.current.toDataURL('image/png'))}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
