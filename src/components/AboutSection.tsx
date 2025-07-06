import { Lightbulb, Users, Target, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center bg-blue-100 rounded-full px-6 py-2 mb-6">
            <Lightbulb className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-blue-600 font-medium">About IEDC GEC Palakkad</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Empowering Innovation, Driving Entrepreneurship
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about our mission, vision, and the impact we're making in the world of technology and business.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-scroll">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8 flex flex-col items-center">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-bounce-slow" />
              <div className="text-2xl font-bold text-gray-800 mb-2">Community</div>
              <div className="text-gray-600 font-medium text-center">
                Building a strong network of innovators and entrepreneurs.
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8 flex flex-col items-center">
              <Target className="h-12 w-12 text-indigo-500 mx-auto mb-4 animate-bounce-slow" style={{
                animationDelay: '0.2s'
              }} />
              <div className="text-2xl font-bold text-gray-800 mb-2">Vision</div>
              <div className="text-gray-600 font-medium text-center">
                To be a leading hub for innovation and startup creation.
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8 flex flex-col items-center">
              <Rocket className="h-12 w-12 text-emerald-500 mx-auto mb-4 animate-bounce-slow" style={{
                animationDelay: '0.4s'
              }} />
              <div className="text-2xl font-bold text-gray-800 mb-2">Mission</div>
              <div className="text-gray-600 font-medium text-center">
                Empowering students to develop innovative solutions and ventures.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* More Details */}
        <div className="mt-12 animate-on-scroll">
          <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Our Commitment
          </h3>
          <p className="text-gray-700 leading-relaxed text-center">
            We are committed to providing the resources, mentorship, and opportunities necessary for students to transform their ideas into successful startups.
            Join us in shaping the future of innovation and entrepreneurship at GEC Palakkad.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
