import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SponsorsContent from '../components/SponsorsContent';
import GlowingParticles from '../components/GlowingParticles';

const Sponsors: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1931] relative">
      <GlowingParticles />
      <Navbar />
      <SponsorsContent />
      <Footer />
    </div>
  );
};

export default Sponsors;