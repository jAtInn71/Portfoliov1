import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Skills = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const headerRef = useRef(null);
  const backgroundRef = useRef(null);
  const tickerRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Detect if device is mobile
    const isMobile = window.innerWidth < 768;
    
    // Header animations - simplified for mobile
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { y: isMobile ? -15 : -30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: isMobile ? 0.8 : 1.2, 
          stagger: isMobile ? 0.15 : 0.2, 
          ease: "power2.out" 
        }
      );
    }
    
    // Skill section animations with GSAP - optimized for mobile
    if (sectionRefs.current.length) {
      sectionRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        ScrollTrigger.create({
          trigger: ref,
          start: isMobile ? "top bottom-=50px" : "top bottom-=100px",
          onEnter: () => {
            gsap.to(ref, {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: isMobile ? 0.6 : 0.8,
              delay: isMobile ? index * 0.1 : index * 0.15,
              ease: "back.out(1.2)"
            });
          },
          once: true
        });
      });
    }
    
    // Background elements animation - reduced for mobile
    if (backgroundRef.current) {
      const circles = backgroundRef.current.querySelectorAll('div');
      const isMobile = window.innerWidth < 768;
      
      gsap.fromTo(circles, 
        { scale: 0.5, opacity: 0 },
        { 
          scale: 1, 
          opacity: isMobile ? 0.08 : 0.1, 
          duration: isMobile ? 1.5 : 2, 
          stagger: isMobile ? 0.2 : 0.3, 
          ease: "power2.out" 
        }
      );
      
      // Add parallax effect on scroll - reduced movement on mobile
      circles.forEach((circle, i) => {
        const moveAmount = isMobile ? 
          { x: (i % 2 === 0) ? '2vw' : '-2vw', y: (i % 2 === 0) ? '2vh' : '-3vh' } : 
          { x: (i % 2 === 0) ? '4vw' : '-4vw', y: (i % 2 === 0) ? '4vh' : '-6vh' };
        
        gsap.to(circle, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: isMobile ? 1 : 1.5,
          },
          x: moveAmount.x,
          y: moveAmount.y,
          rotation: (i % 2 === 0) ? (isMobile ? 10 : 15) : (isMobile ? -10 : -15),
          ease: "none"
        });
      });
    }
    
    // Ticker animation - optimized for mobile
    if (tickerRef.current) {
      const isMobile = window.innerWidth < 768;
      gsap.fromTo(tickerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: isMobile ? 0.8 : 1, delay: isMobile ? 1 : 1.5 }
      );
      
      // Add responsive animation speed adjustment
      const tickerElement = tickerRef.current.querySelector('.animate-ticker');
      if (tickerElement) {
        if (isMobile) {
          tickerElement.style.animationDuration = '20s';
        } else {
          tickerElement.style.animationDuration = '30s';
        }
      }
    }
    
    // Handle resize events to adjust animations for different screen sizes
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      
      // Update ticker animation speed on resize
      const tickerElement = tickerRef.current?.querySelector('.animate-ticker');
      if (tickerElement) {
        tickerElement.style.animationDuration = isMobile ? '20s' : '30s';
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Technology icons ticker
  const technologies = [
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "HTML5", icon: "fab fa-html5" },
    { name: "CSS3", icon: "fab fa-css3-alt" },
    { name: "Tailwind CSS", icon: "fab fa-css3" },
    { name: "Node.js", icon: "fab fa-node-js" },
    { name: "Express", icon: "fas fa-server" },
    { name: "MongoDB", icon: "fas fa-database" },
    { name: "Firebase", icon: "fas fa-fire" },
    { name: "Git", icon: "fab fa-git-alt" },
    { name: "AWS S3", icon: "fab fa-aws" },
    { name: "Cloud", icon: "fas fa-cloud" },
    { name: "Wireshark", icon: "fas fa-network-wired" },
    { name: "Kali Linux", icon: "fab fa-linux" },
    { name: "Nmap", icon: "fas fa-search" }
  ];

  const skillSections = [
    {
      id: 'frontend',
      title: 'Frontend',
      color: 'cyan-400',
      technologies: [
        { name: 'React', icon: "fab fa-react" },
        { name: 'JavaScript', icon: "fab fa-js" },
        { name: 'HTML5', icon: "fab fa-html5" },
        { name: 'CSS3', icon: "fab fa-css3-alt" },
        { name: 'Tailwind CSS', icon: "fab fa-css3" }
      ]
    },
    {
      id: 'backend',
      title: 'Backend',
      color: 'green-400',
      technologies: [
        { name: 'Node.js', icon: "fab fa-node-js" },
        { name: 'Express', icon: "fas fa-server" },
        { name: 'MongoDB', icon: "fas fa-database" },
        { name: 'Firebase', icon: "fas fa-fire" }
      ]
    },
    {
      id: 'cloud',
      title: 'Cloud Services',
      color: 'blue-400',
      technologies: [
        { name: 'AWS S3', icon: "fab fa-aws" },
        { name: 'Azure', icon: "fab fa-microsoft" },
        { name: 'Cloud Functions', icon: "fas fa-cloud" },
        { name: 'Cloud Storage', icon: "fas fa-database" }
      ]
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      color: 'red-400',
      technologies: [
        { name: 'Wireshark', icon: "fas fa-network-wired" },
        { name: 'Kali Linux', icon: "fab fa-linux" },
        { name: 'Nmap', icon: "fas fa-search" },
        { name: 'Security Testing', icon: "fas fa-shield-alt" }
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Skills',
      color: 'purple-400',
      technologies: [
        { name: 'Git', icon: "fab fa-git-alt" },
        { name: 'npm', icon: "fab fa-npm" },
        { name: 'VS Code', icon: "fas fa-code" },
        { name: 'Figma', icon: "fab fa-figma" },
        { name: 'UI/UX Design', icon: "fas fa-paint-brush" }
      ]
    }
  ];

  return (
    <div className="min-h-screen w-full bg-black text-blue-100 font-mono relative" style={{fontFamily: 'Fira Mono, JetBrains Mono, Source Code Pro, monospace'}}>
      {/* Subtle geometric background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" ref={backgroundRef}>
        <div className="absolute top-1/3 left-1/4 w-40 sm:w-64 md:w-80 lg:w-96 h-40 sm:h-64 md:h-80 lg:h-96 bg-blue-900 opacity-10 rounded-full blur-xl sm:blur-2xl md:blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 md:w-64 lg:w-72 h-32 sm:h-48 md:h-64 lg:h-72 bg-purple-900 opacity-10 rounded-full blur-lg sm:blur-xl md:blur-2xl"></div>
        <div className="absolute top-1/2 right-1/2 w-24 sm:w-32 md:w-36 lg:w-40 h-24 sm:h-32 md:h-36 lg:h-40 bg-blue-700 opacity-10 rounded-full blur-md sm:blur-lg md:blur-xl"></div>
        <div className="absolute top-3/4 left-1/3 w-28 sm:w-36 md:w-40 lg:w-48 h-28 sm:h-36 md:h-40 lg:h-48 bg-cyan-700 opacity-10 rounded-full blur-lg sm:blur-xl md:blur-2xl"></div>
        <div className="absolute top-1/4 right-1/3 w-32 sm:w-40 md:w-48 lg:w-56 h-32 sm:h-40 md:h-48 lg:h-56 bg-indigo-900 opacity-10 rounded-full blur-lg sm:blur-xl md:blur-2xl"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10" ref={containerRef}>
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20" ref={headerRef}>
         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-6 sm:mb-8 drop-shadow-xl" style={{fontFamily:'Fira Mono, JetBrains Mono, Source Code Pro, monospace'}}> <span className="inline-block hover:scale-105 transition-transform duration-300 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">My</span>{" "} <span className="inline-block hover:scale-105 transition-transform duration-300">Skills</span> </h1>
          <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-3 sm:mb-4 md:mb-6"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-200 max-w-3xl mx-auto px-2">
            Technologies, tools, and platforms I work with to create innovative solutions.
          </p>
          
        </div>

        {/* Skill Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          {skillSections.map((section, sectionIndex) => (
            <div 
              key={section.id}
              ref={el => sectionRefs.current[sectionIndex] = el}
              className="opacity-0 scale-95 translate-y-10 transition-all duration-1000 bg-gray-900 rounded-xl shadow-2xl overflow-hidden hover:shadow-blue-900 hover:shadow-2xl flex flex-col"
              style={{ transitionDelay: `${sectionIndex * 150}ms` }}
            >
              <div className="h-16 sm:h-20 md:h-24 bg-blue-950 flex items-center justify-center">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400 mb-4" style={{fontFamily:'Fira Mono, JetBrains Mono, Source Code Pro, monospace', color: `var(--tw-text-opacity-${section.color})`}}>{section.title}</span>
              </div>
              <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col">
                <div className="space-y-2 sm:space-y-3">
                  {section.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center">
                      <i className={`${tech.icon} mr-2 sm:mr-3 text-base sm:text-lg`} style={{ color: `var(--tw-text-opacity-${section.color})` }}></i>
                      <span className="text-sm sm:text-base text-blue-100" style={{fontFamily:'Fira Mono, JetBrains Mono, Source Code Pro, monospace'}}>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Logo Ticker */}
        <div className="max-w-full mx-auto mt-8 sm:mt-12 md:mt-16" ref={tickerRef}>
          <div className="p-3 sm:p-4 bg-gray-900/50 rounded-xl shadow-inner border border-blue-900/20">
           
            <div className="overflow-hidden w-full">
              <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8 animate-ticker" style={{ minWidth: '200vw' }}>
                {technologies.concat(technologies).map((tech, index) => (
                  <div key={index} className="flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3">
                    <i className={`${tech.icon} text-2xl sm:text-3xl md:text-4xl text-blue-400`} style={{ minWidth: '24px', minHeight: '24px', sm: { minWidth: '32px', minHeight: '32px' }, md: { minWidth: '48px', minHeight: '48px' } }}></i>
                    <span className="text-xs text-blue-300 mt-0.5 sm:mt-1 text-center">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
        
        /* Dynamic color variables for skill sections */
        :root {
          --tw-text-opacity-cyan-400: rgb(34 211 238);
          --tw-text-opacity-green-400: rgb(74 222 128);
          --tw-text-opacity-blue-400: rgb(96 165 250);
          --tw-text-opacity-red-400: rgb(248 113 113);
          --tw-text-opacity-purple-400: rgb(192 132 252);
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .animate-ticker {
            animation: ticker 20s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default Skills;
