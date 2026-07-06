import React, { useState } from 'react';
import { Search, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Problem {
  title: string;
  description: string;
}

interface ProblemCategory {
  [key: string]: Problem[];
}

const ProblemStatementsContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedProblem, setExpandedProblem] = useState<number | null>(null);

  const problemsByCategory: ProblemCategory = {
    "Artificial Intelligence & Machine Learning": [
        {
            "title": "Image based breed recognition for cattle and buffaloes of India",
            "description": "Develop an AI system to identify and classify different breeds of cattle and buffaloes native to India using image recognition technology."
        },
        {
            "title": "AI based development of Laser based QR Code marking on track fittings on Indian Railways",
            "description": "Create an AI-powered system for automated QR code marking using laser technology on railway track fittings for better tracking and maintenance."
        },
        {
            "title": "AI-Based Internship Recommendation Engine for PM Internship Scheme",
            "description": "Develop an AI-powered recommendation system to match students with suitable internship opportunities under the PM Internship Scheme."
        },
        {
            "title": "Dashboard for tropospheric Precipitable Water interpolation using GNSS",
            "description": "Dashboard development using AI-ML techniques to interpolate tropospheric Precipitable Water (PW) content using zenith-wet delay from GNSS observations. Should accept multiple station observations and display interpolated results."
        },
        {
            "title": "Ultra-Extreme Image Compression using AI-Based Super-Resolution",
            "description": "Develop an AI-powered image compression and reconstruction system that reduces high-resolution images (~1 MB) to maximum 1 KB for transmission, then recovers high-resolution images with minimal perceptual distortion using super-resolution techniques."
        },
        {
            "title": "Cross Modal SAR-Optical Image Matching/Registration",
            "description": "Develop a robust algorithm for matching Synthetic Aperture Radar (SAR) and optical images using advanced feature extraction and matching techniques. Should explore both conventional and deep learning-based approaches using the Cloudsen12 dataset."
        },
        {
            "title": "AI/ML Optical Flow based Frame interpolation of Satellite Images",
            "description": "Develop an AI/ML based Optical Flow frame interpolation technique to generate intermediate frames between consecutive satellite images, enhancing temporal resolution from 30 minutes to 15 minutes and further to 7.5 minutes intervals."
        },
        {
            "title": "Vision based Intelligent RPA agent",
            "description": "Build a generic visual RPA agent that interacts with digital interfaces using vision and natural language. Should use Vision Transformer models to detect UI elements and perform actions based on natural language instructions without relying on fixed selectors."
        },
        {
            "title": "AI-Powered Offline Organizational Chatbot",
            "description": "Design and develop an offline chatbot that can answer employee queries by retrieving information from organizational databases. Must implement role-based access control and run entirely offline using local LLM and vector database."
        },
        {
            "title": "AI/ML-Driven Intelligent Software Code Analysis",
            "description": "Develop an AI/ML-powered software code analysis platform that can analyze large codebases, detect bugs and vulnerabilities, adapt to project-specific styles, and provide explainable insights with IDE integration."
        }
    ],
    "Healthcare & Medical Technology": [
        {
            "title": "API integration for NAMASTE and ICD-11 TM2 into EMR systems",
            "description": "Develop API code to integrate NAMASTE and/or the International Classification of Diseases (ICD-11) via the Traditional Medicine Module 2 (TM2) into existing EMR systems that comply with Electronic Health Record (EHR) Standards for India."
        },
        {
            "title": "Smart Community Health Monitoring and Early Warning System for Water-Borne Diseases in Rural Northeast India",
            "description": "Develop a comprehensive health monitoring system with early warning capabilities for water-borne diseases specifically targeted at rural communities in Northeast India."
        },
        {
            "title": "Healthcare tracking and monitoring solutions",
            "description": "Develop solutions for tracking immunization services, monitoring temperature-sensitive goods for vaccines and medicines during transport, and creating apps for disease outbreak management."
        },
        {
            "title": "AI-Driven Public Health Chatbot for Disease Awareness",
            "description": "Create a multilingual AI chatbot to educate rural and semi-urban populations about preventive healthcare, disease symptoms, and vaccination schedules. The chatbot should integrate with government health databases and provide real-time alerts for outbreaks. Expected to reach 80% accuracy in answering health queries and increase awareness by 20% in target communities."
        },
        {
            "title": "Quality Control for Medical Imaging Studies",
            "description": "Build an AI-powered pipeline that automatically checks CT scans for resolution, completeness, and anonymization compliance before they are used for training AI models. Should achieve >90% accuracy in anomaly detection and provide a quality-check dashboard flagging failed studies."
        },
        {
            "title": "Multi-Label Chest X-Ray Findings Detection",
            "description": "Create an AI system that can detect multiple abnormalities simultaneously in chest X-rays rather than just normal/abnormal classification. Should output probabilities for at least 3-5 disease categories per X-ray with visualization dashboard."
        },
        {
            "title": "Real-Time Imaging Workflow Orchestration",
            "description": "Design a workflow tool that ingests DICOM files, routes them through anomaly detection models, and pushes prioritized cases to a radiologist dashboard. Create an end-to-end pipeline simulation for hospital imaging workflows."
        },
        {
            "title": "Privacy-Preserving Medical Image Sharing",
            "description": "Build a pipeline that automatically removes text labels and anonymizes metadata from medical images while preserving diagnostic quality. Should produce anonymized versions with quality comparison reports."
        },
        {
            "title": "AI-Powered Spine Posture Curve Estimation from Human Body",
            "description": "Create a computer-vision system that estimates spine alignment and curvature from normal RGB/depth images. Should achieve >85% accuracy in estimating spinal alignment compared to physiotherapist assessments and provide real-time posture monitoring."
        }
    ],
    "Agriculture & Food Technology": [
        {
            "title": "Intelligent Pesticide Sprinkling System Determined by the Infection Level of a Plant",
            "description": "Create an AI-driven system that determines optimal pesticide application based on real-time assessment of plant infection levels."
        },
        {
            "title": "Low-Cost smart transportation solution for Agri produce from remote farms to nearest motorable road in NER Region",
            "description": "Develop affordable and smart transportation solutions to efficiently move agricultural produce from remote farms to accessible roads in the North Eastern Region of India."
        },
        {
            "title": "Improved Onion storage technology for enhancing shelf life of onions",
            "description": "Develop advanced storage technologies and methods to significantly extend the shelf life of onions and reduce post-harvest losses."
        },
        {
            "title": "AI-Based Farmer Query Support and Advisory System",
            "description": "Build an AI-powered system to provide farmers with instant answers to their queries and expert agricultural advisory services."
        },
        {
            "title": "AI-powered farming assistance bots for small farmers",
            "description": "Design AI-powered bots for small farmers to aid with soil testing, pest detection, crop management, irrigation, and accessing financial aids."
        },
        {
            "title": "Farmer-to-market connection platform",
            "description": "Develop a solution for connecting farmers with local markets, enabling real-time price discovery, efficient supply chain management, and fair pricing for agricultural produce."
        }
    ],
    "Education Technology": [
        {
            "title": "Gamified Environmental Education Platform for Schools and Colleges",
            "description": "Create an engaging, game-based learning platform focused on environmental education for students in schools and colleges."
        },
        {
            "title": "Digital Platform for Centralized Alumni Data Management and Engagement",
            "description": "Build a comprehensive digital platform for managing alumni data and fostering engagement between educational institutions and their alumni network."
        },
        {
            "title": "VR and AR-based training tools for industry-relevant education",
            "description": "Create accessible VR and AR-based tools to enhance hands-on, industry-relevant training for students."
        },
        {
            "title": "Integrated All-in-one mobile app for MUJ campus",
            "description": "Develop an integrated 'All in one' mobile app for MUJ including smart parking system with pre-notification and navigation to vacant parking space, smart and easy navigation within MUJ campus, checking availability of MUJ employees with location and phone number, alumni connection, complaints and tracking for general services."
        },
        {
            "title": "AI-Powered Multi-Modal Classroom Engagement Analyzer",
            "description": "Build an AI tool that analyzes classroom videos and determines if students are engaged, distracted, or absent using both facial expressions (vision) and voice/text cues (audio/NLP). Should provide engagement statistics over time."
        }
    ],
    "Government & Public Services": [
        {
            "title": "Automated Compliance Checker for Legal Metrology Declarations on E-Commerce Platforms",
            "description": "Build an automated system to verify and ensure compliance of legal metrology declarations on e-commerce platforms."
        },
        {
            "title": "Mobile application for tracking district officials' field visits",
            "description": "Develop a mobile application for tracking district officials' field visits and inspections using geo-tagging and digital authentication."
        },
        {
            "title": "Government schemes to beneficiaries mapping software",
            "description": "Create a user-friendly software solution to map government schemes to beneficiaries based on their socio-economic background. Ensure real-time access and a citizen-centric design for efficient grievance redressal."
        },
        {
            "title": "Automated deceased beneficiary detection system",
            "description": "Develop a unique and efficient mechanism to automatically stop the transfer of social security funds to deceased under various schemes. The solution should ensure timely identification of deceased beneficiaries, leveraging integration with death registration databases, Aadhaar authentication, or periodic life certification through digital methods."
        }
    ],
    "Cybersecurity & Privacy": [
        {
            "title": "Secure Customer Premises Equipment (CPE) system for Naval Ships (SIFON)",
            "description": "Design and develop an indigenous, secure, and ruggedized Customer Premises Equipment (CPE) system to enable encrypted and reliable internet connectivity onboard Indian naval ships under the Secure Internet for onboard Naval Ships (SIFON) framework."
        },
        {
            "title": "Post Quantum Cryptography (PQC) based TLS Termination Reverse Proxy",
            "description": "Implement a TLS termination proxy that uses post-quantum cryptography for secure key exchange and authentication. Should support Kyber KEM for key exchange and Dilithium for certificates/signatures with performance benchmarking."
        },
        {
            "title": "Next-Gen Desktop Based Secure Data Vault",
            "description": "Develop a cross-platform desktop application for secure document storage with encryption, two-way synchronization, offline functionality, role-based access, and protection against ransomware attacks."
        }
    ],
    "Environmental & Sustainability": [
        {
            "title": "Development of Sensor for Detection Of Microplastics",
            "description": "Design and develop advanced sensors capable of detecting microplastics in various environments including water bodies and soil."
        },
        {
            "title": "Smart Waste Segregation and Recycling System",
            "description": "Create an intelligent system for automated waste segregation and recycling management using smart technologies."
        },
        {
            "title": "Application for on-spot assessment of Roof Top Rain water harvesting and artificial recharge potential",
            "description": "Design and develop an application for on-spot assessment of Roof Top Rain water harvesting and artificial recharge potential and size of the RTRWH and AR systems."
        }
    ],
    "Blockchain Technology": [
        {
            "title": "Smart Tourist Safety Monitoring & Incident Response System using AI, Geo-Fencing, and Blockchain-based Digital ID",
            "description": "Develop a comprehensive safety monitoring system for tourists using AI-powered incident detection, geo-fencing technology, and blockchain-based digital identity verification."
        },
        {
            "title": "Blockchain-based system for botanical traceability of Ayurvedic herbs",
            "description": "Develop a blockchain-based system for botanical traceability of Ayurvedic herbs, including geo-tagging from the point of collection (farmers/wild collectors) to the final Ayurvedic formulation label."
        }
    ],
    "Assistive & Accessibility Technology": [
        {
            "title": "Assistive technologies for visually impaired individuals",
            "description": "Develop innovative assistive technologies and inclusive infrastructure to empower visually impaired individuals with enhanced navigation, mobility, and independence, thereby improving their social interaction and overall quality of life."
        }
    ],
    "Network & Systems Technology": [
        {
            "title": "High-Throughput Parallelized UDP Transfer with Priority Scheduling",
            "description": "Design a system for reliable, high-throughput file transfer over UDP in air-gapped environments. Should monitor folders, schedule files by priority (smaller first), transmit in parallel, and include adaptive redundancy mechanisms."
        }
    ]
  };

  const categories = Object.keys(problemsByCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleProblemExpansion = (index: number) => {
    setExpandedProblem(expandedProblem === index ? null : index);
  };

  // Perform category and search queries filters
  const filteredData = (selectedCategory ? [selectedCategory] : categories)
    .map((category) => {
      const matchedProblems = problemsByCategory[category].map((p, idx) => {
        // Calculate globalIndex for reference
        const globalIdx = selectedCategory
          ? idx
          : Object.keys(problemsByCategory)
              .slice(0, categories.indexOf(category))
              .reduce((acc, cat) => acc + problemsByCategory[cat].length, 0) + idx;
        return { ...p, globalIdx };
      }).filter((problem) => {
        const term = searchQuery.toLowerCase().trim();
        if (!term) return true;
        return (
          problem.title.toLowerCase().includes(term) ||
          problem.description.toLowerCase().includes(term)
        );
      });
      return { category, problems: matchedProblems };
    })
    .filter((group) => group.problems.length > 0);

  const totalFilteredCount = filteredData.reduce((acc, group) => acc + group.problems.length, 0);

  return (
    <div className="min-h-screen space-bg">
      <main className="container mx-auto px-4 py-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-br from-teal-500/20 to-emerald-600/20 rounded-full mb-4">
            <FileText className="h-8 w-8 text-teal-400" />
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-4">Problem Statements</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Choose from cutting-edge problem statements across various technological domains. Each challenge is designed to push the boundaries of innovation and create real-world impact.
          </p>
        </div>

        {/* Dynamic Search Bar */}
        <div className="max-w-2xl mx-auto mb-10 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search problem statements (e.g. AI, water, secure)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setExpandedProblem(null); // Close expanded views to keep UI clean
              }}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-950/80 border border-teal-500/15 focus:border-teal-500 focus:outline-none text-white transition-all duration-300 shadow-lg backdrop-blur-sm"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400/60 h-5 w-5" />
          </div>
          {searchQuery && (
            <p className="text-xs text-teal-400/80 mt-2 ml-2">
              Found {totalFilteredCount} matching statements
            </p>
          )}
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setExpandedProblem(null);
            }}
            className={`glass-card px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              selectedCategory === null 
                ? 'bg-gradient-to-r from-teal-400 to-sky-400 text-gray-900 border-none' 
                : 'hover:bg-teal-500/15 text-gray-300'
            }`}
          >
            All Categories ({Object.values(problemsByCategory).flat().length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setExpandedProblem(null);
              }}
              className={`glass-card px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-gradient-to-r from-teal-400 to-sky-400 text-gray-900 border-none' 
                  : 'hover:bg-teal-500/15 text-gray-300'
              }`}
            >
              {category} ({problemsByCategory[category].length})
            </button>
          ))}
        </div>

        {/* Grid List */}
        <motion.div layout className="space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              filteredData.map((group) => (
                <motion.div
                  key={group.category}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <h2 className="text-xl font-bold text-teal-300 mb-4 border-l-4 border-teal-500 pl-3">
                    {group.category}
                  </h2>
                  <div className="space-y-4">
                    {group.problems.map((problem) => {
                      const isExpanded = expandedProblem === problem.globalIdx;

                      return (
                        <motion.div
                          key={problem.globalIdx}
                          layout
                          className={`glass-card p-5 rounded-xl transition-all duration-300 relative overflow-hidden border ${
                            isExpanded ? 'border-teal-500/35 bg-teal-950/5' : 'border-teal-500/10'
                          }`}
                        >
                          <div
                            className="cursor-pointer flex items-center justify-between gap-4"
                            onClick={() => toggleProblemExpansion(problem.globalIdx)}
                          >
                            <h3 className="text-md font-bold text-white group-hover:text-teal-400 transition-colors duration-300">
                              {problem.title}
                            </h3>
                            <div className="bg-slate-950/40 p-1.5 rounded-full text-teal-400">
                              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </div>
                          </div>
                          
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden border-t border-teal-500/10 pt-3"
                              >
                                <p className="text-gray-300 text-sm leading-relaxed">
                                  {problem.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 glass-card rounded-2xl max-w-md mx-auto"
              >
                <p className="text-gray-400">No problem statements match your search criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="mt-4 text-sm text-teal-400 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default ProblemStatementsContent;