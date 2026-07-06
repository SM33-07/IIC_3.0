import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Timeline from '../components/Timeline';
import GlowingParticles from '../components/GlowingParticles';

const TimelinePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative">
      <GlowingParticles />
      <Navbar />
      <div className="pt-20">
        <Timeline />
      </div>
      <Footer />
    </div>
  );
};

export default TimelinePage;
