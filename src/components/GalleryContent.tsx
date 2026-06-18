import React, { useState } from 'react';  
import { Camera, X } from 'lucide-react';

const GalleryContent: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      url: "/20241115_101932.jpg",
      title: "IIC",
      year: "2024"
    },
    {
      url: "/20241115_224002.jpg",
      title: "IIC",
      year: "2024"
    },
    {
      url: "/20241115_224201.jpg",
      title: "IIC",
      year: "2024"
    },
    {
      url: "/20241116_122330.jpg",
      title: "IIC",
      year: "2024"
    },
    {
      url: "/IMG_0001.jpeg",
      title: "IIC",
      year: "2024"
    },
    {
      url: "/IMG_1930.JPG",
      title: "IIC",
      year: "2024"
    },
    {
      url: "/IMG_2016.JPG",
      title: "IIC",
      year: "2024"
    },
    {
      url: "/IMG_2025.JPG",
      title: "IIC",
      year: "2024"
    },
    {
      url: "/IMG_2028.JPG",
      title: "IIC",
      year: "2024"
    },
    {
      url: "/IMG_2038.JPG",
      title: "IIC",
      year: "2024"
    },
    {
      url: "/IMG_2094.JPG",
      title: "IIC",
      year: "2024"
    },
    {
      url: "/IMG_2121.JPG",
      title: "IIC",
      year: "2024"
    },
    {
      url: "/IMG_20241116_015025_570.jpg",
      title: "IIC",
      year: "2024"
    },
    {
      url: "/IMG20241115230723.jpg",
      title: "IIC",
      year: "2024"
    },
    {
      url: "/IMG_0004.jpeg",
      title: "IIC",
      year: "2024"
    }
  ];

  return (
    <div className="min-h-screen space-bg">
      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mb-4">
            <Camera className="h-8 w-8 text-pink-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Event Gallery</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Relive the moments from previous IIC events. Browse through our collection of memories and achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl cursor-pointer glass-card hover:glass-card transition-all duration-300"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-xl gradient-text">{image.title}</h3>
                <p className="text-gray-300">{image.year}</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 p-2 rounded-full backdrop-blur-sm">
                  <Camera className="h-5 w-5 text-pink-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <button
                className="absolute top-4 right-4 glass-card p-2 rounded-full text-white hover:text-pink-400 transition-colors duration-300"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GalleryContent;