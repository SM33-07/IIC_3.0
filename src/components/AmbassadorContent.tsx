import React, { useEffect, useRef } from 'react';
import { Users, Award, Star, Zap, Gift, Network, Trophy, TrendingUp, Sparkles } from 'lucide-react';

const AmbassadorContent: React.FC = () => {
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

  const perks = [
    {
      icon: <Award className="h-8 w-8 text-yellow-400" />,
      title: "Recognition Certificate & Goodies",
      description: "Official certificate for your leadership and contribution. Cool swags, gadgets and exclusive merch!"
    },
    {
      icon: <Gift className="h-8 w-8 text-pink-400" />,
      title: "Exclusive Perks",
      description: "Ambassador-only swags and VIP access to special events and sessions."
    },
    {
      icon: <Network className="h-8 w-8 text-cyan-400" />,
      title: "Participation Certificate & Networking",
      description: "Connect with top peers and tech leaders. Build valuable professional relationships."
    },
    {
      icon: <Trophy className="h-8 w-8 text-purple-400" />,
      title: "Performance Rewards",
      description: "8+ signups = free team entry, social media shoutout, and website feature."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-400" />,
      title: "Skill Development & Resume Boost",
      description: "Showcase leadership, communication, and tech community building skills."
    },
    {
      icon: <Star className="h-8 w-8 text-orange-400" />,
      title: "Early Access",
      description: "Get first access to event updates, workshops, and exclusive content."
    }
  ];

  const responsibilities = [
    "Promote IIC 2.0 on your campus and social media",
    "Organize tech talks and awareness sessions",
    "Help students with registration and queries",
    "Share event updates and announcements",
    "Build a community of tech enthusiasts",
    "Collect feedback and suggestions from participants"
  ];

  return (
    <div className="min-h-screen space-bg">
      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mb-4">
            <Users className="h-8 w-8 text-pink-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join the <span className="gradient-text">Movement</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Be a part of something bigger! Become a{' '}
            <span className="gradient-text font-semibold">Campus Ambassador</span>{' '}
            and help us build a thriving, innovative community. Share ideas, spread awareness, and lead your campus toward a brighter, tech-forward future.
          </p>
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="h-8 w-8 text-pink-400 mr-3" />
            <h2 className="text-3xl font-bold gradient-text">Ambassador Perks & Benefits</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, index) => (
              <div
                key={index}
                className="glass-card rounded-xl p-6 hover:glass-card transition-all duration-300 hover:transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 inline-flex p-4 rounded-lg mb-4">
                  {perk.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{perk.title}</h3>
                <p className="text-gray-300">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <Zap className="h-6 w-6 text-pink-400 mr-3" />
              <h3 className="text-2xl font-bold gradient-text">Your Responsibilities</h3>
            </div>
            <ul className="space-y-4">
              {responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start">
                  <div className="min-w-4 h-4 mt-1 mr-3 rounded-full bg-gradient-to-r from-pink-400 to-cyan-400"></div>
                  <span className="text-gray-300">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-2xl font-bold gradient-text mb-6">Why Become an Ambassador?</h3>
            <div className="space-y-6">
              {[
                { number: "500+", label: "Students Reached" },
                { number: "50+", label: "Campus Partners" },
                { number: "100%", label: "Career Growth" },
                { number: "24/7", label: "Community Support" }
              ].map((stat, index) => (
                <div key={index} className="flex items-center">
                  <div className="text-3xl font-bold gradient-text mr-4">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
            {/*<div className="mt-8 p-4 glass-card rounded-lg">
              <p className="text-gray-300 text-sm">
                "Being an IIC Ambassador has been an incredible journey of growth, leadership, and community building. The experience has opened doors I never imagined possible."
              </p>
              <p className="gradient-text text-sm mt-2 font-medium">- Previous Ambassador</p>
            </div>*/}
          </div>
        </div>

        <div className="text-center">
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Trophy className="h-8 w-8 text-yellow-400 mr-3" />
              <h3 className="text-3xl font-bold gradient-text">Ready to Lead?</h3>
            </div>
            <p className="text-gray-300 mb-8 text-lg">
              Applications are now open! Join our community of passionate leaders and make a real impact on your campus.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe6ijcmxTn81PlqAFyGi8QxcUmkxcaGJZT5OoOfFGsIFegi4Q/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="modern-button neon-button inline-block px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Apply Now
            </a>
            <p className="text-gray-400 text-sm mt-4">
              Applications close soon. Don't miss your chance to be part of the movement!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AmbassadorContent;