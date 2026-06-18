import React, { useEffect, useRef } from 'react';
import { Lightbulb, Shield, AlertTriangle, UserCheck, Lock, Monitor, Home, Heart, Building, Rocket, BookOpen, Sprout, GraduationCap } from 'lucide-react';

const Themes: React.FC = () => {
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

  const themes = [
    { icon: <Shield className="h-8 w-8 text-yellow-400" />, title: "Defense Tech & Strategic Innovation" },
    { icon: <AlertTriangle className="h-8 w-8 text-red-400" />, title: "Disaster Management & Relief" },
    { icon: <UserCheck className="h-8 w-8 text-pink-400" />, title: "Women & Child Safety" },
    { icon: <Lock className="h-8 w-8 text-cyan-400" />, title: "Border & Homeland Security" },
    { icon: <Monitor className="h-8 w-8 text-purple-400" />, title: "Cyber Vigilance & Digital Sovereignty" },
    { icon: <Home className="h-8 w-8 text-green-400" />, title: "Rural Empowerment & Smart Villages" },
    { icon: <Heart className="h-8 w-8 text-pink-500" />, title: "Healthcare & Mental Wellness" },
    { icon: <Building className="h-8 w-8 text-blue-400" />, title: "Urban Infrastructure & Smart Cities" },
    { icon: <Rocket className="h-8 w-8 text-indigo-400" />, title: "Space & Aerotech Innovation" },
    { icon: <BookOpen className="h-8 w-8 text-orange-400" />, title: "Digital Literacy & Access for All" },
    { icon: <Sprout className="h-8 w-8 text-green-500" />, title: "Smart & Sustainable Agriculture" },
    { icon: <GraduationCap className="h-8 w-8 text-teal-400" />, title: "Education & Skill Development" },
  ];

  return (
    <section id="themes" ref={sectionRef} className="py-20 space-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-full mb-4 animate-on-scroll opacity-0">
            <Lightbulb className="h-8 w-8 text-yellow-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-on-scroll opacity-0">
            Themes <span className="gradient-text">IIC 2.0</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto animate-on-scroll opacity-0 leading-relaxed">
            Explore 12 diverse challenge tracks where innovation meets impact. Choose your theme and craft solutions that redefine the future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {themes.map((theme, index) => (
            <div 
              key={index} 
              className="glass-card flex flex-col items-center text-center rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2 animate-on-scroll opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 inline-flex p-4 rounded-lg mb-4">
                {theme.icon}
              </div>
              <h3 className="text-base font-medium text-white mt-3">{theme.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Themes;


