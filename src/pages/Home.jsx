import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';


const Home = () => {
  // smooth scroll helper (keeps behavior consistent with Navbar)
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -70; // adjust for navbar height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const words = ['Developer', 'Student', 'Innovator', 'Problem Solver', 'Tech Enthusiast'];
  
  // Typing animation effect
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentWord.length) {
          setTypedText(currentWord.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(typedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 80 : 120);
    
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentWordIndex, words]);

  // Loading effect
  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Show loader for 2.5 seconds
    
    return () => {
      clearTimeout(loaderTimer);
    };
  }, []);

  // Animated entry effects
  useEffect(() => {
    if (isLoading) return; // Skip animations while loading
    
    const timer = setTimeout(() => {
      if (textRef.current) {
        textRef.current.style.opacity = '1';
        textRef.current.style.transform = 'translateY(0)';
      }
    }, 300);
    
    const ctaTimer = setTimeout(() => {
      if (ctaRef.current) {
        ctaRef.current.style.opacity = '1';
        ctaRef.current.style.transform = 'translateY(0)';
      }
    }, 800);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(ctaTimer);
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen w-full bg-black text-blue-100 font-mono relative overflow-hidden pt-16" style={{fontFamily: 'Fira Mono, JetBrains Mono, Source Code Pro, monospace'}}>
      {/* Visually appealing animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Minimal bouncing circles, responsive positions/sizes */}
        <div className="absolute top-8 left-4 w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full opacity-40 animate-bounce" style={{animationDelay:'0s'}}></div>
        <div className="absolute top-24 right-8 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full opacity-40 animate-bounce" style={{animationDelay:'0.7s'}}></div>
        <div className="absolute bottom-32 left-12 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-400 rounded-full opacity-30 animate-bounce" style={{animationDelay:'1.2s'}}></div>
        <div className="absolute bottom-24 right-16 w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full opacity-30 animate-bounce" style={{animationDelay:'0.4s'}}></div>
        {/* New floating elements for extra effect */}
        <div className="absolute top-10 right-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-50 animate-float" style={{animationDelay:'0.5s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-tr from-cyan-400 to-blue-400 rounded-full opacity-40 animate-float" style={{animationDelay:'1.2s'}}></div>
        <div className="absolute top-1/2 left-1/5 w-7 h-7 sm:w-11 sm:h-11 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-40 animate-bounce" style={{animationDelay:'0.8s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-5 h-5 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30 animate-bounce" style={{animationDelay:'1.5s'}}></div>
        {/* Existing background gradients and shapes */}
       
      </div>
      <div className="container mx-auto px-4 sm:px-6 py-8 relative z-20">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col lg:flex-row items-center lg:items-center justify-center" ref={heroRef}>
          {/* Left: Text Content, Buttons, Social Links */}
          <div className="flex-1 flex flex-col justify-center items-start text-left w-full max-w-2xl">
            {/* Main heading with enhanced typing effect and new name animation */}
            <div 
              ref={textRef}
              className="opacity-0 transform translate-y-10 transition-all duration-1000 mb-8"
            >
              <div className="mb-4">
                <span className="text-blue-400 text-lg sm:text-xl md:text-2xl font-mono block mb-2">
                  <span className="text-cyan-400">&lt;</span>Hello<span className="text-cyan-400">/&gt;</span> I'm
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 tracking-tighter leading-tight relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 animate-pulse-slow drop-shadow-2xl" style={{opacity: 1, filter: 'brightness(1.6) drop-shadow(0 0 16px #7f5af0)'}}>
                    Jatin Kavani
                  </span>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm animate-pulse"></span>
                </h1>
                <div className="text-lg sm:text-xl lg:text-2xl text-blue-300 font-bold h-7 sm:h-8 my-3">
                  <span>{typedText}</span>
                  <span className="inline-block w-1 h-6 bg-blue-400 ml-1 animate-blink"></span>
                </div>
              </div>
              
              <div className="max-w-4xl mx-auto space-y-4 bg-gray-900/80 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border border-blue-900/30">
                <p className="text-xs sm:text-sm md:text-base text-blue-200 leading-relaxed">
                  Computer Engineering student at Silver Oak University, transforming ideas into
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold"> digital reality</span>
                </p>
                <p className="text-sm sm:text-base text-blue-200 leading-relaxed">
                  Passionate about building scalable web applications and exploring new technologies.
                </p>
                <p className="text-sm sm:text-base text-blue-200 leading-relaxed">
                  Always eager to learn, collaborate, and solve real-world problems with code.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div 
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-6 mt-6 w-full"
            >
              <Link to="/projects" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium flex items-center gap-2 text-sm hover:scale-105 transform transition-transform shadow-lg hover:shadow-blue-500/20 w-full sm:w-auto">
                View My Work
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link to="/about" className="px-4 py-2 bg-gray-800/70 border border-blue-800/50 rounded-lg text-blue-300 font-medium flex items-center gap-2 text-sm hover:bg-gray-700/50 transition-colors hover:scale-105 transform w-full sm:w-auto">
                About Me
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4 text-blue-400 mb-12 sm:mb-16 w-full">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors hover:scale-110 transform">
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors hover:scale-110 transform">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="mailto:example@example.com" className="hover:text-blue-300 transition-colors hover:scale-110 transform">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0 w-full">
            <img src="bg _image.png" alt="Profile"  className="w-40 h-40 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full shadow-2xl object-cover bg-transparent" />
          </div>
        </div>
      </div>

      {/* Scroll indicator with bounce, responsive - Perfectly positioned */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-30 mb-10">
       
        <ChevronDown 
          className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto cursor-pointer hover:text-blue-300 transition-colors duration-300" 
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin 15s linear infinite reverse;
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient-shift 8s ease infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          33% { transform: translateY(-20px) scale(1.1); }
          66% { transform: translateY(-10px) scale(0.9); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .animate-spin-slow {
            animation-duration: 15s;
          }
          
          .animate-spin-reverse {
            animation-duration: 12s;
          }
          
          .animate-float {
            animation-duration: 6s;
          }
        }
        
        /* Fix for very small screens */
        @media (max-width: 480px) {
          .min-h-screen {
            min-height: 100vh;
            min-height: 100dvh;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
