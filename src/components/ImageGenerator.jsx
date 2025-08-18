import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Sparkles, RotateCcw } from 'lucide-react';

const ImageGenerator = () => {
  const [selectedStyle, setSelectedStyle] = useState('anime');
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const styles = [
    {
      id: 'anime',
      name: 'Anime',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=face',
    },
    {
      id: 'oil-painting',
      name: 'Oil painting',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=200&fit=crop',
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop',
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
    setIsGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
          Image to Image
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold gradient-text">
          AI Generator
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Panel - Controls */}
        <div className="space-y-6">
          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Image upload</CardTitle>
              <p className="text-gray-300 text-sm">Upload an image to use as a reference</p>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-purple-500 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <Button variant="gradient" className="mb-2">
                    Upload image
                  </Button>
                  <p className="text-gray-400 text-xs">
                    We accept .jpeg, .jpg, .png, .webp formats up to 24MB.
                  </p>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Style Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Style</CardTitle>
              <p className="text-gray-300 text-sm">Choose the style you want to use</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {styles.map((style) => (
                  <div
                    key={style.id}
                    className={`relative rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedStyle === style.id
                        ? 'ring-2 ring-purple-500 scale-105'
                        : 'hover:scale-102'
                    }`}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    <img
                      src={style.image}
                      alt={style.name}
                      className="w-full h-20 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-2 text-center">
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
            className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
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

        {/* Right Panel - Preview */}
        <Card className="h-fit">
          <CardContent className="p-6">
            <div className="aspect-square bg-gradient-to-br from-purple-900 to-pink-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              {isGenerating ? (
                <div className="text-center text-white">
                  <RotateCcw className="w-12 h-12 mx-auto mb-4 animate-spin" />
                  <p>Wait a minute ...</p>
                </div>
              ) : uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Upload an image to see preview</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImageGenerator;
