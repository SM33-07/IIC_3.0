import React, { useEffect, useRef } from 'react';
import { Code, Lightbulb, Users, Trophy, Sparkles } from 'lucide-react';

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

    const elementsToAnimate = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elementsToAnimate?.forEach((el) => observer.observe(el));

    return () => {
      elementsToAnimate?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      icon: <Code className="h-8 w-8 text-pink-400" />,
      title: "Code with Purpose",
      description: "Build innovative solutions that address real-world challenges across various domains."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-cyan-400" />,
      title: "Learn & Grow",
      description: "Expand your skills through workshops, mentorship sessions, and hands-on experience."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-400" />,
      title: "Connect & Collaborate",
      description: "Network with fellow developers, designers, and industry professionals."
    },
    {
      icon: <Trophy className="h-8 w-8 text-yellow-400" />,
      title: "Win Big",
      description: "Compete for substantial prizes and recognition for your innovative solutions."
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 space-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mb-4 animate-on-scroll opacity-0">
            <Sparkles className="h-8 w-8 text-pink-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-on-scroll opacity-0">
            About <span className="gradient-text">IIC 2.0</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto animate-on-scroll opacity-0 leading-relaxed">
            The International Innovation Challenge (IIC) is an empowering platform for young minds to address real-world 
            challenges. The event brings together exceptional talents in a 36-hour hackathon, allowing participants to 
            brainstorm and devise impactful solutions under the mentorship of industry leaders. We will also feature a
            startup carnival and international conference to foster innovation and collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2 animate-on-scroll opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 inline-flex p-4 rounded-lg mb-4">
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