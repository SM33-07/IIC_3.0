import React, { useEffect, useRef } from 'react';
import { Terminal, Globe, GraduationCap, Gem, Sparkles } from 'lucide-react';
import AuroraText from './AuroraText';

const About: React.FC = () => {
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

    const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    animatedElements?.forEach((el) => observer.observe(el));

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      icon: <Terminal className="h-6 w-6 text-teal-400" />,
      title: "36-Hour Hackathon",
      description: "Build robust prototypes from scratch under tight deadlines, tackling critical problem statements."
    },
    {
      icon: <Globe className="h-6 w-6 text-teal-400" />,
      title: "Conference & Expo",
      description: "Attend panels and display your research findings at our global startup carnival and tech exhibitions."
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-teal-400" />,
      title: "Global Mentorship",
      description: "Receive direct, one-on-one evaluations and engineering tips from industry experts and veterans."
    },
    {
      icon: <Gem className="h-6 w-6 text-teal-400" />,
      title: "Grand Prize Pools",
      description: "Compete for cash rewards, incubation support, sponsor track bounties, and international trophies."
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 space-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-gradient-to-br from-teal-500/20 to-emerald-600/20 rounded-full mb-4 animate-on-scroll opacity-0">
            <Sparkles className="h-8 w-8 text-teal-400" />
          </div>
          <h2 className="animate-on-scroll opacity-0 mb-4">
            <AuroraText className="text-4xl md:text-5xl font-bold uppercase tracking-wider">About IIC 3.0</AuroraText>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-sky-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto animate-on-scroll opacity-0 leading-relaxed">
            The International Innovation Challenge (IIC) is an empowering platform for young minds to address real-world 
            challenges. The event brings together exceptional talents in a 36-hour hackathon, allowing participants to 
            brainstorm and devise impactful solutions under the mentorship of industry leaders. We will also feature a
            startup carnival and international conference to foster innovation and collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2 animate-on-scroll opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-teal-500/10 to-emerald-600/10 inline-flex p-4 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;