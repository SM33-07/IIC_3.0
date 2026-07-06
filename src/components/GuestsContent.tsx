import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import ChromaGrid, { ChromaItem } from "./ChromaGrid";
import AuroraText from "./AuroraText";

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

  const guests: ChromaItem[] = [
    { 
      image: "/guest1.webp", 
      title: "Jai G. Singla",
      subtitle: "Scientist Engineer SF, SAC-ISRO",
      borderColor: "#2dd4bf",
      gradient: "linear-gradient(145deg, rgba(13, 148, 136, 0.4), rgba(11, 22, 44, 0.75))"
    },
    { 
      image: "/guest2.webp", 
      title: "Arjun Kumar",
      subtitle: "Associate Director & Scientist, DRDO",
      borderColor: "#3b82f6",
      gradient: "linear-gradient(145deg, rgba(37, 99, 235, 0.4), rgba(11, 22, 44, 0.75))"
    },
    { 
      image: "/guest3.webp", 
      title: "Jean Calleja Agius",
      subtitle: "Head of Anatomy, University of Malta",
      borderColor: "#10b981",
      gradient: "linear-gradient(145deg, rgba(4, 120, 87, 0.4), rgba(11, 22, 44, 0.75))"
    },
    { 
      image: "/guest4.webp", 
      title: "Ing. Carl James Debono",
      subtitle: "Dean, University of Malta",
      borderColor: "#8b5cf6",
      gradient: "linear-gradient(145deg, rgba(109, 40, 217, 0.4), rgba(11, 22, 44, 0.75))"
    },
    { 
      image: "/guest5.webp", 
      title: "Neville Calleja",
      subtitle: "Chair, European Health Information Initiative, WHO",
      borderColor: "#ef4444",
      gradient: "linear-gradient(145deg, rgba(185, 28, 28, 0.4), rgba(11, 22, 44, 0.75))"
    },
    { 
      image: "/guest6.webp", 
      title: "Lalit Garg",
      subtitle: "Professor, University of Malta",
      borderColor: "#2dd4bf",
      gradient: "linear-gradient(145deg, rgba(13, 148, 136, 0.4), rgba(11, 22, 44, 0.75))"
    },
    { 
      image: "/guest7.webp", 
      title: "Varadraj P. Gurupur",
      subtitle: "Professor, University of Central Florida",
      borderColor: "#3b82f6",
      gradient: "linear-gradient(145deg, rgba(37, 99, 235, 0.4), rgba(11, 22, 44, 0.75))"
    },
    { 
      image: "/guest8.webp", 
      title: "Vincent Lopez",
      subtitle: "CEO, Parker Health Inc., USA",
      borderColor: "#10b981",
      gradient: "linear-gradient(145deg, rgba(4, 120, 87, 0.4), rgba(11, 22, 44, 0.75))"
    },
  ];

  return (
    <div className="min-h-screen space-bg" ref={sectionRef}>
      <main className="container mx-auto px-4 py-20">
        <div className="animate-on-scroll opacity-0">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-gradient-to-br from-teal-500/20 to-emerald-600/20 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-teal-400" />
            </div>
            <h3 className="mb-2">
              <AuroraText className="text-3xl font-bold uppercase tracking-wider">Our Guests</AuroraText>
            </h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-teal-400 to-sky-400 mx-auto"></div>
          </div>
          
          <div className="max-w-5xl mx-auto flex justify-center">
            <ChromaGrid items={guests} radius={300} disableGrayscale={true} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuestsContent;
