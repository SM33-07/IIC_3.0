import React from 'react';
import { Mail, MapPin, Phone, Instagram, Linkedin, Github, Sparkles } from 'lucide-react';
import {Link} from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="space-bg pt-16 pb-8 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Logo and Description Section */}
          <div className="lg:col-span-2">
            {/* Logos Section */}
            <div className="flex items-center space-x-4 mb-4">
              {/* College Logo*/}
              <img id="logo" role="button" alt="MUJ-Logo.png"
                   src="/muj-logo.png" width="120"
                   />

              {/* Separator */}
              <div className="w-px h-8 bg-gradient-to-b from-pink-400 to-cyan-400 opacity-50"></div>

              {/* Hackathon Logo */}
              <Link to="/" className="flex items-center space-x-3">

                <img id="logo" role="button" alt="MUJ-Logo.png"
                     src="/iic-logo.png" width="120"/>

              </Link>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              The premier hackathon experience where innovation meets opportunity. Join us for 36 hours of coding,
              collaboration, and creation that will shape the future.
            </p>
            <div className="flex space-x-4">
              <a
                  href="https://www.instagram.com/iicmuj?igsh=ZzZjejkyOW5ibmNs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card hover:glass-card p-3 rounded-full transition-all duration-300"
              >
                <Instagram className="h-5 w-5 text-pink-400"/>
              </a>
              <a
                  href="https://www.linkedin.com/company/international-innovation-challenge-iic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card hover:glass-card p-3 rounded-full transition-all duration-300"
              >
                <Linkedin className="h-5 w-5 text-cyan-400"/>
              </a>
              <a
                  href="https://github.com/SS-9098/IIC-2.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card hover:glass-card p-3 rounded-full transition-all duration-300"
              >
                <Github className="h-5 w-5 text-purple-400"/>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center mb-6">
              <Sparkles className="h-6 w-6 text-pink-400 mr-2"/>
              <h3 className="text-white font-bold text-lg">Quick Links</h3>
            </div>
            <ul className="space-y-3">
              {[
                {name: "About", href: "#about"},
                {name: "Prizes", href: "#prizes"},
                {name: "Sponsors", href: "#sponsors"},
                {name: "FAQ", href: "#faq"},
                {name: "Register", href: "#register"}
              ].map((link, index) => (
                  <li key={index}>
                    <a
                        href={link.href}
                        className="text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center group"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-cyan-400 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {link.name}
                    </a>
                  </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 p-2 rounded-lg mr-3 mt-0.5">
                  <Phone className="h-5 w-5 text-pink-400" />
                </div>
                <span className="text-gray-300">Dr. GL Saini - 8890191811<br />Tanishk Mittal - 9728014818</span>
              </li>
              <li className="flex items-start">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-2 rounded-lg mr-3 mt-0.5">
                  <Mail className="h-5 w-5 text-cyan-400" />
                </div>
                <span className="text-gray-300">gaindi.saini@jaipur.manipal.edu<br />Tanishkmittal38@gmail.com</span>
              </li>
              <li className="flex items-start">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 p-2 rounded-lg mr-3 mt-0.5">
                  <MapPin className="h-5 w-5 text-purple-400" />
                </div>
                <span className="text-gray-300">
                  Manipal University Jaipur<br />
                  Dehmi Kalan, Rajasthan 303007
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/*<div className="border-t border-pink-400/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2025 IIC 2.0. All rights reserved. Built with ❤️ for innovation.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-300">Code of Conduct</a>
            </div>
          </div>
        </div>*/}
      </div>
    </footer>
  );
};

export default Footer;