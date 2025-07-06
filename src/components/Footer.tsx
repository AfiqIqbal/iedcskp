
import { Heart, Mail, Phone, MapPin, Lightbulb } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const quickLinks = [
    { name: 'About IEDC', id: 'about' },
    { name: 'Our Team', id: 'team' },
    { name: 'Programs', id: 'about' },
    { name: 'Events', id: 'events' },
    { name: 'Contact', id: 'contact' },
    { name: 'Resources', id: 'about' }
  ];

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Club Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">IEDC</h3>
                <p className="text-blue-300 text-sm">GEC PKD</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Innovation and Entrepreneurship Development Cell at Government Engineering College Palakkad, 
              fostering the next generation of entrepreneurs and innovators.
            </p>
            <div className="flex space-x-4">
              {/* Social Links */}
              <div className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                <span className="text-sm">📘</span>
              </div>
              <div className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                <span className="text-sm">📧</span>
              </div>
              <div className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                <span className="text-sm">📸</span>
              </div>
              <div className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                <span className="text-sm">💼</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:underline text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-400" />
                <span className="text-gray-300 text-sm">iedc@gecpkd.ac.in</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-indigo-400" />
                <span className="text-gray-300 text-sm">+91 9876543210</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-emerald-400 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Government Engineering College<br />
                  Sreekrishnapuram, Palakkad<br />
                  Kerala, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 IEDC GEC PKD. All rights reserved.
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              Made with <Heart className="h-4 w-4 mx-1 text-red-400" /> by IEDC Team
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
