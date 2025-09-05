import React, { useEffect, useRef, useState } from 'react';
import { Award, ExternalLink, Calendar, Building, CheckCircle, Clock, BookOpen, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Certificates = () => {
  const [filter, setFilter] = useState('all');
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const headerRef = useRef(null);
  const backgroundShapesRef = useRef(null);
  const filterRef = useRef(null);
  const learningGoalsRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Header animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { y: -40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.2,
          ease: "power3.out" 
        }
      );
    }
    
    // Background shapes animation
    if (backgroundShapesRef.current) {
      const shapes = backgroundShapesRef.current.children;
      gsap.fromTo(shapes, 
        { scale: 0.6, opacity: 0 },
        { 
          scale: 1, 
          opacity: 0.1, 
          duration: 2, 
          stagger: 0.3, 
          ease: "power2.out" 
        }
      );
      
      // Add parallax effect on scroll
      Array.from(shapes).forEach((shape, i) => {
        gsap.to(shape, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
          x: (i % 2 === 0) ? '5vw' : '-5vw',
          y: (i % 3 === 0) ? '5vh' : '-5vh',
          rotation: (i % 2 === 0) ? 15 : -15,
          ease: "none"
        });
      });
    }
    
    // Certificate cards animation
    if (cardRefs.current.length) {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: "top bottom-=100px",
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: "back.out(1.2)"
            });
          },
          once: true
        });
      });
    }
    
    // Learning goals section animation
    if (learningGoalsRef.current) {
      gsap.fromTo(
        learningGoalsRef.current,
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: learningGoalsRef.current,
            start: "top bottom-=100px",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out"
        }
      );
    }
    
    // Filter buttons animation
    if (filterRef.current) {
      gsap.fromTo(
        filterRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.5,
          ease: "power2.out"
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filter]);

  const certificates = [
    {
      id: 1,
      title: "Computer Networking Course",
      issuer: "National Skill Development Corporation",
      date: "2024",
      status: "completed",
      description: "Comprehensive course covering computer networking concepts, protocols, and security"
    },
    {
      id: 2,
      title: "Ethical Hacking Course",
      issuer: "National Skill Development Corporation",
      date: "2024",
      status: "completed",
      description: "Comprehensive course on ethical hacking, penetration testing, and network security"
    },
    {
      id: 3,
      title: "Learn Java Beginner to Advanced",
      issuer: "IEEE Learning Network",
      date: "2024",
      status: "completed",
      description: "Comprehensive course covering Java programming from beginner to advanced topics"
    },
    {
      id: 4,
      title: "Python and Ethical Hacking",
      issuer: "Udemy",
      date: "2024",
      status: "completed",
      description: "Comprehensive course on Python programming with a focus on ethical hacking techniques"
    },
    {
      id: 5,
      title: "IEEE core committee member",
      issuer: "IEEE Student Branch",
      date: "2024",
      status: "completed",
      description: "Leadership development and professional skills for IEEE student members"
    }
  ];

  const filteredCertificates = filter === 'all' ? certificates : certificates.filter(cert => cert.status === filter);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'planned':
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      default:
        return <Award className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'planned':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'planned':
        return 'Planned';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-blue-100 font-mono relative min-h-screen w-full  text-white" style={{fontFamily: 'Fira Mono, JetBrains Mono, Source Code Pro, monospace, '}} > 
    
      {/* Animated geometric background */}
      <div ref={backgroundShapesRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-900 to-purple-900 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-tr from-purple-900 to-indigo-900 opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-1/2 w-40 h-40 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/2 w-64 h-64 bg-gradient-to-bl from-indigo-800 to-blue-900 opacity-10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 relative z-10" ref={containerRef}>
        {/* Header */}
        <div className="text-center mb-12" ref={headerRef}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-6 sm:mb-8 drop-shadow-xl" style={{fontFamily:'Fira Mono, JetBrains Mono, Source Code Pro, monospace'}}> <span className="inline-block hover:scale-105 transition-transform duration-300 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Certifications</span> </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            My journey of continuous learning, growth, and curiosity. Here are some milestones and future goals!
          </p>
        </div>
        
       

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
          {filteredCertificates.map((certificate, index) => (
            <div
              key={certificate.id}
              ref={el => cardRefs.current[index] = el}
              className="opacity-0 translate-y-10 scale-95 bg-gray-900 rounded-xl border border-blue-900/30 shadow-xl overflow-hidden hover:shadow-blue-900/50 hover:shadow-2xl flex flex-col transition-all duration-500"
            >
              {/* Certificate Header */}
              <div className="h-28 sm:h-32 bg-gradient-to-r from-blue-950 to-indigo-950 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-full h-full" style={{ 
                    backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.3) 0%, transparent 50%)'
                  }}></div>
                </div>
                <Award className="w-12 h-12 sm:w-16 sm:h-16 text-blue-300 opacity-80 drop-shadow-lg" />
              </div>
              
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                {/* Certificate Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 drop-shadow" style={{fontFamily:'Fira Mono, JetBrains Mono, Source Code Pro, monospace'}}>
                  {certificate.title}
                </h3>
                
                {/* Issuer and Date */}
                <div className="flex flex-col gap-1 mb-2 sm:mb-4 text-blue-200">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">{certificate.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">{certificate.date}</span>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed mt-auto">
                  {certificate.description}
                </p>
                
                {/* View Button (placeholder) */}
                <button className="mt-4 text-xs sm:text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  View Certificate
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Goals Section */}
        <div ref={learningGoalsRef} className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 border border-blue-900/30 mt-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" style={{fontFamily:'Fira Mono, JetBrains Mono, Source Code Pro, monospace'}}>
            Continuous Learning Path
          </h3>
          <p className="text-blue-200 mt-6 max-w-3xl mx-auto text-center text-xs sm:text-sm">
            I'm passionate about continuous learning and staying at the forefront of technology.
            <br className="hidden sm:block" />
            Let's connect and learn together!
          </p>
        </div>
      </div>

      <style jsx>{`
        .animate-slide-up {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Certificates;
