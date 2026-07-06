import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, MessageCircleQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuroraText from './AuroraText';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems: FAQItem[] = [
    {
      question: "Who can participate in IIC 2.0?",
      answer: "IIC 2.0 is open to all students across colleges and disciplines. Whether you’re a first-timer or a seasoned hacker, if you’ve got the passion to innovate — you’re in!"
    },
    {
      question: "Do I need to have a team to register?",
      answer: "You can register individually or as a team of 2–4 members. Flying solo? We’ll help you team up with other brilliant minds!"
    },
    {
      question: "Is there a registration fee?",
      answer: "Yes, the registration fee is ₹700 per team. This covers your meals, resources, participation kit, and an unforgettable hackathon experience!"
    },
    {
      question: "What should I bring to the hackathon?",
      answer: "Your laptop, charger, college ID, and anything else you may need for your project. Also — bring your creativity and caffeine cravings!"
    },
      {
      question: "Will accommodations be provided?",
      answer: "Yes, we will provide two separate common rooms for boys and girls."
    },
    {
      question: "Will there be food provided?",
      answer: "Yes, food and refreshments will be provided throughout the event. Stay focused — we’ll keep your hunger in check! 🍽️"
    },
    {
      question: "Can I work on a pre-existing project?",
      answer: "No, all submissions must be developed during the hackathon. You can bring ideas, but coding starts only after the hackathon kicks off."
    },
    {
      question: "What resources will be available during the hackathon?",
      answer: " Power access, comfortable seating, stationery (if required), and mentorship support will be available to all participants."
    },
    {
      question: "How will projects be judged?",
      answer: `Your project will be evaluated based on:
      Innovation & Creativity,
      Technical Execution,
      Impact & Relevance to the Theme,
      Pitch & Demo Presentation.
      `
    }
  ];

  return (
    <section id="faq" ref={sectionRef} className="py-20 space-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-gradient-to-br from-teal-500/20 to-emerald-600/20 rounded-full mb-4 animate-on-scroll opacity-0">
            <MessageCircleQuestion className="h-8 w-8 text-teal-400" />
          </div>
          <h2 className="animate-on-scroll opacity-0 mb-4">
            <AuroraText className="text-4xl md:text-5xl font-bold uppercase tracking-wider">Frequently Asked Questions</AuroraText>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-sky-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-on-scroll opacity-0">
            Find answers to common questions about IIC 3.0. If you don't see your question here, feel free to contact us.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`mb-4 glass-card rounded-lg overflow-hidden animate-on-scroll opacity-0`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none hover:bg-white/5 transition-colors duration-300"
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-white font-medium text-lg">{item.question}</span>
                <div className="bg-gradient-to-br from-teal-500/20 to-emerald-600/20 p-2 rounded-full">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-teal-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-teal-400" />
                  )}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 pb-4 border-t border-teal-500/10 pt-4">
                      <p className="text-gray-300 text-lg leading-relaxed">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-on-scroll opacity-0">
          <p className="text-gray-300 mb-6 text-lg">
            Still have questions? We're here to help!
          </p>
          <button className="modern-button neon-button px-8 py-3 rounded-lg font-medium transition-all duration-300"
          onClick={() => {
            const isMobile = /Mobi|Android/i.test(navigator.userAgent);
            if (isMobile) {
            window.location.href = 'tel:+919728014818';
            } else {
            window.location.href = 'mailto:Tanishkmittal38@gmail.com?subject=Inquiry about IIC 3.0';
            }
          }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
