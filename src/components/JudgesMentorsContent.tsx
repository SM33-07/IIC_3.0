import React, { useEffect, useRef } from "react";
import { Users } from "lucide-react";
import ChromaGrid, { ChromaItem } from "./ChromaGrid";

const JudgesMentorsContent: React.FC = () => {
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

  const members: ChromaItem[] = [
    {
      image: "/judge1.png",
      title: "Kushal Vijay",
      subtitle: "Software Engineer, Microsoft",
      borderColor: "#3b82f6",
      gradient: "linear-gradient(145deg, rgba(29, 78, 216, 0.4), rgba(11, 22, 44, 0.75))",
      github: "https://github.com/kushalvijay",
      linkedin: "https://linkedin.com/in/kushalvijay",
      instagram: "https://instagram.com/kushalvijay"
    },
    {
      image: "/judge2.png",
      title: "Swati Maurya",
      subtitle: "Software Engineer, Amazon",
      borderColor: "#10b981",
      gradient: "linear-gradient(145deg, rgba(4, 120, 87, 0.4), rgba(11, 22, 44, 0.75))",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    },
    {
      image: "/mentor1.png",
      title: "Aditi Gupta",
      subtitle: "CEO, TechTip24",
      borderColor: "#f59e0b",
      gradient: "linear-gradient(145deg, rgba(180, 83, 9, 0.4), rgba(11, 22, 44, 0.75))",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    },
    {
      image: "/mentor2.png",
      title: "Bhagirath Giri",
      subtitle: "Director, WsCube Tech",
      borderColor: "#ef4444",
      gradient: "linear-gradient(145deg, rgba(185, 28, 28, 0.4), rgba(11, 22, 44, 0.75))",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    },
    {
      image: "/mentor3.png",
      title: "Sonam Chhikara",
      subtitle: "Associate, PwC Acceleration Centers",
      borderColor: "#8b5cf6",
      gradient: "linear-gradient(145deg, rgba(109, 40, 217, 0.4), rgba(11, 22, 44, 0.75))",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  ];

  return (
    <div className="min-h-screen space-bg" ref={sectionRef}>
      <main className="container mx-auto px-4 py-20">
        {/* Judges & Mentors Section */}
        <div className="animate-on-scroll opacity-0 mb-20">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-gradient-to-br from-teal-500/20 to-emerald-600/20 rounded-full mb-4">
              <Users className="h-8 w-8 text-teal-400" />
            </div>
            <h3 className="text-3xl font-bold gradient-text mb-2">
              Meet the Judges and Mentors
            </h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-teal-400 to-sky-400 mx-auto"></div>
          </div>

          <div className="max-w-5xl mx-auto flex justify-center">
            <ChromaGrid items={members} radius={300} disableGrayscale={true} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default JudgesMentorsContent;
