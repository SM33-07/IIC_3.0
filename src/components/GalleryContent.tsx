import React, { useState, useEffect } from 'react';  
import { Camera, X, Layers, Code, Layout, Circle, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollVelocityContainer, ScrollVelocityRow } from './magicui/scroll-based-velocity';
import Carousel, { CarouselItem } from './Carousel';
import AuroraText from './AuroraText';

const GalleryContent: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'iic2' | 'iic'>('iic2');
  const [layoutMode, setLayoutMode] = useState<'quilt' | 'grid'>('quilt');

  // Present IIC (2024 Edition) images
  const iicImages = [
    {
      url: "/20241115_101932.webp",
      title: "Inauguration",
      year: "2024",
      featured: true
    },
    {
      url: "/20241115_224002.webp",
      title: "Coding Session",
      year: "2024"
    },
    {
      url: "/20241115_224201.webp",
      title: "Mentorship Support",
      year: "2024"
    },
    {
      url: "/20241116_122330.webp",
      title: "Hackathon Day",
      year: "2024"
    },
    {
      url: "/IMG_0001.webp",
      title: "Presentations",
      year: "2024"
    },
    {
      url: "/IMG_1930.webp",
      title: "Evaluation Round",
      year: "2024",
      featured: true
    },
    {
      url: "/IMG_2016.webp",
      title: "Main Stage",
      year: "2024"
    },
    {
      url: "/IMG_2025.webp",
      title: "Winning Teams",
      year: "2024"
    },
    {
      url: "/IMG_2028.webp",
      title: "Project Pitch",
      year: "2024"
    },
    {
      url: "/IMG_2038.webp",
      title: "Jury Discussion",
      year: "2024"
    },
    {
      url: "/IMG_2094.webp",
      title: "Organizers & Teams",
      year: "2024",
      featured: true
    },
    {
      url: "/IMG_2121.webp",
      title: "Valedictory Stage",
      year: "2024"
    },
    {
      url: "/IMG_20241116_015025_570.webp",
      title: "Team Collaboration",
      year: "2024"
    },
    {
      url: "/IMG20241115230723.webp",
      title: "Development Phase",
      year: "2024"
    },
    {
      url: "/IMG_0004.webp",
      title: "Audience Presentation",
      year: "2024"
    }
  ];

  // New IIC 2.0 (2025 Edition) images
  const iic2Images = [
    { url: "/iic2/DSC00721.webp", title: "Registration & Welcome", year: "2025", featured: true },
    { url: "/iic2/DSC00788.webp", title: "Mentorship Session", year: "2025" },
    { url: "/iic2/DSC00802.webp", title: "Panel Discussion", year: "2025", featured: true },
    { url: "/iic2/DSC00840.webp", title: "Audience Q&A", year: "2025" },
    { url: "/iic2/DSC00964.webp", title: "Technical Mentorship", year: "2025" },
    { url: "/iic2/DSC01091.webp", title: "Grand Ceremony Stage", year: "2025" },
    { url: "/iic2/DSC01098.webp", title: "Expert Support", year: "2025" },
    { url: "/iic2/DSC01115.webp", title: "Main Event Presentations", year: "2025", featured: true },
    { url: "/iic2/DSC01205.webp", title: "Jury Judgements", year: "2025" },
    { url: "/iic2/DSC01568.webp", title: "Pitching Round", year: "2025" },
    { url: "/iic2/DSC01786.webp", title: "Working Prototypes", year: "2025" },
    { url: "/iic2/DSC01802.webp", title: "Closing Addresses", year: "2025" },
    { url: "/iic2/DSC01941.webp", title: "Award Distribution", year: "2025" },
    { url: "/iic2/DSC02007.webp", title: "Winners Group", year: "2025" },
    { url: "/iic2/DSC02050.webp", title: "Hackathon Dev Work", year: "2025" },
    { url: "/iic2/DSC02071.webp", title: "Inaugural Addresses", year: "2025" },
    { url: "/iic2/DSC09525.webp", title: "Valedictory Highlights", year: "2025", featured: true },
    { url: "/iic2/DSC09541.webp", title: "Team Pitching", year: "2025" },
    { url: "/iic2/DSC09548.webp", title: "Jury Discussion", year: "2025" },
    { url: "/iic2/DSC09567.webp", title: "Speaker Keynote", year: "2025" },
    { url: "/iic2/DSC09571.webp", title: "Mentors Connect", year: "2025" },
    { url: "/iic2/DSC09580.webp", title: "Innovative Prototypes", year: "2025" },
    { url: "/iic2/HTP09710.webp", title: "Inauguration Lights", year: "2025", featured: true },
    { url: "/iic2/HTP09730.webp", title: "Lamp Lighting Ceremony", year: "2025" },
    { url: "/iic2/IMG_0004-Enhanced-NR.webp", title: "Development Phase", year: "2025" },
    { url: "/iic2/IMG_0006-Enhanced-NR.webp", title: "Team Collaboration", year: "2025" },
    { url: "/iic2/IMG_0009-Enhanced-NR.webp", title: "Prototype Testing", year: "2025" },
    { url: "/iic2/IMG_0015-Enhanced-NR.webp", title: "Jury Evaluation", year: "2025" },
    { url: "/iic2/IMG_9769-Enhanced-NR.webp", title: "Registration Desk", year: "2025" },
    { url: "/iic2/IMG_9864-Enhanced-NR.webp", title: "Hackathon Start", year: "2025" },
    { url: "/iic2/IMG_9872-Enhanced-NR.webp", title: "Coding Session 2.0", year: "2025" },
    { url: "/iic2/IMG_9997-Enhanced-NR.webp", title: "Winner Celebrations", year: "2025", featured: true }
  ];

  // IIC 2.0 Highlights for Carousel
  const carouselItemsIic2: CarouselItem[] = [
    {
      id: 1,
      title: "Registration & Welcome",
      description: "Getting ready for IIC 2.0.",
      image: "/iic2/DSC00721.webp",
      icon: <Layers className="h-4 w-4 text-teal-400" />
    },
    {
      id: 2,
      title: "Interactive Discussion",
      description: "Audience asking questions during the panels.",
      image: "/iic2/DSC00802.webp",
      icon: <Layout className="h-4 w-4 text-teal-400" />
    },
    {
      id: 3,
      title: "Main Stage Presentation",
      description: "Showcasing projects to the panel of judges.",
      image: "/iic2/DSC01115.webp",
      icon: <Circle className="h-4 w-4 text-teal-400" />
    },
    {
      id: 4,
      title: "Closing Ceremonies",
      description: "Distribution of awards to the hackathon winners.",
      image: "/iic2/DSC01941.webp",
      icon: <FileText className="h-4 w-4 text-teal-400" />
    },
    {
      id: 5,
      title: "Worthy Winners",
      description: "Outstanding teams celebrating their victory.",
      image: "/iic2/DSC02007.webp",
      icon: <Code className="h-4 w-4 text-teal-400" />
    }
  ];

  // IIC 1.0 Highlights for Carousel
  const carouselItemsIic: CarouselItem[] = [
    {
      id: 1,
      title: "IIC Inauguration",
      description: "Lighting the ceremonial lamp to kick off the event.",
      image: "/20241115_101932.webp",
      icon: <Layers className="h-4 w-4 text-teal-400" />
    },
    {
      id: 2,
      title: "Night Hackathon Phase",
      description: "Working relentlessly through the midnight coding hours.",
      image: "/20241115_224002.webp",
      icon: <Code className="h-4 w-4 text-teal-400" />
    },
    {
      id: 3,
      title: "Expert Mentorship",
      description: "Mentors checking progress and giving strategies.",
      image: "/20241115_224201.webp",
      icon: <Layout className="h-4 w-4 text-teal-400" />
    },
    {
      id: 4,
      title: "Jury Judgements",
      description: "Mentors evaluating solutions at the work desks.",
      image: "/IMG_1930.webp",
      icon: <Circle className="h-4 w-4 text-teal-400" />
    },
    {
      id: 5,
      title: "Core Teams Group",
      description: "Celebrating the hard work of all participants.",
      image: "/IMG_2025.webp",
      icon: <FileText className="h-4 w-4 text-teal-400" />
    }
  ];

  const activeImages = activeTab === 'iic2' ? iic2Images : iicImages;

  const handleNextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % activeImages.length);
  };

  const handlePrevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + activeImages.length) % activeImages.length);
  };

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, activeImages]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div className="min-h-screen space-bg">
      <main className="container mx-auto px-4 py-20">
        {/* Gallery Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h1 className="mb-4">
            <AuroraText className="text-5xl md:text-7xl font-black uppercase tracking-wider">Event Gallery</AuroraText>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-400 via-sky-400 to-emerald-400 mx-auto mb-6 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.5)]"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Relive the memorable moments, interactive workshops, and hackathon spirit from IIC editions.
          </p>
        </div>

        {/* Magic UI Scroll-Based Velocity Marquee Hero Showcase */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-14 mb-20 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-md relative z-20 animate-on-scroll min-h-[500px]">
          <ScrollVelocityContainer className="w-full">
            <ScrollVelocityRow baseVelocity={2.5} direction={1} className="py-3">
              {iic2Images.slice(0, 8).map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => { setActiveTab('iic2'); setSelectedIndex(idx); }}
                  className="mx-4 relative group overflow-hidden rounded-2xl h-48 w-72 md:h-56 md:w-80 border border-white/10 shadow-xl cursor-pointer"
                  style={{ willChange: 'transform' }}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    style={{ willChange: 'transform' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider mb-0.5">IIC 2.0 (2025)</span>
                    <span className="text-white text-sm font-semibold truncate">{img.title}</span>
                  </div>
                </div>
              ))}
            </ScrollVelocityRow>
            
            <ScrollVelocityRow baseVelocity={2.5} direction={-1} className="py-3">
              {iicImages.slice(0, 8).map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => { setActiveTab('iic'); setSelectedIndex(idx); }}
                  className="mx-4 relative group overflow-hidden rounded-2xl h-48 w-72 md:h-56 md:w-80 border border-white/10 shadow-xl cursor-pointer"
                  style={{ willChange: 'transform' }}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    style={{ willChange: 'transform' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider mb-0.5">IIC (2024)</span>
                    <span className="text-white text-sm font-semibold truncate">{img.title}</span>
                  </div>
                </div>
              ))}
            </ScrollVelocityRow>
          </ScrollVelocityContainer>

          <div className="from-[#020617] via-transparent to-[#020617] pointer-events-none absolute inset-0 z-30 bg-gradient-to-r opacity-50"></div>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex flex-col items-center gap-4 mb-12 animate-on-scroll relative z-30">
          <div className="flex p-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-xl">
            <button
              onClick={() => setActiveTab('iic2')}
              className={`px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-500 ${
                activeTab === 'iic2'
                  ? 'bg-gradient-to-r from-teal-400 to-sky-400 text-black shadow-md scale-105'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              IIC 2.0 (2025)
            </button>
            <button
              onClick={() => setActiveTab('iic')}
              className={`px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-500 ${
                activeTab === 'iic'
                  ? 'bg-gradient-to-r from-teal-400 to-sky-400 text-black shadow-md scale-105'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              IIC (2024)
            </button>
          </div>

          {/* Segmented Layout Mode Switcher */}
          <div className="flex p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/5 shadow-md">
            <button
              onClick={() => setLayoutMode('quilt')}
              className={`px-5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                layoutMode === 'quilt'
                  ? 'bg-teal-500/20 text-teal-400 border border-teal-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Quilted Collage
            </button>
            <button
              onClick={() => setLayoutMode('grid')}
              className={`px-5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                layoutMode === 'grid'
                  ? 'bg-teal-500/20 text-teal-400 border border-teal-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Symmetrical Grid
            </button>
          </div>
        </div>

        {/* Active Section Content with Framer Motion Switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Carousel Showcase for active tab */}
            <div className="w-full flex flex-col items-center justify-center mb-16 py-10 border-y border-white/5 bg-white/[0.01] relative z-20">
              <div className="text-center mb-6">
                <span className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-1 block">Highlight Showcase</span>
                <h3 className="text-xl font-bold text-white">
                  {activeTab === 'iic2' ? 'IIC 2.0 Highlights' : 'IIC Highlights'}
                </h3>
              </div>
              <div className="max-w-full flex justify-center overflow-x-hidden">
                <Carousel 
                  items={activeTab === 'iic2' ? carouselItemsIic2 : carouselItemsIic} 
                  baseWidth={1112} 
                  baseHeight={646}
                  autoplay={true} 
                  autoplayDelay={3500} 
                  pauseOnHover={true} 
                  loop={true} 
                />
              </div>
            </div>

            {/* Quilted or Symmetrical Grid for active tab */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 grid-flow-row-dense"
            >
              {activeImages.map((image, index) => {
                const isFeatured = layoutMode === 'quilt' && image.featured;
                return (
                  <motion.div
                    layout
                    key={index}
                    onMouseMove={handleCardMouseMove}
                    className={`group relative overflow-hidden rounded-xl cursor-pointer border border-white/5 hover:border-teal-500/40 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isFeatured ? 'md:col-span-2 md:row-span-2 h-[544px]' : 'col-span-1 row-span-1 h-64'
                    }`}
                    style={
                      {
                        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.01), rgba(11, 22, 44, 0.8))',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)'
                      } as React.CSSProperties
                    }
                    whileHover={{ y: -6, scale: 1.015 }}
                    onClick={() => setSelectedIndex(index)}
                  >
                    {/* Spotlight glow layer inside card */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 group-hover:opacity-100 z-10"
                      style={{
                        background: 'radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), rgba(45, 212, 191, 0.15), transparent 85%)'
                      }}
                    />

                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20">
                      <h3 className="text-white font-bold text-xl gradient-text">{image.title}</h3>
                      <p className="text-gray-300">{image.year}</p>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <div className="bg-gradient-to-br from-teal-500/20 to-emerald-600/20 p-2 rounded-full backdrop-blur-sm">
                        <Camera className="h-5 w-5 text-teal-400" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Full Image Slideshow Lightbox Viewer */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-md"
              onClick={() => setSelectedIndex(null)}
            >
              {/* Left Arrow Button */}
              <button
                onClick={handlePrevImage}
                className="absolute left-6 md:left-12 p-3 rounded-full bg-black/60 border border-white/10 text-white hover:bg-teal-400 hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer shadow-2xl z-50"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={handleNextImage}
                className="absolute right-6 md:right-12 p-3 rounded-full bg-black/60 border border-white/10 text-white hover:bg-teal-400 hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer shadow-2xl z-50"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-w-4xl w-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={activeImages[selectedIndex].url}
                  alt={activeImages[selectedIndex].title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl border border-teal-500/20"
                />
                
                {/* Title overlay in Lightbox */}
                <div className="mt-4 text-center">
                  <h4 className="text-white font-bold text-lg">{activeImages[selectedIndex].title}</h4>
                  <p className="text-gray-400 text-sm">Edition {activeImages[selectedIndex].year} • {selectedIndex + 1} of {activeImages.length}</p>
                </div>

                <button
                  className="absolute top-4 right-4 glass-card p-2 rounded-full text-white hover:text-teal-400 hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedIndex(null)}
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