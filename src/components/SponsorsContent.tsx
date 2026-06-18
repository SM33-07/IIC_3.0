
import React, { useEffect, useRef } from 'react';
import { Building, Sparkles, Crown } from 'lucide-react';
import Pdf from '/IIC_DECK.pdf'

const SponsorsContent: React.FC = () => {
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

  // @ts-ignore
  // @ts-ignore
  const sponsorTiers = [
    {
      tier: "Sponsors",
      icon: <Crown className="h-8 w-8 text-yellow-400" />,
      gradient: "from-yellow-400 to-orange-500",
      sponsors: [
        {
          icon: <img src="/geeksforgeeks.png" alt="GeekforGeeks" className="h-20 w-20 object-contain" />,
          name: "GeekforGeeks",
        },
        {
          icon: <img src="/doic.png" alt="epam" className="h-20 w-20 object-contain" />,
          name: "DoIC MUJ",
        },
        {
          icon: <img src="/mlhealth360.jpeg" alt="mlHealth360" className="h-20 w-20 object-contain" />,
          name: "mlHealth360",
        },
        {
          icon: <img src="/eCell.jpeg" alt="eCell" className="h-20 w-20 object-contain" />,
          name: "E-Cell",
        },
        {
          icon: <img src="/aic.jpeg" alt="aic MUJ" className="h-20 w-20 object-contain" />,
          name: "AIC MUJ",
        },
        {
          icon: <img src="/tuf.png" alt="TUF" className="h-20 w-20 object-contain" />,
          name: "TUF",
        }
      ]
    },
      {
      tier: "Problem Statements by",
      sponsors: [
        {
          icon: <img src="/isro.jpg" alt="ISRO Logo" className="h-20 w-20 object-contain" />,
          name: "ISRO",
        },
        {
          icon: <img src="/mahindra.avif" alt="Mahindra" className="h-20 w-20 object-contain" />,
          name: "Mahindra",
        },
        {
          icon: <img src="/talsmart.jpg" alt="Cerebral" className="h-20 w-20 object-contain" />,
          name: "Talsmart",
        },
        {
          icon: <img src="/epam.webp" alt="epam" className="h-20 w-20 object-contain" />,
          name: "epam",
        },
        {
          icon: <img src="/rgHospitals.jpeg" alt="RG Hospitals" className="h-20 w-20 object-contain" />,
          name: "RG Hospitals",
        },
        {
          icon: <img src="/drdo.png" alt="DRDO" className="h-20 w-20 object-contain" />,
          name: "DRDO",
        },
      ]
    },
  ];

  const coPoweredBy = [
    {
      icon: <img src="/unstop.png" alt="unstop" className="h-20 w-20 object-contain" />,
      name: "unstop",
    }
  ];

  /*const partnerCategories = [
    {
      title: "Community Partners",
      partners: [
        "IEEE Student Branch",
        "ACM Chapter",
        "Google Developer Groups",
        "Microsoft Student Partners",
        "GitHub Campus Experts"
      ]
    },
    {
      title: "Media Partners",
      partners: [
        "TechCrunch India",
        "YourStory",
        "Analytics India Magazine",
        "Inc42",
        "The Startup"
      ]
    }
  ];*/

  return (
    <div className="min-h-screen space-bg" ref={sectionRef}>
      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mb-4 animate-on-scroll opacity-0">
            <Building className="h-8 w-8 text-pink-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-on-scroll opacity-0">
            Our <span className="gradient-text">Sponsors</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-on-scroll opacity-0">
            IIC 2.0 is made possible by the generous support of our sponsors, who share our vision for innovation and technology advancement. Together, we're building the future of tech.
          </p>
        </div>

        
        {coPoweredBy.length > 0 && (
          <div className="space-y-20">
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: `0ms` }}>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold gradient-text mb-2">Co-Powered By</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-500 mx-auto"></div>
              </div>

              
              <div className={`grid gap-6 ${coPoweredBy.length === 1 ? 'grid-cols-1 justify-items-center' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
                {coPoweredBy.map((partner, index) => (
                  <div
                    key={index}
                    
                    className="glass-card rounded-xl p-6 hover:glass-card transition-all duration-300 group relative overflow-hidden max-w-md"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-500 opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-center h-20 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400/20 to-indigo-500/20 flex items-center justify-center">
                          {partner.icon ? (
                            partner.icon
                          ) : (
                            <span className="text-2xl font-bold gradient-text">
                              
                              {partner.name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors duration-300 text-center">
                        {partner.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        
        <div className="space-y-20 mt-16">
          {sponsorTiers.map((tier, tierIndex) => (
            <div key={tierIndex} className="animate-on-scroll opacity-0" style={{ animationDelay: `${tierIndex * 150}ms` }}>
              <div className="text-center mb-12">
                <div className={`inline-flex items-center justify-center p-3 bg-gradient-to-br ${tier.gradient}/20 rounded-full mb-4`}>
                  {tier.icon}
                </div>
                <h3 className="text-3xl font-bold gradient-text mb-2">{tier.tier}</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-cyan-400 mx-auto"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tier.sponsors.map((sponsor, sponsorIndex) => (
                  <div
                    key={sponsorIndex}
                    className="glass-card rounded-xl p-6 hover:glass-card transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-center h-20 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400/20 to-cyan-400/20 flex items-center justify-center">
                          {sponsor.icon ? (
                            sponsor.icon
                          ) : (
                            <span className="text-2xl font-bold gradient-text">
                             
                              {sponsor.name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2 group-hover:text-pink-400 transition-colors duration-300 text-center">
                        {sponsor.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>


        
        {/*<div className="mt-20 animate-on-scroll opacity-0">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold gradient-text mb-4">Our Partners</h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-cyan-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {partnerCategories.map((category, index) => (
                  <div key={index} className="glass-card rounded-xl p-6">
                <h4 className="text-xl font-bold text-white mb-4 text-center">{category.title}</h4>
                <div className="space-y-3">
                  {category.partners.map((partner, partnerIndex) => (
                    <div key={partnerIndex} className="flex items-center p-3 glass-card rounded-lg hover:glass-card transition-all duration-300">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-cyan-400 mr-3"></div>
                      <span className="text-gray-300">{partner}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>*/}

        
        {/*<div className="mt-20 text-center animate-on-scroll opacity-0">*/}
        {/*  <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto">*/}
        {/*    <div className="flex items-center justify-center mb-6">*/}
        {/*      <Sparkles className="h-8 w-8 text-pink-400 mr-3" />*/}
        {/*      <h3 className="text-3xl font-bold gradient-text">Become a Sponsor</h3>*/}
        {/*    </div>*/}
        {/*    <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">*/}
        {/*      Join our community of forward-thinking companies supporting the next generation of tech innovators.*/}
        {/*      Various sponsorship packages are available to suit your budget and goals.*/}
        {/*    </p>*/}

        {/*    <div className="grid md:grid-cols-3 gap-6 mb-8">*/}
        {/*      {[*/}
        {/*        { title: "Brand Visibility", desc: "Reach 1000+ tech enthusiasts" },*/}
        {/*        { title: "Talent Pipeline", desc: "Connect with top developers" },*/}
        {/*        { title: "Innovation Access", desc: "First look at cutting-edge projects" }*/}
        {/*      ].map((benefit, index) => (*/}
        {/*        <div key={index} className="glass-card p-4 rounded-lg">*/}
        {/*          <h4 className="text-pink-400 font-bold mb-2">{benefit.title}</h4>*/}
        {/*          <p className="text-gray-300 text-sm">{benefit.desc}</p>*/}
        {/*        </div>*/}
        {/*      ))}*/}
        {/*    </div>*/}

        {/*    <div className="flex flex-col sm:flex-row gap-4 justify-center">*/}
        {/*      <button className="modern-button neon-button px-8 py-3 rounded-lg font-medium transition-all duration-300"*/}
        {/*      onClick={()=>window.open('https://forms.gle/o3LkRUzYf6Ld1hWLA', '_blank')}>*/}
        {/*        Sponsor IIC 2.0*/}
        {/*      </button>*/}
        {/*      <button className="glass-card hover:glass-card text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 border border-pink-400/30"*/}
        {/*      onClick={()=>window.open(Pdf, '_blank')}>*/}
        {/*        Download Brochure*/}
        {/*      </button>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </main>
    </div>
  );
};

export default SponsorsContent;
