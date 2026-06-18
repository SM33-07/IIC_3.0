import React, { useEffect, useRef } from 'react';
import { Trophy, Award, Star, Zap, Crown, Gift } from 'lucide-react';

const Prizes: React.FC = () => {
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

  const mainPrizes = [
    {
      position: "1st Place",
      icon: <Crown className="h-12 w-12 text-yellow-400" />,
      prize: "₹75,000",
      gradient: "from-yellow-400 via-orange-500 to-red-500",
      benefits: [
        /*"Cash prize of ₹1,00,000",
        "Meetings with top venture capitalists",
        "6-month mentorship program",
        "Featured in TechCrunch article"*/
      ]
    },
    {
      position: "2nd Place",
      icon: <Trophy className="h-12 w-12 text-gray-300" />,
      prize: "₹50,000",
      gradient: "from-gray-300 via-gray-400 to-gray-500",
      benefits: [
        /*"Cash prize of ₹50,000",
        "3-month accelerator program",
        "Industry mentorship connections"*/
      ]
    },
    {
      position: "3rd Place",
      icon: <Award className="h-12 w-12 text-amber-600" />,
      prize: "₹25,000",
      gradient: "from-amber-600 via-amber-700 to-amber-800",
      benefits: [
        /*"Cash prize of ₹25,000",
        "Hardware development kit",
        "Exclusive workshop access"*/
      ]
    }
  ];

  // const categoryPrizes = [
  //   {
  //     category: "Best AI Implementation",
  //     prize: "$5,000",
  //     sponsor: "TechAI Labs",
  //     icon: <Star className="h-6 w-6 text-pink-400" />
  //   },
  //   {
  //     category: "Most Innovative Solution",
  //     prize: "$5,000",
  //     sponsor: "InnovateCorp",
  //     icon: <Zap className="h-6 w-6 text-cyan-400" />
  //   },
  //   {
  //     category: "Best Social Impact",
  //     prize: "$5,000",
  //     sponsor: "ImpactFund",
  //     icon: <Gift className="h-6 w-6 text-purple-400" />
  //   },
  //   {
  //     category: "Best UI/UX Design",
  //     prize: "$5,000",
  //     sponsor: "DesignWorks",
  //     icon: <Star className="h-6 w-6 text-pink-400" />
  //   },
  //   {
  //     category: "Most Technical Challenge",
  //     prize: "$5,000",
  //     sponsor: "CodeCraft",
  //     icon: <Zap className="h-6 w-6 text-cyan-400" />
  //   },
  //   {
  //     category: "People's Choice",
  //     prize: "$5,000",
  //     sponsor: "Community Vote",
  //     icon: <Trophy className="h-6 w-6 text-yellow-400" />
  //   }
  // ];

  return (
    <section id="prizes" ref={sectionRef} className="py-20 space-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-full mb-4 animate-on-scroll opacity-0">
            <Trophy className="h-8 w-8 text-yellow-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-on-scroll opacity-0">
            Prizes & <span className="gradient-text">Rewards</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-on-scroll opacity-0">
            7L+ in cash prizes, plus invaluable opportunities, mentorship, and resources for winners.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {mainPrizes.map((prize, index) => (
            <div
              key={index}
              className={`glass-card rounded-2xl p-8 text-center shadow-lg transform transition-all duration-300 hover:-translate-y-2 animate-on-scroll opacity-0 relative overflow-hidden`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${prize.gradient} opacity-5`}></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center bg-gradient-to-br from-pink-500/10 to-purple-600/10 p-4 rounded-full mb-6">
                  {prize.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{prize.position}</h3>
                <div className="text-4xl font-bold gradient-text mb-6">{prize.prize}</div>
                <ul className="space-y-3 text-left">
                  {prize.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start text-gray-300">
                      <Zap className="h-5 w-5 mr-2 text-pink-400 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/*<div className="glass-card rounded-2xl p-8 animate-on-scroll opacity-0">
          <h3 className="text-3xl font-bold gradient-text mb-8 text-center">Category Prizes</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryPrizes.map((category, index) => (
              <div
                key={index}
                className="glass-card rounded-xl p-6 hover:glass-card transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 p-2 rounded-lg">
                    {category.icon}
                  </div>
                  <div className="text-2xl font-bold gradient-text">{category.prize}</div>
                </div>
                <h4 className="text-white font-bold mb-2">{category.category}</h4>
                <div className="text-gray-400 text-sm">Sponsored by {category.sponsor}</div>
              </div>
            ))}
          </div>
        </div>*/}
      </div>
    </section>
  );
};

export default Prizes;