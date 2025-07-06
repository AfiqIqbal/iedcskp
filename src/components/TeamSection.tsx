
import { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const teamMembers = [
  {
    name: "DR. JOSEPH",
    role: "NODAL OFFICER",
    image: "/team/NODAL_OFFICER.jpg",
    linkedin: "https://www.linkedin.com/in/joseph-peter-aa312738?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "josephedatt@gmail.com"
  },
  {
    name: "AFIQ IQBAL K",
    role: "LEAD",
    image: "/team/LEAD.jpg",
    linkedin: "https://www.linkedin.com/in/afiq-iqbal-522675282/",
    email: "afiqiqbalk19@gmail.com",
    github: "https://github.com/AfiqIqbal"
  },
  {
    name: "NAVAMI BR",
    role: "CO LEAD",
    image: "/team/CO-LEAD.jpg",
    linkedin: "https://linkedin.com/in/navamibr-nbr24",
    email: "navami.br24@gmail.com",
    github: "https://github.com/NBR-24"
  },
  {
    name: "GOPIKA KRISHNA",
    role: "CREATIVE AND INNOVATION LEAD",
    image: "/team/CREATIVE_AND_INNOVATION_LEAD.jpg",
    linkedin: "https://in.linkedin.com/in/gopika-krishna-94682a317",
    email: "gopikaxvii@gmail.com",
    github: "https://github.com/gopikax"
  },
  {
    name: "NEERAJ TR",
    role: "IPR & RESEARCH LEAD",
    image: "/team/IPR_&_RESEARCH_LEAD.jpg",
    linkedin: "https://www.linkedin.com/in/neeraj-tr-142280319",
    email: "neerajtr360@gmail.com",
    github: "https://github.com/neerajtr360"
  },
  {
    name: "NIRANJANA MV",
    role: "QUALITY AND OPERATION LEAD",
    image: "/team/QUALITY_AND_OPERATION_LEAD.jpg",
    linkedin: "https://www.linkedin.com/in/niranjana-mv-",
    email: "niranjanamv04@gmail.com",
    github: "https://github.com/NiranjanaMV"
  },
  {
    name: "NANDHANA KP",
    role: "WOMEN IN INNOVATION LEAD",
    image: "/team/WOMEN_IN_INNOVATION_LEAD.jpg",
    linkedin: "https://www.linkedin.com/in/nandhana-kp-662312251",
    email: "kpnandhana2004@gmail.com",
    github: "https://github.com/Nandhanakp"
  },
  {
    name: "ANSAAF",
    role: "COMMUNITY LEAD",
    image: "/team/COMMUNITY_LEAD.jpg",
    linkedin: "https://www.linkedin.com/in/ansaafanas",
    email: "ansaafanas3@gmail.com",
    github: "https://github.com/Ansaafanas"
  },
  {
    name: "MOHAMMED ASLAM",
    role: "FINANCE LEAD",
    image: "/team/FINANCE_LEAD.jpg",
    linkedin: "https://www.linkedin.com/in/mohammed-aslam-71079a27b",
    email: "mhdaslamktd@gmail.com",
    github: "https://github.com/mhdaslamp"
  },
  {
    name: "SARFAS P",
    role: "BRANDING LEAD",
    image: "/team/BRANDING_LEAD.jpg",
    linkedin: "https://www.linkedin.com/in/sarfas-p646",
    email: "sarfaspattarathil@gmail.com",
    github: "https://github.com/SARFAS-P"
  },
  {
    name: "ASWATHI KR",
    role: "DESIGN LEAD",
    image: "/team/DESIGN_LEAD.jpg",
    linkedin: "https://www.linkedin.com/in/aswathi-k-r-8959372a2",
    email: "aswathihq@gmail.com",
    github: "https://github.com/aswathihq"
  },
  {
    name: "ADITHYAN K",
    role: "CONTENT LEAD",
    image: "/team/CONTENT_LEAD.jpg",
    linkedin: "https://in.linkedin.com/in/adithyank106",
    email: "adithyank106@gmail.com",
    github: "https://github.com/AdithyanK10"
  },
  {
    name: "AYYAPPA DAS K",
    role: "TECHNOLOGY LEAD",
    image: "/team/TECHNOLOGY_LEAD.jpg",
    linkedin: "https://www.linkedin.com/in/ayyappadasvasudevan",
    email: "ayyappadasvasudev@gmail.com",
    github: "https://github.com/AYYAPPADAS605"
  }
];

const TeamSection = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center bg-blue-100 rounded-full px-6 py-2 mb-6">
            <span className="text-blue-600 font-medium">Meet Our Team</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Innovators Behind 
            <span className="text-gradient-modern bg-clip-text text-transparent block">
              IEDC GEC PKD
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate individuals working together to foster innovation and entrepreneurship
          </p>
        </div>

        {/* Team Grid - Center-focused symmetric layout */}
        <div className="flex flex-wrap justify-center gap-8 animate-on-scroll">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative w-full max-w-xs sm:w-80 md:w-72 lg:w-64"
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 h-full">
                {/* Profile Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay with social icons */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3`}>
                    <div className="flex space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                          <Linkedin className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                          <Mail className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                          <Github className="w-4 h-4 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-blue-500 transition-colors duration-300">
                    {member.role}
                  </p>
                </div>

                {/* Animated background effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-indigo-400/0 to-purple-400/0 group-hover:from-blue-400/10 group-hover:via-indigo-400/10 group-hover:to-purple-400/10 transition-all duration-500 -z-10"></div>
              </div>

              {/* Floating animation dots */}
              {hoveredMember === index && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
