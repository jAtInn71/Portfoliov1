import React, { useEffect, useRef } from 'react';
import { User } from 'lucide-react';
import me_photo from '../assets/me_photo.jpg';

const About = () => {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const profileImageRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    // Animate text elements
    if (textRefs.current.length) {
      textRefs.current.forEach((ref, i) => {
        if (ref) {
          ref.style.opacity = '0';
          ref.style.transform = `translateY(${isMobile ? 20 : 40}px)`;
          
          setTimeout(() => {
            ref.style.transition = `all ${isMobile ? 0.7 : 1}s ease-out`;
            ref.style.opacity = '1';
            ref.style.transform = 'translateY(0)';
          }, i * (isMobile ? 200 : 300));
        }
      });
    }
    
    // Animate profile image
    if (profileImageRef.current) {
      profileImageRef.current.style.opacity = '0';
      profileImageRef.current.style.transform = `scale(0.8) rotate(${isMobile ? -5 : -10}deg)`;
      
      setTimeout(() => {
        profileImageRef.current.style.transition = 'all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        profileImageRef.current.style.opacity = '1';
        profileImageRef.current.style.transform = 'scale(1) rotate(0deg)';
      }, isMobile ? 400 : 600);
    }

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (gridRef.current) {
        gridRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-blue-100 font-mono relative overflow-hidden" style={{fontFamily: 'Fira Mono, JetBrains Mono, Source Code Pro, monospace'}}>
      
      {/* Professional Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" ref={gridRef}>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-900 opacity-20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-purple-900 opacity-20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-40 md:w-64 md:h-64 bg-cyan-900 opacity-15 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Floating Code Symbols */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-blue-500 opacity-10 text-4xl md:text-6xl animate-float">&lt;/&gt;</div>
        <div className="absolute top-1/3 right-16 text-purple-500 opacity-10 text-3xl md:text-5xl animate-float" style={{animationDelay: '1s'}}>{'{ }'}</div>
        <div className="absolute bottom-1/4 left-1/4 text-cyan-500 opacity-10 text-3xl md:text-5xl animate-float" style={{animationDelay: '2s'}}>[ ]</div>
        <div className="absolute bottom-32 right-20 text-blue-400 opacity-10 text-4xl md:text-6xl animate-float" style={{animationDelay: '1.5s'}}>=&gt;</div>
        <div className="absolute top-1/2 left-1/3 text-purple-400 opacity-10 text-2xl md:text-4xl animate-float" style={{animationDelay: '2.5s'}}>( )</div>
      </div>

      {/* Geometric Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="w-full h-full opacity-5">
          <line x1="0" y1="20%" x2="100%" y2="30%" stroke="url(#gradient1)" strokeWidth="2"/>
          <line x1="0" y1="60%" x2="100%" y2="50%" stroke="url(#gradient2)" strokeWidth="2"/>
          <line x1="10%" y1="0" x2="20%" y2="100%" stroke="url(#gradient3)" strokeWidth="1"/>
          <line x1="80%" y1="0" x2="90%" y2="100%" stroke="url(#gradient4)" strokeWidth="1"/>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0"/>
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="1"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333ea" stopOpacity="0"/>
              <stop offset="50%" stopColor="#9333ea" stopOpacity="1"/>
              <stop offset="100%" stopColor="#9333ea" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0"/>
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="1"/>
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0"/>
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1"/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
  <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 relative z-10" ref={containerRef}>
        
        {/* Header */}
  <div ref={el => textRefs.current[0] = el} className="text-center mb-6 md:mb-8">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl">
            <span className="inline-block hover:scale-110 transition-transform duration-300 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">About</span>
            {" "}
            <span className="inline-block hover:scale-110 transition-transform duration-300">Me</span>
          </h1>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
            
            {/* Profile Info */}
            <div ref={el => textRefs.current[1] = el} className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-2xl p-6 md:p-8 border border-blue-900/50 backdrop-blur-sm hover:border-blue-700/50 transition-all duration-300">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-100 mb-6">
                  Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">I'm Jatin</span>
                </h2>
                
                <div className="space-y-5 text-blue-200">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-blue-400 mb-3 text-base md:text-lg">Interests & Focus Areas:</h3>
                    <ul className="space-y-2 text-sm md:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">▹</span>
                        <span>Artificial Intelligence & Machine Learning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">▹</span>
                        <span>Cybersecurity & Information Security</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">▹</span>
                        <span>Web Development & Software Engineering</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-purple-400 mb-3 text-base md:text-lg">Leadership Roles:</h3>
                    <ul className="space-y-2 text-sm md:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">▹</span>
                        <span>Webmaster - IEEE SOU WIE SB AG (Executive)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">▹</span>
                        <span>Member - Google Developer Student Club</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="leading-relaxed text-sm md:text-base text-blue-300 border-l-4 border-cyan-500 pl-4">
                    My goal is to collaborate on innovative projects and contribute to the ever-evolving 
                    landscape of technology while continuously learning and growing as a developer.
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div ref={el => textRefs.current[2] = el} className="order-1 lg:order-2 flex items-center justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96" ref={profileImageRef}>
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-950 rounded-full flex items-center justify-center shadow-2xl border-4 border-blue-800 overflow-hidden relative animate-float-gentle">
                  <img src={me_photo} alt="Jatin Kavani" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-600/20 rounded-full"></div>
                </div>
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-xl -z-10 animate-pulse-slow"></div>
                
                {/* Orbiting Elements */}
                <div className="absolute top-0 left-1/2 w-4 h-4 bg-blue-400 rounded-full animate-orbit -z-10"></div>
                <div className="absolute top-1/2 right-0 w-3 h-3 bg-purple-400 rounded-full animate-orbit-reverse -z-10"></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(160px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(160px) rotate(-360deg); }
        }
        
        @keyframes orbit-reverse {
          0% { transform: rotate(0deg) translateX(160px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(160px) rotate(360deg); }
        }
        
        .animate-orbit {
          animation: orbit 10s linear infinite;
        }
        
        .animate-orbit-reverse {
          animation: orbit-reverse 15s linear infinite;
        }
        
        @media (max-width: 768px) {
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
          }
          
          @keyframes orbit-reverse {
            0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
            100% { transform: rotate(-360deg) translateX(120px) rotate(360deg); }
          }
        }
      `}</style>
    </div>
  );
};

export default About;