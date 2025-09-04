import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Brain, Shield, Users, Terminal, User } from 'lucide-react';
import me_photo from '../assets/me_photo.jpg';

const About = () => {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const profileImageRef = useRef(null);
  const backgroundRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Check if device is mobile for optimized animations
    const isMobile = window.innerWidth < 768;
    
    if (textRefs.current.length) {
      textRefs.current.forEach((ref, i) => {
        if (ref) {
          gsap.fromTo(ref,
            { opacity: 0, y: isMobile ? 20 : 40 },
            { 
              opacity: 1, 
              y: 0, 
              duration: isMobile ? 0.7 : 1, 
              delay: isMobile ? i * 0.2 : i * 0.3, 
              ease: 'power2.out' 
            }
          );
        }
      });
    }
    
    // Animate profile image with rotation and subtle bounce - optimized for mobile
    if (profileImageRef.current) {
      const isMobile = window.innerWidth < 768;
      
      gsap.fromTo(profileImageRef.current,
        { 
          scale: 0.8, 
          opacity: 0, 
          rotation: isMobile ? -5 : -10 
        },
        { 
          scale: 1, 
          opacity: 1, 
          rotation: 0, 
          duration: isMobile ? 1 : 1.5, 
          delay: isMobile ? 0.4 : 0.6, 
          ease: isMobile ? "back.out(1.5)" : "elastic.out(1, 0.3)",
        }
      );
      
      // Add subtle continuous animation - reduced for mobile
      gsap.to(profileImageRef.current, {
        y: isMobile ? '6px' : '10px',
        duration: isMobile ? 1.5 : 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    // Animate background elements - mobile optimized
    if (backgroundRef.current) {
      const circles = backgroundRef.current.querySelectorAll('div');
      const isMobile = window.innerWidth < 768;
      
      gsap.fromTo(circles, 
        { scale: 0.3, opacity: 0 },
        { 
          scale: 1, 
          opacity: isMobile ? 0.08 : 0.1, 
          duration: isMobile ? 1.5 : 2, 
          stagger: isMobile ? 0.2 : 0.3, 
          ease: isMobile ? "power2.out" : "power3.out" 
        }
      );
      
      // Add parallax effect on scroll - reduced for mobile
      circles.forEach((circle, i) => {
        const moveAmount = isMobile ? 
          { x: (i % 2 === 0) ? '3vw' : '-3vw', y: (i % 2 === 0) ? '3vh' : '-4vh' } : 
          { x: (i % 2 === 0) ? '5vw' : '-5vw', y: (i % 2 === 0) ? '5vh' : '-8vh' };
          
        gsap.to(circle, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: isMobile ? 1 : 1.5,
          },
          x: moveAmount.x,
          y: moveAmount.y,
          rotation: (i % 2 === 0) ? (isMobile ? 10 : 20) : (isMobile ? -10 : -20),
          ease: "none"
        });
      });
    }
    
    // Animate CTA section
    if (ctaRef.current) {
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(ctaRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
          );
        },
        once: true
      });
    }
    
      // Handle resize events for better mobile responsiveness
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      // Adjust animations based on screen size if needed
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
  <div className="min-h-screen w-full bg-black text-blue-100 font-mono relative overflow-x-hidden" style={{fontFamily: 'Fira Mono, JetBrains Mono, Source Code Pro, monospace'}}>
    {/* Subtle geometric background - responsive */}
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" ref={backgroundRef}>
      <div className="absolute top-1/3 left-1/4 w-40 sm:w-60 md:w-80 lg:w-96 h-40 sm:h-60 md:h-80 lg:h-96 bg-blue-900 opacity-10 rounded-full blur-lg sm:blur-xl md:blur-2xl lg:blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-36 sm:w-48 md:w-60 lg:w-72 h-36 sm:h-48 md:h-60 lg:h-72 bg-purple-900 opacity-10 rounded-full blur-md sm:blur-lg md:blur-xl lg:blur-2xl"></div>
      <div className="absolute top-1/2 right-1/2 w-24 sm:w-32 md:w-36 lg:w-40 h-24 sm:h-32 md:h-36 lg:h-40 bg-blue-700 opacity-10 rounded-full blur-sm sm:blur md:blur-lg lg:blur-xl"></div>
      <div className="absolute top-3/4 left-1/3 w-28 sm:w-36 md:w-40 lg:w-48 h-28 sm:h-36 md:h-40 lg:h-48 bg-cyan-700 opacity-10 rounded-full blur-md sm:blur-lg md:blur-xl lg:blur-2xl"></div>
      <div className="absolute top-1/4 right-1/3 w-32 sm:w-40 md:w-48 lg:w-56 h-32 sm:h-40 md:h-48 lg:h-56 bg-indigo-900 opacity-10 rounded-full blur-md sm:blur-lg md:blur-xl lg:blur-2xl"></div>
    </div>
  <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16" ref={containerRef}>
        {/* Header - adjusted padding for better mobile view with navbar */}
        <div 
          ref={el => textRefs.current[0] = el}
          className="text-center mb-8 sm:mb-10 md:mb-14 lg:mb-16 relative z-10"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 drop-shadow-lg" style={{fontFamily:'Fira Mono, JetBrains Mono, Source Code Pro, monospace'}}>
            <span className="inline-block hover:scale-105 transition-transform duration-300 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">About</span> <span className="inline-block hover:scale-105 transition-transform duration-300">Me</span>
          </h1>
          <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-3 sm:mb-6"></div>
          <div className="text-blue-300 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            <span className="font-mono text-blue-400">&lt;</span>Code<span className="font-mono text-blue-400">/&gt;</span> • <span className="font-mono text-green-400">&lt;</span>Learn<span className="font-mono text-green-400">/&gt;</span> • <span className="font-mono text-purple-400">&lt;</span>Create<span className="font-mono text-purple-400">/&gt;</span>
          </div>
        
        </div>

        {/* Main Content */}
        <div className="max-w-4xl md:max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 items-center mb-8 sm:mb-10 md:mb-14 lg:mb-16">
            {/* Profile Info */}
            <div 
              ref={el => textRefs.current[1] = el}
              className="opacity-0 transform translate-y-10 transition-all duration-700 delay-200 w-full lg:w-1/2"
            >
              <div className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-5 md:p-6 lg:p-8 border border-blue-900">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-100 mb-3 sm:mb-4 md:mb-6" style={{fontFamily:'Fira Mono, JetBrains Mono, Source Code Pro, monospace'}}>Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">I'm Jatin Kavani</span></h2>
                <div className="space-y-2 sm:space-y-3 text-blue-200">
                  <p className="leading-relaxed text-xs sm:text-sm md:text-base tracking-wide">
                    A passionate Computer Engineering student driven by the transformative potential of technology.
                    <span className="hidden sm:inline"><br/></span> I'm fascinated by the intersection of innovation and practical application.
                  </p>
                  <div>
                    <h3 className="font-semibold text-blue-400 mb-1 sm:mb-2 text-xs sm:text-sm">Interests & Focus Areas:</h3>
                    <ul className="list-disc list-inside space-y-1 text-xs sm:text-xs md:text-sm font-mono">
                      <li>Artificial Intelligence & Machine Learning</li>
                      <li>Cybersecurity & Information Security</li>
                      <li>Web Development & Software Engineering</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-400 mb-1 sm:mb-2 text-xs sm:text-sm">Leadership Roles:</h3>
                    <ul className="list-disc list-inside space-y-1 text-xs sm:text-xs md:text-sm font-mono">
                      <li>Executive Member - IEEE SOU WIE SB AG</li>
                      <li>Webmaster - Student Organization</li>
                    </ul>
                  </div>
                  <p className="leading-relaxed text-xs sm:text-sm md:text-base">
                    My goal is to collaborate on innovative projects and contribute to the ever-evolving 
                    landscape of technology while continuously learning and growing as a developer.
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div 
              ref={el => textRefs.current[2] = el}
              className="opacity-0 transform translate-x-10 transition-all duration-700 delay-400 flex items-center justify-center w-full lg:w-1/2 pt-6 lg:pt-0"
            >
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 mb-3 sm:mb-4 md:mb-6" ref={profileImageRef}>
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-950 rounded-full flex items-center justify-center shadow-2xl border-2 sm:border-4 border-blue-800 overflow-hidden relative">
                  <img 
                    src={me_photo} 
                    alt="Jatin Kavani" 
                    className="object-cover w-full h-full rounded-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-600/10 rounded-full"></div>
                </div>
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-sm sm:blur-md md:blur-lg -z-10"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
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

export default About;