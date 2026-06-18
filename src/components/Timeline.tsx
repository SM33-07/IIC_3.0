import React, { useEffect, useRef } from 'react';

interface TimelineEvent {
  day: string;
  date: string;
  events: Array<{
    time: string;
    title: string;
    description: string;
    highlight?: boolean;
  }>;
}

const Timeline: React.FC = () => {
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

  const timelineData: TimelineEvent[] = [
    {
      day: "Day 1",
      date: "June 10, 2025",
      events: [
        {
          time: "09:00 AM",
          title: "Opening Ceremony",
          description: "Kickoff event with keynote speakers and theme announcement"
        },
        {
          time: "10:30 AM",
          title: "Team Formation",
          description: "Find teammates and brainstorm project ideas"
        },
        {
          time: "12:00 PM",
          title: "Lunch Break & Networking",
          description: "Connect with sponsors and other participants"
        },
        {
          time: "01:00 PM",
          title: "Hacking Begins",
          description: "Start working on your projects",
          highlight: true
        },
        {
          time: "04:00 PM",
          title: "Workshop: AI Integration",
          description: "Learn how to incorporate AI into your projects"
        },
        {
          time: "08:00 PM",
          title: "Dinner & Social Event",
          description: "Casual networking and team building activities"
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
          description: "Morning refreshments and progress updates"
        },
        {
          time: "10:00 AM",
          title: "Workshop: Pitch Perfect",
          description: "Learn how to effectively present your project"
        },
        {
          time: "12:00 PM",
          title: "Mentor Sessions",
          description: "One-on-one guidance from industry experts"
        },
        {
          time: "03:00 PM",
          title: "Mid-Hackathon Checkpoint",
          description: "Share progress and get feedback from mentors",
          highlight: true
        },
        {
          time: "06:00 PM",
          title: "Dinner & Lightning Talks",
          description: "Quick presentations on various tech topics"
        },
        {
          time: "08:00 PM",
          title: "Gaming Tournament",
          description: "Take a break with some friendly competition"
        }
      ]
    },
    {
      day: "Day 3",
      date: "June 12, 2025",
      events: [
        {
          time: "09:00 AM",
          title: "Final Breakfast",
          description: "Last chance to refuel before the finish line"
        },
        {
          time: "12:00 PM",
          title: "Hacking Ends",
          description: "All code submissions due",
          highlight: true
        },
        {
          time: "01:00 PM",
          title: "Lunch & Preparation",
          description: "Final touches on presentations"
        },
        {
          time: "02:00 PM",
          title: "Project Showcase",
          description: "Demonstrations to judges and participants"
        },
        {
          time: "04:00 PM",
          title: "Judging & Deliberation",
          description: "Judges evaluate projects based on criteria"
        },
        {
          time: "06:00 PM",
          title: "Closing Ceremony & Awards",
          description: "Winners announced and prizes awarded",
          highlight: true
        }
      ]
    }
  ];

  return (
    <section id="schedule" ref={sectionRef} className="py-20 bg-gradient-to-b from-[#0a1931] to-[#1c2e5a]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-on-scroll opacity-0">Event Schedule</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#4a2172] to-[#9d2449] mx-auto"></div>
          <p className="mt-6 text-lg text-white/80 max-w-3xl mx-auto animate-on-scroll opacity-0">
            48 hours of coding, learning, and innovation. Here's what to expect during TechHack 2025.
          </p>
        </div>

        <div className="flex overflow-x-auto pb-8 space-x-6 snap-x">
          {timelineData.map((day, dayIndex) => (
            <div 
              key={dayIndex}
              className="min-w-[300px] md:min-w-[380px] bg-[#11234a] rounded-xl p-6 flex-1 snap-start animate-on-scroll opacity-0"
              style={{ animationDelay: `${dayIndex * 150}ms` }}
            >
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-[#301b47] text-white rounded-full text-sm font-medium">
                  {day.day}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">{day.date}</h3>
              </div>

              <div className="space-y-6">
                {day.events.map((event, eventIndex) => (
                  <div 
                    key={eventIndex} 
                    className={`relative pl-6 border-l-2 ${
                      event.highlight ? 'border-[#9d2449]' : 'border-[#4a2172]'
                    }`}
                  >
                    <div className={`absolute top-0 left-[-5px] w-2 h-2 rounded-full ${
                      event.highlight ? 'bg-[#9d2449]' : 'bg-[#4a2172]'
                    }`}></div>
                    <span className={`text-sm font-medium ${
                      event.highlight ? 'text-[#f5b7b1]' : 'text-white/60'
                    }`}>
                      {event.time}
                    </span>
                    <h4 className="text-white font-bold mt-1">{event.title}</h4>
                    <p className="text-white/70 text-sm mt-1">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;