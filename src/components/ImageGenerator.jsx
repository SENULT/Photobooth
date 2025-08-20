import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Sparkles, RotateCcw, Share2, RefreshCw, Frame } from 'lucide-react';

const ImageGenerator = () => {
  const [selectedStyle, setSelectedStyle] = useState('anime');
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generationTime, setGenerationTime] = useState('');

  const styles = [
    {
      id: 'anime',
      name: 'Anime',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkY2Qjk4Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BbmltZTwvdGV4dD4KPC9zdmc+',
    },
    {
      id: 'oil-painting', 
      name: 'Oil painting',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNjhENTY4Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iOTAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk9pbDwvdGV4dD4KPHRleHQgeD0iMTAwIiB5PSIxMTQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPnBhaW50aW5nPC90ZXh0Pgo8L3N2Zz4=',
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk', 
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOUMyN0IwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DeWJlcnB1bms8L3RleHQ+Cjwvc3ZnPg==',
    },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    if (!uploadedImage) return;
    
    setIsGenerating(true);
    setGeneratedImage(null);
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      // Use the uploaded image as the "generated" result for demo
      setGeneratedImage(uploadedImage);
      const now = new Date();
      setGenerationTime(`${(now.getMonth() + 1)}/${now.getDate()}/${now.getFullYear()}, ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} ${now.getHours() >= 12 ? 'PM' : 'AM'}`);
    }, 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Panel - Controls */}
        <div className="space-y-6">
          {/* Image Upload */}
          <Card className="bg-black/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Image upload</CardTitle>
              <p className="text-gray-300 text-sm">Upload an image to use as a reference</p>
            </CardHeader>
            <CardContent>
              <div className="relative border-2 border-dashed border-purple-500/50 rounded-lg p-8 text-center hover:border-purple-400 transition-colors bg-purple-900/10">
                <input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border border-purple-500/20">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
                        <Upload className="w-4 h-4 mr-2" />
                        Change image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 text-purple-400 mx-auto" />
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload image
                      </Button>
                    </div>
                  )}
                  <p className="text-gray-400 text-xs mt-4">
                    We accept .jpeg, .jpg, .png, .webp formats up to 24MB.
                  </p>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Style Selection */}
          <Card className="bg-black/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Style</CardTitle>
              <p className="text-gray-300 text-sm">Choose the style you want to use</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {styles.map((style) => (
                  <div
                    key={style.id}
                    className={`relative rounded-lg overflow-hidden cursor-pointer transition-all border-2 ${
                      selectedStyle === style.id
                        ? 'border-purple-500 scale-105 shadow-lg shadow-purple-500/25'
                        : 'border-purple-500/20 hover:border-purple-400/50 hover:scale-102'
                    }`}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    <div className="aspect-square">
                      <img
                        src={style.image}
                        alt={style.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 text-white text-xs p-3 text-center font-medium ${
                      selectedStyle === style.id ? 'bg-purple-600' : 'bg-purple-600/80'
                    }`}>
                      {style.name}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!uploadedImage || isGenerating}
            className="w-full h-12 text-lg bg-purple-600 hover:bg-purple-700 text-white font-medium"
          >
            {isGenerating ? (
              <>
                <RotateCcw className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Image
              </>
            )}
          </Button>
        </div>

        {/* Right Panel - Result */}
        <Card className="h-fit bg-black/20 border-purple-500/30 backdrop-blur">
          <CardContent className="p-8">
            <div className="aspect-[4/5] bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg flex items-center justify-center relative overflow-hidden border border-purple-500/20">
              {isGenerating ? (
                <div className="text-center text-white">
                  <div className="relative w-20 h-20 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
                  </div>
                  <p className="text-xl font-medium">Wait a minute ...</p>
                </div>
              ) : generatedImage ? (
                <div className="w-full h-full">
                  <img
                    src={generatedImage}
                    alt="Generated result"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ) : uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Preview"
                  className="w-full h-full object-cover opacity-50"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <Upload className="w-20 h-20 mx-auto mb-6 opacity-30" />
                  <p className="text-base">Upload an image to see preview</p>
                </div>
              )}
            </div>
            
            {/* Action buttons và timestamp khi có kết quả */}
            {generatedImage && !isGenerating && (
              <div className="mt-6 space-y-4">
                <div className="flex gap-4">
                  <Button className="flex-1 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-base">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                  <Button className="flex-1 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-base">
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Regenerate
                  </Button>
                  <Button className="flex-1 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-base">
                    <Frame className="w-5 h-5 mr-2" />
                    Frame
                  </Button>
                </div>
                <div className="text-right text-gray-300 text-base font-medium pt-2">
                  {generationTime}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImageGenerator;
