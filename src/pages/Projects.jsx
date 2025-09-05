import React, { useEffect, useRef } from 'react';
import { ExternalLink, Github, Calendar, Code, Globe, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Projects = () => {
  const containerRef = useRef(null);
  const projectRefs = useRef([]);
  const headerRef = useRef(null);
  const backgroundRef = useRef(null);
  const ctaRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Modern, responsive portfolio built with React and TailwindCSS featuring smooth animations, creative layouts, and dynamic content rendering.",
      technologies: ["React", "TailwindCSS", "JavaScript", "HTML5"],
      category: "Web Development",
      status: "Completed",
      date: "2024",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Restaurant Management App",
      description: "Full-stack application for restaurant owners to manage orders, inventory, staff scheduling, and customer relationships with real-time updates.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      category: "Full Stack",
      status: "Completed",
      date: "2023",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "IEEE SOU SB Website",
      description: "Official website for IEEE Student Branch showcasing events, team members, achievements, and providing resources for IEEE members.",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      category: "Web Development",
      status: "Live",
      date: "2023",
      liveUrl: "#",
      githubUrl: "#"
    },

  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Check if device is mobile for optimized animations
    const isMobile = window.innerWidth < 768;
    
    // Header animation - optimized for mobile
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { y: isMobile ? -30 : -50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: isMobile ? 0.7 : 1, 
          stagger: isMobile ? 0.15 : 0.2, 
          ease: isMobile ? "power2.out" : "power3.out" 
        }
      );
    }
    
    // Project cards animation with GSAP - optimized for mobile
    if (projectRefs.current.length) {
      projectRefs.current.forEach((ref, index) => {
        if (ref) {
          ScrollTrigger.create({
            trigger: ref,
            start: isMobile ? "top bottom-=50px" : "top bottom-=100px",
            onEnter: () => {
              gsap.to(ref, {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: isMobile ? 0.5 : 0.7,
                delay: isMobile ? index * 0.06 : index * 0.1,
                ease: "power2.out"
              });
            },
            once: true
          });
        }
      });
    }
    
    // Background elements animation - mobile optimized
    if (backgroundRef.current) {
      const circles = backgroundRef.current.querySelectorAll('div');
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
          { x: (i % 2 === 0) ? '2vw' : '-2vw', y: (i % 2 === 0) ? '2vh' : '-3vh' } : 
          { x: (i % 2 === 0) ? '3vw' : '-3vw', y: (i % 2 === 0) ? '3vh' : '-5vh' };
          
        gsap.to(circle, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: isMobile ? 1 : 1.5,
          },
          x: moveAmount.x,
          y: moveAmount.y,
          rotation: (i % 2 === 0) ? (isMobile ? 8 : 15) : (isMobile ? -8 : -15),
          ease: "none"
        });
      });
    }
    
    // CTA section animation - mobile optimized
    if (ctaRef.current) {
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: isMobile ? "top 85%" : "top 80%",
        onEnter: () => {
          gsap.fromTo(ctaRef.current,
            { y: isMobile ? 30 : 40, opacity: 0 },
            { y: 0, opacity: 1, duration: isMobile ? 0.6 : 0.8, ease: "power2.out" }
          );
        },
        once: true
      });
    }
    
    // Handle resize events to adjust animations
    const handleResize = () => {
      // Recalculate mobile status on resize
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        // If changed, refresh page to re-initialize animations properly
        window.location.reload();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Live':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Development':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
  <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 relative z-10" ref={containerRef}>
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-16 lg:mb-20" ref={headerRef}>
         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-6 sm:mb-8 drop-shadow-xl" style={{fontFamily:'Fira Mono, JetBrains Mono, Source Code Pro, monospace'}}> <span className="inline-block hover:scale-105 transition-transform duration-300 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">My</span>{" "} <span className="inline-block hover:scale-105 transition-transform duration-300">Projects</span> </h1>
          <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-3 sm:mb-6"></div>
          <p className="text-xs sm:text-sm md:text-base lg:text-xl text-blue-200 max-w-3xl mx-auto px-3">
            A showcase of my development projects, from web applications to full-stack solutions, 
            demonstrating my skills and passion for creating innovative digital experiences.
          </p>
        </div>

        {/* Projects Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className="opacity-0 scale-95 translate-y-10 bg-gray-900 rounded-xl shadow-xl overflow-hidden flex flex-col transform-gpu"
            >
              {/* Project Header */}
              <div className="h-20 sm:h-24 md:h-28 bg-gradient-to-r from-blue-950 to-indigo-950 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-800 opacity-10"></div>
                <div className="absolute -inset-1/2 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-xl md:blur-2xl transform rotate-45"></div>
                <Code className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-blue-300 opacity-80 relative z-10" />
              </div>

              <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col">
                {/* Project Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5 sm:mb-2 md:mb-3 drop-shadow" style={{fontFamily:'Fira Mono, JetBrains Mono, Source Code Pro, monospace'}}>
                  {project.title}
                </h3>
                {/* Description */}
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 md:mb-4">
                  {project.description}
                </p>
                {/* Project Info */}
                <div className="flex flex-col gap-1 mb-2 sm:mb-3 md:mb-4 text-blue-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-950/50 px-2 py-0.5 rounded-full">{project.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                    <span className="text-xs">{project.date}</span>
                  </div>
                </div>
                {/* Action Button: Only Live Demo */}
                <div className="flex gap-2 sm:gap-3 mt-auto">
                  <a
                    href={project.liveUrl}
                    className="flex-1 bg-gradient-to-r from-blue-700 to-blue-800 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-md sm:rounded-lg hover:from-blue-800 hover:to-blue-900 transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-xs font-medium shadow-md"
                  >
                    <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16" ref={ctaRef}>
          <div className="bg-gray-900 rounded-xl shadow-xl p-4 sm:p-6 md:p-8 max-w-3xl mx-auto border border-blue-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
            <div className="relative z-10">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4" style={{fontFamily:'Fira Mono, JetBrains Mono, Source Code Pro, monospace'}}>Interested in Working Together?</h3>
              <p className="text-blue-200 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6 px-1">
                I'm always excited to take on new challenges and collaborate on innovative projects. 
                Whether you have an idea you'd like to bring to life or need help with an existing project, 
                let's discuss how we can work together.
              </p>
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
                <button className="group bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 rounded-md sm:rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all font-medium text-xs md:text-sm shadow-lg">
                  Start a Project
                  <ArrowRight className="inline ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 transform group-hover:translate-x-1" />
                </button>
                <button className="border border-blue-900 text-blue-200 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 rounded-md sm:rounded-lg hover:bg-blue-900/20 transition-all font-medium text-xs md:text-sm hover:border-blue-700">
                  View Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        @keyframes pulse-border {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); border-color: rgba(59, 130, 246, 0.7); }
          70% { box-shadow: 0 0 0 5px rgba(59, 130, 246, 0); border-color: rgba(59, 130, 246, 0.3); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); border-color: rgba(59, 130, 246, 0.7); }
        }
        
        .animate-pulse-border {
          animation: pulse-border 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Projects;
