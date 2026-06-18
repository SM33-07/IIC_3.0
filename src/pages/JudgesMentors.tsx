import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JudgesMentorsContent from "../components/JudgesMentorsContent";
import GlowingParticles from "../components/GlowingParticles";

const JudgesMentors: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1931] relative">
      <GlowingParticles />
      <Navbar />
      <JudgesMentorsContent />
      <Footer />
    </div>
  );
};

export default JudgesMentors;
