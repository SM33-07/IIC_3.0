import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

const GuestsContent: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elementsToAnimate =
      sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elementsToAnimate?.forEach((el) => observer.observe(el));

    return () => {
      elementsToAnimate?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const guests = [
    { 
      icon: <img src="/guest1.png" alt="Guest 1" className="h-20 w-20 object-cover rounded-full" />, 
      name: "Jai G. Singla",
      designation: "Scientist Engineer SF, SAC-ISRO"
    },
    { 
      icon: <img src="/guest2.png" alt="Guest 2" className="h-20 w-20 object-cover rounded-full" />, 
      name: "Arjun Kumar",
      designation: "Associate Director & Scientist, DRDO"
    },
    { 
      icon: <img src="/guest3.png" alt="Guest 3" className="h-20 w-20 object-cover rounded-full" />, 
      name: "Jean Calleja Agius",
      designation: "Head of ANatomy, University of Malta"
    },
    { 
      icon: <img src="/guest4.png" alt="Guest 4" className="h-20 w-20 object-cover rounded-full" />, 
      name: "Ing. Carl James Debono",
      designation: "Dean, University of Malta"
    },
    { 
      icon: <img src="/guest5.png" alt="Guest 5" className="h-20 w-20 object-cover rounded-full" />, 
      name: "Neville Calleja",
      designation: "Chair, European Health Information Initiative, WHO"
    },
    { 
      icon: <img src="/guest6.png" alt="Guest 6" className="h-20 w-20 object-cover rounded-full" />, 
      name: "Lalit Garg",
      designation: "Professor, University of Malta"
    },
    { 
      icon: <img src="/guest7.png" alt="Guest 7" className="h-20 w-20 object-cover rounded-full" />, 
      name: "Varadraj P. Gurupur",
      designation: "Professor, University of Central Florida"
    },
    { 
      icon: <img src="/guest8.png" alt="Guest 8" className="h-20 w-20 object-cover rounded-full" />, 
      name: "Vincent Lopez",
      designation: "CEO, Parker Health Inc., USA"
    },
  ];

  return (
    <div className="min-h-screen space-bg" ref={sectionRef}>
      <main className="container mx-auto px-4 py-20">
        <div className="animate-on-scroll opacity-0">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </div>
            <h3 className="text-3xl font-bold gradient-text mb-2">Our Guests</h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {guests.map((guest, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-6 group relative overflow-hidden text-center"
              >
                <div className="flex items-center justify-center h-20 mb-4">
                  {guest.icon}
                </div>
                <h4 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                  {guest.name}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {guest.designation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuestsContent;
