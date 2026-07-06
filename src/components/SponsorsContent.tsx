import React, { useEffect, useRef } from 'react';
import { Building, Crown } from 'lucide-react';
import ChromaGrid, { ChromaItem } from './ChromaGrid';
import AuroraText from './AuroraText';

const SponsorsContent: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const coPoweredItems: ChromaItem[] = [
    {
      image: '/unstop.webp',
      title: 'Unstop',
      subtitle: 'Co-Powered By',
      borderColor: '#2dd4bf',
      gradient: 'linear-gradient(145deg, rgba(13, 148, 136, 0.4), rgba(11, 22, 44, 0.75))',
      isLogo: true,
      url: 'https://unstop.com'
    }
  ];

  const sponsorItems: ChromaItem[] = [
    {
      image: '/geeksforgeeks.webp',
      title: 'GeekforGeeks',
      subtitle: 'Sponsor',
      borderColor: '#f59e0b',
      gradient: 'linear-gradient(145deg, rgba(217, 119, 6, 0.4), rgba(11, 22, 44, 0.75))',
      isLogo: true,
      url: 'https://www.geeksforgeeks.org/'
    },
    {
      image: '/doic.webp',
      title: 'DoIC MUJ',
      subtitle: 'Sponsor',
      borderColor: '#f59e0b',
      gradient: 'linear-gradient(145deg, rgba(217, 119, 6, 0.4), rgba(11, 22, 44, 0.75))',
      isLogo: true
    },
    {
      image: '/mlhealth360.webp',
      title: 'mlHealth360',
      subtitle: 'Sponsor',
      borderColor: '#f59e0b',
      gradient: 'linear-gradient(145deg, rgba(217, 119, 6, 0.4), rgba(11, 22, 44, 0.75))',
      isLogo: true
    },
    {
      image: '/eCell.webp',
      title: 'E-Cell',
      subtitle: 'Sponsor',
      borderColor: '#f59e0b',
      gradient: 'linear-gradient(145deg, rgba(217, 119, 6, 0.4), rgba(11, 22, 44, 0.75))',
      isLogo: true
    },
    {
      image: '/aic.webp',
      title: 'AIC MUJ',
      subtitle: 'Sponsor',
      borderColor: '#f59e0b',
      gradient: 'linear-gradient(145deg, rgba(217, 119, 6, 0.4), rgba(11, 22, 44, 0.75))',
      isLogo: true
    },
    {
      image: '/tuf.webp',
      title: 'TUF',
      subtitle: 'Sponsor',
      borderColor: '#f59e0b',
      gradient: 'linear-gradient(145deg, rgba(217, 119, 6, 0.4), rgba(11, 22, 44, 0.75))',
      isLogo: true
    }
  ];

  const problemStatementItems: ChromaItem[] = [
    {
      image: '/isro.webp',
      title: 'ISRO',
      subtitle: 'Problem Statements By',
      borderColor: '#3b82f6',
      gradient: 'linear-gradient(145deg, rgba(37, 99, 235, 0.4), rgba(11, 22, 44, 0.75))',
      isLogo: true,
      url: 'https://www.isro.gov.in/'
    },
    {
      image: '/mahindra.avif',
      title: 'Mahindra',
      subtitle: 'Problem Statements By',
      borderColor: '#3b82f6',
      gradient: 'linear-gradient(145deg, rgba(37, 99, 235, 0.4), rgba(11, 22, 44, 0.75))',
      isLogo: true
    },
    {
      image: '/talsmart.webp',
      title: 'Talsmart',
      subtitle: 'Problem Statements By',
      borderColor: '#3b82f6',
      gradient: 'linear-gradient(145deg, rgba(37, 99, 235, 0.4), rgba(11, 22, 44, 0.75))',
      isLogo: true
    },
    {
      image: '/epam.webp',
      title: 'epam',
      subtitle: 'Problem Statements By',
      borderColor: '#3b82f6',
      gradient: 'linear-gradient(145deg, rgba(37, 99, 235, 0.4), rgba(11, 22, 44, 0.75))',
      isLogo: true
    },
    {
      image: '/rgHospitals.webp',
      title: 'RG Hospitals',
      subtitle: 'Problem Statements By',
      borderColor: '#3b82f6',
      gradient: 'linear-gradient(145deg, rgba(37, 99, 235, 0.4), rgba(11, 22, 44, 0.75))',
      isLogo: true
    },
    {
      image: '/drdo.webp',
      title: 'DRDO',
      subtitle: 'Problem Statements By',
      borderColor: '#3b82f6',
      gradient: 'linear-gradient(145deg, rgba(37, 99, 235, 0.4), rgba(11, 22, 44, 0.75))',
      isLogo: true
    }
  ];

  return (
    <div className="min-h-screen space-bg" ref={sectionRef}>
      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-gradient-to-br from-teal-500/20 to-emerald-600/20 rounded-full mb-4 animate-on-scroll opacity-0">
            <Building className="h-8 w-8 text-teal-400" />
          </div>
          <h1 className="animate-on-scroll opacity-0 mb-4">
            <AuroraText className="text-4xl md:text-5xl font-bold uppercase tracking-wider">Our Sponsors</AuroraText>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-sky-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-on-scroll opacity-0">
            IIC 3.0 is made possible by the generous support of our sponsors, who share our vision for innovation and technology advancement. Together, we're building the future of tech.
          </p>
        </div>

        {/* Co-Powered By */}
        {coPoweredItems.length > 0 && (
          <div className="space-y-12">
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: `0ms` }}>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold gradient-text mb-2">Co-Powered By</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-teal-400 to-sky-400 mx-auto"></div>
              </div>

              <div className="flex justify-center">
                <ChromaGrid items={coPoweredItems} className="flex justify-center flex-wrap gap-8" radius={250} />
              </div>
            </div>
          </div>
        )}

        {/* Sponsors and Problem Statements */}
        <div className="space-y-20 mt-16">
          {/* Sponsors */}
          <div className="animate-on-scroll opacity-0" style={{ animationDelay: `150ms` }}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full mb-4">
                <Crown className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-3xl font-bold gradient-text mb-2">Sponsors</h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-teal-400 to-sky-400 mx-auto"></div>
            </div>

            <ChromaGrid items={sponsorItems} radius={300} />
          </div>

          {/* Problem Statements by */}
          <div className="animate-on-scroll opacity-0" style={{ animationDelay: `300ms` }}>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold gradient-text mb-2">Problem Statements by</h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-teal-400 to-sky-400 mx-auto"></div>
            </div>

            <ChromaGrid items={problemStatementItems} radius={300} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SponsorsContent;
