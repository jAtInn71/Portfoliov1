import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Home = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
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

  // Animated entry effects
  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-blue-100 font-mono relative overflow-hidden" style={{fontFamily: 'Fira Mono, JetBrains Mono, Source Code Pro, monospace'}}>
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
        <div className="absolute top-1/4 left-1/6 w-56 h-56 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-900 to-purple-900 opacity-20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/5 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-tr from-purple-900 to-indigo-900 opacity-20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-20 rounded-full blur-xl animate-spin-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-cyan-800 to-blue-900 opacity-20 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute top-1/6 right-1/3 w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-20 rounded-full blur-xl animate-float"></div>
      </div>
      
      {/* Main Content Container */}
      <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-8 relative z-20">
        {/* Hero Section - Perfect center alignment */}
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12" ref={heroRef}>
          
          {/* Left: Text Content, Buttons, Social Links */}
          <div className="flex-1 flex flex-col justify-center items-start text-left w-full max-w-2xl">
            {/* Main heading with enhanced typing effect and new name animation */}
            <div 
              ref={textRef}
              className="opacity-0 transform translate-y-10 transition-all duration-1000 mb-6"
            >
              <div className="mb-6">
                <span className="text-blue-400 text-lg sm:text-xl md:text-2xl font-mono block mb-4">
                  <span className="text-cyan-400">&lt;</span>Hello<span className="text-cyan-400">/&gt;</span> I'm
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-3 sm:mb-4 tracking-tighter leading-tight relative">
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 via-orange-400 to-yellow-400 animate-gradient-text drop-shadow-2xl name-glow">
                    Jatin Kavani
                  </span>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm animate-pulse"></span>
                </h1>
                <div className="text-lg sm:text-xl lg:text-2xl text-blue-300 font-bold h-8 my-4">
                  <span>{typedText}</span>
                  <span className="inline-block w-1 h-6 bg-blue-400 ml-1 animate-blink"></span>
                </div>
              </div>
              
              <div className="w-full space-y-3 bg-gray-900/80 rounded-xl shadow-lg p-4 sm:p-6 border border-blue-900/30 mb-6">
                <p className="text-sm sm:text-base text-blue-200 leading-relaxed">
                  Computer Engineering student at Silver Oak University, transforming ideas into
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold"> digital reality</span>
                </p>
                <p className="text-sm sm:text-base text-blue-200 leading-relaxed">
                  Passionate about building scalable web applications and exploring new technologies.
                </p>
                <p className="text-sm sm:text-base text-blue-200 leading-relaxed">
                  Always eager to learn, collaborate, and solve real-world problems with code.
                </p>
                <p className="text-sm sm:text-base text-blue-200 leading-relaxed">
                  Focused on clean design, performance, and user experience.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div 
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-8 sm:mb-10 w-full opacity-0 transform translate-y-10 transition-all duration-1000"
            >
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium flex items-center justify-center gap-2 text-sm hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-blue-500/30 w-full sm:w-auto min-w-[140px] mt-1">
                View My Work
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 bg-gray-800/70 border border-blue-800/50 rounded-lg text-blue-300 font-medium flex items-center justify-center gap-2 text-sm hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 transform w-full sm:w-auto min-w-[120px] mt-1">
                About Me
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 text-blue-400 w-full mt-4 sm:mt-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors hover:scale-110 transform duration-300">
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors hover:scale-110 transform duration-300">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="mailto:example@example.com" className="hover:text-blue-300 transition-colors hover:scale-110 transform duration-300">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div className="flex-1 flex justify-center items-center w-full max-w-md lg:max-w-lg">
           
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
          animation: spin 25s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-gradient-text {
          background-size: 400% 400%;
          animation: gradient-flow 4s ease-in-out infinite, text-glow 2s ease-in-out infinite alternate, letter-wave 3s ease-in-out infinite;
        }
        
        .name-glow {
          filter: drop-shadow(0 0 20px rgba(139, 69, 255, 0.6)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.4));
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(2deg); }
          66% { transform: translateY(-15px) rotate(-2deg); }
        }
        
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
        
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          25% { background-position: 50% 0%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 50% 100%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes text-glow {
          0% { filter: drop-shadow(0 0 20px rgba(139, 69, 255, 0.6)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.4)) brightness(1); }
          100% { filter: drop-shadow(0 0 30px rgba(139, 69, 255, 0.8)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.6)) brightness(1.2); }
        }
        
        @keyframes letter-wave {
          0%, 100% { transform: translateY(0px); }
          25% { transform: translateY(-2px); }
          50% { transform: translateY(0px); }
          75% { transform: translateY(2px); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            border-color: rgba(96, 165, 250, 0.3);
            box-shadow: 0 0 20px rgba(96, 165, 250, 0.3);
          }
          50% { 
            border-color: rgba(147, 51, 234, 0.5);
            box-shadow: 0 0 40px rgba(147, 51, 234, 0.4);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .animate-float {
            animation-duration: 7s;
          }
          
          .animate-gradient-text {
            animation-duration: 3s, 1.5s, 2s;
          }
        }
        
        /* Tablet optimizations */
        @media (min-width: 641px) and (max-width: 1024px) {
          .name-glow {
            filter: drop-shadow(0 0 18px rgba(139, 69, 255, 0.5)) drop-shadow(0 0 35px rgba(59, 130, 246, 0.4));
          }
        }
        
        /* Desktop optimizations */
        @media (min-width: 1025px) {
          .name-glow {
            filter: drop-shadow(0 0 22px rgba(139, 69, 255, 0.7)) drop-shadow(0 0 45px rgba(59, 130, 246, 0.5));
          }
        }
        
        /* Responsive adjustments for name animation */
        @media (max-width: 768px) {
          .name-glow {
            filter: drop-shadow(0 0 15px rgba(139, 69, 255, 0.5)) drop-shadow(0 0 30px rgba(59, 130, 246, 0.3));
          }
        }
        
        /* Fix for very small screens */
        @media (max-width: 480px) {
          .min-h-screen {
            min-height: 100vh;
            min-height: 100dvh; /* Dynamic viewport height */
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
