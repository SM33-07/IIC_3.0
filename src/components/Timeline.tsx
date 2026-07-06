import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, ChevronDown, ChevronUp, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import AuroraText from './AuroraText';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  details?: string;
  highlight?: boolean;
}

interface DayTimeline {
  day: string;
  date: string;
  events: TimelineEvent[];
}

const Timeline: React.FC = () => {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [expandedEventIdx, setExpandedEventIdx] = useState<number | null>(null);
  const [activeEventIdx, setActiveEventIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate position of the scrolling Car along the vertical timeline track
  const carY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const timelineData: DayTimeline[] = [
    {
      day: "Day 1",
      date: "June 10, 2025",
      events: [
        {
          time: "09:00 AM",
          title: "Opening Ceremony",
          description: "Kickoff event with keynote speakers and theme announcement.",
          details: "Join us in the main auditorium to inaugurate the hackathon. We'll host our keynote speakers, introduce our expert mentors and judges panel, and announce the secret themes and guidelines for the challenge tracks."
        },
        {
          time: "10:30 AM",
          title: "Team Formation & Brainstorming",
          description: "Find teammates and brainstorm project ideas.",
          details: "Collaborate with other developers, designers, and domain experts. If you registered solo, this session is perfect to pitch ideas and form a winning team of 2-4 members."
        },
        {
          time: "12:00 PM",
          title: "Lunch Break & Networking",
          description: "Connect with sponsors and other participants.",
          details: "Refuel at our catering lounge while networking with representatives from top tier tech sponsors and community partners. Great place to get hardware tips or API resources."
        },
        {
          time: "01:00 PM",
          title: "Hacking Begins",
          description: "Start working on your projects.",
          details: "Hacking officially kicks off! Power up your systems, open your repositories, and start building. Access to designated developer zones will be open 24/7.",
          highlight: true
        },
        {
          time: "04:00 PM",
          title: "Workshop: AI & Cloud Integration",
          description: "Learn how to incorporate AI into your projects.",
          details: "Led by industry mentors, this workshop guides you on how to leverage cognitive services, local LLM integrations, and modern cloud deployment steps to scale your prototype."
        },
        {
          time: "08:00 PM",
          title: "Dinner & Social Mixer",
          description: "Casual networking and team building activities.",
          details: "Take a break, share food, and participate in micro-activities, fun trivia, and interactive games designed to ease hacking pressure."
        }
      ]
    },
    {
      day: "Day 2",
      date: "June 11, 2025",
      events: [
        {
          time: "09:00 AM",
          title: "Breakfast & Check-in",
          description: "Morning refreshments and progress updates.",
          details: "Start the day fresh with hot coffee and breakfast. Mentors will do a morning walkthrough to inspect local workspaces and troubleshoot technical blocks."
        },
        {
          time: "10:00 AM",
          title: "Workshop: Pitch Perfect",
          description: "Learn how to effectively present your project.",
          details: "Led by professional presenters, this workshop covers slide deck structure, narrative building, and design workflows to pitch code models under 3 minutes."
        },
        {
          time: "12:00 PM",
          title: "One-on-One Mentor Sessions",
          description: "One-on-one guidance from industry experts.",
          details: "Book dedicated time slots with technical and design professionals to get constructive feedback on your app architecture, UI layouts, and domain fit."
        },
        {
          time: "03:00 PM",
          title: "Mid-Hackathon Checkpoint",
          description: "Share progress and get feedback from mentors.",
          details: "Teams must present their functional architecture for an intermediate code review. Essential for resolving pivots and validating current progress.",
          highlight: true
        },
        {
          time: "06:00 PM",
          title: "Dinner & Lightning Talks",
          description: "Quick presentations on various tech topics.",
          details: "Grab dinner while developers deliver rapid-fire 5-minute talks sharing insights on web development, security, startup building, and design workflows."
        },
        {
          time: "08:00 PM",
          title: "Gaming Tournament",
          description: "Take a break with some friendly competition.",
          details: "Relax, play, and win goodies. Take your mind off the code for an hour and compete in esports, tabletop challenges, and arcade setups."
        }
      ]
    },
    {
      day: "Day 3",
      date: "June 12, 2025",
      events: [
        {
          time: "09:00 AM",
          title: "Final Breakfast & Prep",
          description: "Last chance to refuel before the finish line.",
          details: "Fuel up for the final stretch. Get your code polished, test deployments, resolve edge cases, and start preparing demo recordings."
        },
        {
          time: "12:00 PM",
          title: "Hacking Ends",
          description: "All code submissions due.",
          details: "Hands off keyboards! Final code must be pushed to GitHub, and descriptions submitted on the portal. No exceptions will be made.",
          highlight: true
        },
        {
          time: "01:00 PM",
          title: "Lunch & Demo Sync",
          description: "Final touches on presentations.",
          details: "Re-hydrate and align layout views. Make sure all hardware demos are plugged in and cloud systems are responsive."
        },
        {
          time: "02:00 PM",
          title: "Project Showcase & Expo",
          description: "Demonstrations to judges and participants.",
          details: "An expo-style setup where teams present their projects to visiting judges and peers. Be ready to explain your system architecture and code repository."
        },
        {
          time: "04:00 PM",
          title: "Judging & Deliberation",
          description: "Judges evaluate projects based on criteria.",
          details: "The panel collates scores based on originality, technology implementation, utility value, and presentation. Top teams are shortlisted for final pitches."
        },
        {
          time: "06:00 PM",
          title: "Closing Ceremony & Awards",
          description: "Winners announced and prizes awarded.",
          details: "The grand finale! Shortlisted pitches, sponsor awards, and top 3 trophies are presented. Network and snap group photos to end the event.",
          highlight: true
        }
      ]
    }
  ];

  const handleDayChange = (idx: number) => {
    setActiveDayIdx(idx);
    setExpandedEventIdx(null);
    setActiveEventIdx(0);
  };

  const toggleExpandEvent = (idx: number) => {
    setExpandedEventIdx(expandedEventIdx === idx ? null : idx);
  };

  // Scrollspy observer to highlight the dots currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
              const idx = parseInt(id.split('-')[1], 10);
              if (!isNaN(idx)) {
                setActiveEventIdx(idx);
              }
            }
          }
        });
      },
      { threshold: 0.4, rootMargin: "-10% 0px -30% 0px" }
    );

    const elements = document.querySelectorAll('.timeline-event-item');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [activeDayIdx]);

  return (
    <section id="schedule" className="py-24 space-bg relative overflow-hidden" ref={containerRef}>
      {/* Decorative Gradient Bulbs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-gradient-to-br from-teal-500/20 to-emerald-600/20 rounded-full mb-4">
            <Calendar className="h-8 w-8 text-teal-400" />
          </div>
          <h2 className="mb-4">
            <AuroraText className="text-4xl md:text-5xl font-bold uppercase tracking-wider">Event Schedule</AuroraText>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-sky-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            36 hours of coding, networking, and expert workshops. Explore the full roadmap below.
          </p>
        </div>

        {/* Day Switcher Tabs */}
        <div className="flex justify-center mb-16 relative z-30">
          <div className="flex space-x-2 bg-slate-950/80 p-1.5 rounded-full border border-teal-500/10 backdrop-blur-md shadow-xl">
            {timelineData.map((dayData, idx) => {
              const isActive = activeDayIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleDayChange(idx)}
                  className="relative px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 focus:outline-none cursor-pointer"
                  style={{
                    color: isActive ? '#030712' : '#9ca3af',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDayTab"
                      className="absolute inset-0 bg-gradient-to-r from-teal-400 to-sky-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Sparkles className={`h-4 w-4 ${isActive ? 'text-gray-900' : 'text-teal-400/40'}`} />
                    {dayData.day} ({dayData.date.split(',')[0]})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Glassmorphic Calendar Box View */}
        <div className="max-w-4xl mx-auto bg-black/20 border border-white/5 backdrop-blur-md rounded-[32px] p-6 md:p-12 shadow-2xl relative z-10">
          
          <div className="relative">
            {/* Center Connecting Progress Line */}
            <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 transform -translate-x-1/2 bg-slate-800/60">
              <motion.div 
                className="w-full h-full bg-gradient-to-b from-teal-400 via-sky-400 to-emerald-400 origin-top"
                style={{ scaleY }}
              />

              {/* Scrolling Spark Navigator */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                style={{ 
                  top: carY,
                  y: "-50%"
                }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-teal-400 opacity-60"></span>
                  <span className="absolute inline-flex h-10 w-10 rounded-full bg-sky-400/20 blur-sm"></span>
                  <div className="h-4.5 w-4.5 rounded-full bg-gradient-to-br from-teal-300 via-sky-400 to-emerald-400 border-2 border-white shadow-[0_0_15px_#2dd4bf,0_0_30px_#38bdf8] flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Timeline Items */}
            <motion.div 
              key={activeDayIdx}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="space-y-12"
            >
              {timelineData[activeDayIdx].events.map((event, eventIdx) => {
                const isExpanded = expandedEventIdx === eventIdx;
                const isEven = eventIdx % 2 === 0;

                return (
                  <motion.div
                    key={eventIdx}
                    id={`event-${eventIdx}`}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.2 } }
                    }}
                    className={`timeline-event-item flex flex-col md:flex-row relative items-start md:items-center ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Event Time */}
                    <div className="w-full md:w-1/2 px-8 flex md:justify-end items-center pl-12 md:pl-8">
                      <div className={`flex items-center gap-2 text-sm font-bold text-sky-400/90 ${
                        isEven ? 'md:justify-start md:text-left' : 'md:justify-end md:text-right'
                      } w-full`}>
                        <Clock className="h-4 w-4 text-teal-400" />
                        <span>{event.time}</span>
                      </div>
                    </div>

                    {/* Interactive Node Point on the line */}
                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center">
                      {event.highlight ? (
                        <div className="relative flex items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-teal-400 opacity-60"></span>
                          <div className="h-5 w-5 rounded-full bg-teal-400 border-2 border-slate-950 flex items-center justify-center shadow-[0_0_10px_#2dd4bf]">
                            <Zap className="h-2.5 w-2.5 text-slate-950 fill-slate-950" />
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            const el = document.getElementById(`event-${eventIdx}`);
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                          className={`h-4.5 w-4.5 rounded-full bg-slate-900 border-2 transition-all duration-300 cursor-pointer ${
                            activeEventIdx === eventIdx 
                              ? 'border-teal-400 bg-teal-400/20 scale-125 shadow-[0_0_8px_#2dd4bf]' 
                              : 'border-white/20 hover:border-teal-400'
                          }`}
                        />
                      )}
                    </div>

                    {/* Animated Border Card */}
                    <div className="w-full md:w-1/2 px-4 pl-12 md:pl-8">
                      <div className="relative p-[1.5px] rounded-2xl overflow-hidden group">
                        {/* Rotating Conic Glow Border */}
                        <div className={`absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_40%,#2dd4bf_50%,#3b82f6_60%,transparent_100%)] transition-opacity duration-500 animate-[spin_6s_linear_infinite] pointer-events-none ${
                          isExpanded || activeEventIdx === eventIdx 
                            ? 'opacity-80' 
                            : 'opacity-0 group-hover:opacity-60'
                        }`} />
                        
                        {/* Inner card panel wrapper */}
                        <div
                          onClick={() => toggleExpandEvent(eventIdx)}
                          className={`relative z-10 bg-[#070e1e]/95 backdrop-blur-md rounded-[15px] p-6 cursor-pointer border border-white/5 transition-all duration-500 text-left`}
                        >
                          <div className="flex justify-between items-start gap-4">
                            <h4 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-teal-400">
                              {event.title}
                            </h4>
                            <div className="p-1 bg-white/5 rounded-full text-teal-400 group-hover:bg-white/10 transition-colors duration-300">
                              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </div>
                          </div>

                          <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                            {event.description}
                          </p>

                          <AnimatePresence initial={false}>
                            {isExpanded && event.details && (
                              <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden border-t border-teal-500/10 pt-3"
                              >
                                <p className="text-gray-400 text-sm leading-relaxed">
                                  {event.details}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Timeline;