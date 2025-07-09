import { useState, useEffect } from 'react';
import { ArrowRight, Users, Calendar, Trophy, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth * 100,
        y: e.clientY / window.innerHeight * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Subtle Mesh Background */}
      <div className="absolute inset-0 bg-mesh opacity-50"></div>
      
      {/* Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '2s'
      }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => <div key={i} className="absolute w-2 h-2 rounded-full animate-float" style={{
        background: `linear-gradient(45deg, rgba(37, 99, 235, 0.6), rgba(59, 130, 246, 0.6))`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 4}s`
      }}></div>)}
      </div>

      {/* Interactive Light Effect */}
      <div className="absolute inset-0 opacity-30" style={{
      background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(37, 99, 235, 0.15) 0%, transparent 50%)`
    }}></div>

      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto my-[37px]">
        {/* Main Heading */}
        <div className="animate-fade-in">
          <div className="mb-6">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
              <Lightbulb className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-white text-sm font-medium">Innovation Hub of GEC Palakkad</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            <span className="block text-white">
              IEDC
            </span>
            <span className="block text-4xl md:text-6xl text-white/90 font-light">
              GEC PALAKKAD
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
            Fostering innovation, nurturing entrepreneurship, and building the next generation of tech leaders. 
            Join our vibrant community of creators and innovators.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-left">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-glow hover:shadow-xl transition-all duration-300 border-0" onClick={() => window.open('https://chat.whatsapp.com/GWLnRT2rWFPGu0nlfQk0CL', '_blank')}>            Join IEDC
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="border-2 border-white/40 text-white backdrop-blur-sm px-8 py-6 text-lg font-semibold rounded-full bg-white/5" onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Programs
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-right">
          <div className="glass rounded-2xl p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
            <Users className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-bounce-slow" />
            <div className="text-3xl font-bold text-gray-800 mb-2">300+</div>
            <div className="text-gray-600 font-medium">Active Members</div>
          </div>
          <div className="glass rounded-2xl p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
            <Calendar className="h-12 w-12 text-indigo-500 mx-auto mb-4 animate-bounce-slow" style={{
            animationDelay: '0.2s'
          }} />
            <div className="text-3xl font-bold text-gray-800 mb-2">50+</div>
            <div className="text-gray-600 font-medium">Events Conducted</div>
          </div>
          <div className="glass rounded-2xl p-8 hover:shadow-glow transition-all duration-300 hover:scale-105">
            <Trophy className="h-12 w-12 text-emerald-500 mx-auto mb-4 animate-bounce-slow" style={{
            animationDelay: '0.4s'
          }} />
            <div className="text-3xl font-bold text-gray-800 mb-2">5+</div>
            <div className="text-gray-600 font-medium">Startups Incubated</div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;