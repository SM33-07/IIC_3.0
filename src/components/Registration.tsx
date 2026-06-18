import React, { useEffect, useRef } from 'react';
import { Check, Rocket, Sparkles } from 'lucide-react';

const Registration: React.FC = () => {

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elementsToAnimate = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elementsToAnimate?.forEach((el) => observer.observe(el));

    return () => {
      elementsToAnimate?.forEach((el) => observer.unobserve(el));
    };
  }, []);


  const benefits = [
    "Connect with industry professionals and peers",
    "Compete for ₹7L+ in prizes",
    "Learn new skills and technologies",
    "Build your portfolio with impressive projects",
    "Potential job opportunities with sponsor companies"
  ];

  return (
    <section id="register" ref={sectionRef} className="py-20 space-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mb-4 animate-on-scroll opacity-0">
            <Rocket className="h-8 w-8 text-pink-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-on-scroll opacity-0">
            Register for <span className="gradient-text">IIC 2.0</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-on-scroll opacity-0">
            Secure your spot for the biggest hackathon of the year.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl animate-on-scroll opacity-0">
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="flex items-center justify-center mb-8">
                <Sparkles className="h-8 w-8 text-pink-400 mr-3" />
                <h3 className="text-3xl font-bold gradient-text">Why Join IIC 2.0?</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start p-4 glass-card rounded-lg">
                      <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-full p-1 mt-1 mr-4 flex-shrink-0">
                        <Check className="h-4 w-4 text-white"/>
                      </div>
                      <span className="text-gray-300 text-lg">{benefit}</span>
                    </div>
                ))}
              </div>

              <div className="text-center">
                <button className="modern-button neon-button py-4 px-12 rounded-lg text-xl font-bold transition-all duration-300 shadow-md"
                onClick={() => window.open('https://unstop.com/hackathons/international-innovation-challenge-20-manipal-university-mu-jaipur-1527559', '_blank')}>
                  <Rocket size={20} className="inline mr-2" />
                  Register Now!!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;