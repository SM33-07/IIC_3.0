import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProblemStatementsContent from '../components/ProblemStatementsContent';
import GlowingParticles from '../components/GlowingParticles';

const ProblemStatements: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1931] relative">
      <GlowingParticles />
      <Navbar />
      <ProblemStatementsContent />
      <Footer />
    </div>
  );
};

export default ProblemStatements;