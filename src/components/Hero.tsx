import React, { useEffect, useState } from 'react';
import { Zap, Calendar, MapPin, Rocket } from 'lucide-react';
import GlowingParticles from './GlowingParticles';
import Pdf from '/problem_statements.pdf'

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);



  return (
    <section
      id="hero"
      className="relative min-h-screen pt-20 overflow-hidden space-bg flex items-center"
    >
      {/* Glowing Particles */}
      <GlowingParticles />

      {/* Floating geometric shapes */}
      <div className="floating-shapes"></div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div
            className={`max-w-2xl mb-12 lg:mb-0 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >

            <div className="inline-block px-6 py-2 mb-6 rounded-full glass-card">
              <p className="text-white font-medium flex items-center">
                <Rocket size={18} className="mr-2 text-pink-400" />
                <span className="gradient-text">Submissions started!</span>
              </p>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              <span className="gradient-text">IIC</span> <span className="text-pink-400">2.0</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-cyan-300">Innovation Unleashed</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We're back with bigger impact and bolder innovation. Join the most anticipated hackathon of 2025 where dreams become reality.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <button className="modern-button neon-button py-4 px-8 rounded-lg text-center font-bold transition-all duration-300 shadow-md"
              onClick={() => window.open('https://docs.google.com/forms/d/1r6umjVOO-wcnGa-XwrCkjcvPk2f8rcAo1msmgnfnCz0/edit', '_blank')} >
                Submit
              </button>
              <button className="glass-card hover:glass-card text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 text-center border border-cyan-400/30 shadow-sm"
              onClick={() => window.open(Pdf, '_blank')}>
                View Problems
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-300">
              <div className="flex items-center">
                <Calendar size={20} className="mr-2 text-pink-400" />
                <span>September 8-9, 2025</span>
              </div>
              <div className="flex items-center">
                <MapPin size={20} className="mr-2 text-cyan-400" />
                <span>Manipal University Jaipur</span>
              </div>
            </div>
          </div>

          <div
            className={`relative w-full max-w-md transition-all duration-1000 delay-300 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="relative z-10 glass-card p-8 rounded-2xl">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full opacity-20 blur-xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-20 blur-xl -z-10"></div>

              {/* Hackathon Logo in Card */}
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mb-4">
                  <Zap className="h-8 w-8 text-pink-400" />
                </div>
                <h3 className="gradient-text text-2xl font-bold mb-2">Get Ready!</h3>
                <p className="text-gray-300">The future starts here</p>
              </div>

              <div className="space-y-4">
                <ul className="text-left text-gray-300 space-y-3">
                  {[
                    "Open to all innovators",
                    "₹7L+ in goodies and prizes",
                    "Expert mentorship",
                    "Global networking opportunities"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-cyan-400 mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 p-4 glass-card rounded-lg">
                <p className="text-pink-300 text-center font-medium">
                  "Where Innovation Meets Opportunity"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;