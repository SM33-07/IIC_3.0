import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    const [route, section] = path.split('#');

    if (location.pathname !== route) {
      navigate(path);
    } else if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'About', path: '/home#about' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Problem Statements', path: '/problem-statements' },
    { name: 'Judges & Mentors', path: '/judges-mentors' }, 
    { name: 'Guests', path: '/guests' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'glass-card py-2 border-b border-teal-500/25 shadow-lg backdrop-blur-md' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            {/* College Logo Placeholder */}
            <Link to="/" className="flex items-center space-x-3">
              <img id="logo" role="button" alt="MUJ-Logo.png"
                  src="/muj-logo.png" width="140"
              />
            </Link>

            {/* Separator */}
            <div className="w-px h-8 bg-gradient-to-b from-teal-400 to-sky-400 opacity-50"></div>

            {/* Hackathon Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img id="logo" role="button" alt="IIC-Logo.png"
                   src="/iic-logo.png" width="100"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
                <button
                    key={item.name}
                    onClick={() => handleNavClick(item.path)}
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-300 font-medium relative group"
                >
                  {item.name}
                  <span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-sky-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <button
              onClick={() => window.open('https://unstop.com/hackathons/international-innovation-challenge-20-manipal-university-mu-jaipur-1527559', '_blank')}
              className="modern-button neon-button px-6 py-2 rounded-md font-medium transition-all duration-300 shadow-md animate-pulse"
            >
              <Zap size={16} className="inline mr-1" />
              Submit
            </button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden text-white p-2 glass-card rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 px-2 glass-card rounded-lg">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className="block w-full text-left py-3 text-gray-300 hover:text-teal-400 transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => window.open('https://docs.google.com/forms/d/1r6umjVOO-wcnGa-XwrCkjcvPk2f8rcAo1msmgnfnCz0/edit', '_blank')}
              className="block w-full mt-2 modern-button px-4 py-3 rounded-md font-medium text-center"
            >
              <Zap size={16} className="inline mr-1" />
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
