import React, { useState } from 'react';  
import { Camera, X, Layers, Code, Layout, Circle, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CircularGallery from './CircularGallery';
import Carousel, { CarouselItem } from './Carousel';

const GalleryContent: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Present IIC (2024 Edition) images
  const iicImages = [
    {
      url: "/20241115_101932.jpg",
      title: "Inauguration",
      year: "2024",
      featured: true
    },
    {
      url: "/20241115_224002.jpg",
      title: "Coding Session",
      year: "2024"
    },
    {
      url: "/20241115_224201.jpg",
      title: "Mentorship Support",
      year: "2024"
    },
    {
      url: "/20241116_122330.jpg",
      title: "Hackathon Day",
      year: "2024"
    },
    {
      url: "/IMG_0001.jpeg",
      title: "Presentations",
      year: "2024"
    },
    {
      url: "/IMG_1930.JPG",
      title: "Evaluation Round",
      year: "2024",
      featured: true
    },
    {
      url: "/IMG_2016.JPG",
      title: "Main Stage",
      year: "2024"
    },
    {
      url: "/IMG_2025.JPG",
      title: "Winning Teams",
      year: "2024"
    },
    {
      url: "/IMG_2028.JPG",
      title: "Project Pitch",
      year: "2024"
    },
    {
      url: "/IMG_2038.JPG",
      title: "Jury Discussion",
      year: "2024"
    },
    {
      url: "/IMG_2094.JPG",
      title: "Organizers & Teams",
      year: "2024",
      featured: true
    },
    {
      url: "/IMG_2121.JPG",
      title: "Valedictory Stage",
      year: "2024"
    },
    {
      url: "/IMG_20241116_015025_570.jpg",
      title: "Team Collaboration",
      year: "2024"
    },
    {
      url: "/IMG20241115230723.jpg",
      title: "Development Phase",
      year: "2024"
    },
    {
      url: "/IMG_0004.jpeg",
      title: "Audience Presentation",
      year: "2024"
    }
  ];

  // New IIC 2.0 (2025 Edition) images
  const iic2Images = [
    {
      url: "/iic2/DSC00721.jpg",
      title: "Registration & Networking",
      year: "2025",
      featured: true
    },
    {
      url: "/iic2/DSC00788.jpg",
      title: "Mentorship Connect",
      year: "2025"
    },
    {
      url: "/iic2/DSC00802.jpg",
      title: "Inaugural Panel",
      year: "2025",
      featured: true
    },
    {
      url: "/iic2/DSC00840.jpg",
      title: "Audience Q&A",
      year: "2025"
    },
    {
      url: "/iic2/DSC00964.jpg",
      title: "Mentorship Session",
      year: "2025"
    },
    {
      url: "/iic2/DSC01091.jpg",
      title: "Interactive Stage",
      year: "2025"
    },
    {
      url: "/iic2/DSC01098.jpg",
      title: "Expert Guidance",
      year: "2025"
    },
    {
      url: "/iic2/DSC01115.jpg",
      title: "Main Ceremony Stage",
      year: "2025",
      featured: true
    },
    {
      url: "/iic2/DSC01205.jpg",
      title: "Judging Rounds",
      year: "2025"
    },
    {
      url: "/iic2/DSC01568.jpg",
      title: "Team Presentation",
      year: "2025"
    },
    {
      url: "/iic2/DSC01786.jpg",
      title: "Project Review",
      year: "2025"
    },
    {
      url: "/iic2/DSC01802.jpg",
      title: "Valedictory Ceremony",
      year: "2025"
    },
    {
      url: "/iic2/DSC01941.jpg",
      title: "Prize Distribution",
      year: "2025"
    },
    {
      url: "/iic2/DSC02007.jpg",
      title: "Winning Teams 2.0",
      year: "2025"
    },
    {
      url: "/iic2/IMG_9769-Enhanced-NR.jpg",
      title: "Inauguration IIC 2.0",
      year: "2025"
    },
    {
      url: "/iic2/IMG_9864-Enhanced-NR.jpg",
      title: "Hackathon Dev Start",
      year: "2025"
    }
  ];

  // Circular gallery contains top 3 photos from IIC and top 3 from IIC 2.0
  const circularItems = [
    { image: "/20241115_101932.jpg", text: "Inauguration (IIC)" },
    { image: "/20241115_224201.jpg", text: "Mentorship (IIC)" },
    { image: "/IMG_1930.JPG", text: "Jury Evaluation (IIC)" },
    { image: "/iic2/DSC00721.jpg", text: "Welcome (IIC 2.0)" },
    { image: "/iic2/DSC00802.jpg", text: "Discussion (IIC 2.0)" },
    { image: "/iic2/DSC01115.jpg", text: "Keynote (IIC 2.0)" }
  ];

  // 3D Carousel items for transition experience
  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      title: "IIC 2.0 Highlights",
      description: "Celebrating outstanding innovative products and awards.",
      image: "/iic2/DSC01941.jpg",
      icon: <Layers className="h-4 w-4 text-teal-400" />
    },
    {
      id: 2,
      title: "Night Hackathon Phase",
      description: "Working relentlessly through the coding hours.",
      image: "/20241115_224002.jpg",
      icon: <Code className="h-4 w-4 text-teal-400" />
    },
    {
      id: 3,
      title: "Distinguished Panels",
      description: "Experts sharing panel discussion insights.",
      image: "/iic2/DSC00802.jpg",
      icon: <Layout className="h-4 w-4 text-teal-400" />
    },
    {
      id: 4,
      title: "Jury Judgements",
      description: "Mentors evaluating solutions at the tables.",
      image: "/IMG_1930.JPG",
      icon: <Circle className="h-4 w-4 text-teal-400" />
    },
    {
      id: 5,
      title: "Valedictory Ceremony",
      description: "Declaring the winners on the grand stage.",
      image: "/iic2/DSC01115.jpg",
      icon: <FileText className="h-4 w-4 text-teal-400" />
    }
  ];

  return (
    <div className="min-h-screen space-bg">
      <main className="container mx-auto px-4 py-20">
        {/* Gallery Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-gradient-to-br from-teal-500/20 to-emerald-600/20 rounded-full mb-4 animate-on-scroll">
            <Camera className="h-8 w-8 text-teal-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Event Gallery</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-sky-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Relive the memorable moments, interactive workshops, and hackathon spirit from IIC editions.
          </p>
        </div>

        {/* WebGL Interactive Hero Showcase */}
        <div className="w-full h-[450px] mb-20 rounded-2xl overflow-hidden relative z-20 animate-on-scroll">
          <CircularGallery items={circularItems} bend={3} textColor="#2dd4bf" borderRadius={0.05} />
        </div>

        {/* IIC 2.0 SECTION */}
        <section className="mb-20">
          <div className="flex flex-col items-center mb-10 text-center animate-on-scroll">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">IIC 2.0 Gallery</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-teal-400 to-sky-400"></div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 grid-flow-row-dense"
          >
            {iic2Images.map((image, index) => (
              <motion.div
                layout
                key={index}
                className={`group relative overflow-hidden rounded-xl cursor-pointer glass-card hover:glass-card transition-all duration-300 ${
                  image.featured ? 'md:col-span-2 md:row-span-2 h-[544px]' : 'col-span-1 row-span-1 h-64'
                }`}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl gradient-text">{image.title}</h3>
                  <p className="text-gray-300">{image.year}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-gradient-to-br from-teal-500/20 to-emerald-600/20 p-2 rounded-full backdrop-blur-sm">
                    <Camera className="h-5 w-5 text-teal-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 3D Highlight Carousel Section (Acts as a transition divider) */}
        <div className="w-full flex flex-col items-center justify-center my-24 py-12 border-y border-white/5 bg-white/[0.01] relative z-20 animate-on-scroll">
          <div className="text-center mb-8">
            <span className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-1 block">Quick Sneak Peek</span>
            <h3 className="text-xl md:text-2xl font-bold text-white">Event Highlights</h3>
          </div>
          <div className="max-w-full flex justify-center overflow-x-hidden">
            <Carousel items={carouselItems} baseWidth={500} autoplay={true} autoplayDelay={3500} pauseOnHover={true} loop={true} />
          </div>
        </div>

        {/* IIC 1.0 SECTION */}
        <section className="mb-20">
          <div className="flex flex-col items-center mb-10 text-center animate-on-scroll">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">IIC Gallery</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-teal-400 to-sky-400"></div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 grid-flow-row-dense"
          >
            {iicImages.map((image, index) => (
              <motion.div
                layout
                key={index}
                className={`group relative overflow-hidden rounded-xl cursor-pointer glass-card hover:glass-card transition-all duration-300 ${
                  image.featured ? 'md:col-span-2 md:row-span-2 h-[544px]' : 'col-span-1 row-span-1 h-64'
                }`}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl gradient-text">{image.title}</h3>
                  <p className="text-gray-300">{image.year}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-gradient-to-br from-teal-500/20 to-emerald-600/20 p-2 rounded-full backdrop-blur-sm">
                    <Camera className="h-5 w-5 text-teal-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Full Image Modal Viewer */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-md"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl border border-teal-500/20"
                />
                <button
                  className="absolute top-4 right-4 glass-card p-2 rounded-full text-white hover:text-teal-400 hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-6 w-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default GalleryContent;