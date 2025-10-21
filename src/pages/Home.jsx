import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';

const Home = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const words = ['Student', 'Executive Member at IEEE SOU SB ', 'Tech Enthusiast', 'Problem Solver', 'Innovator'];
  
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
      <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-6 relative z-20" style={{marginTop: "-45px"}}>
        {/* Hero Section - Perfect center alignment */}
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10" ref={heroRef}>
          
          {/* Left: Text Content, Buttons */}
          <div className="flex-1 flex flex-col justify-center items-start text-left w-full max-w-2xl">
            {/* Main heading with enhanced typing effect and new name animation */}
            <div 
              ref={textRef}
              className="opacity-0 transform translate-y-10 transition-all duration-1000"
            >
              <div className="mb-4">
                <span className="text-blue-400 text-lg sm:text-xl md:text-2xl font-mono block mb-2">
                  <span className="text-cyan-400">&lt;</span>Hello<span className="text-cyan-400">/&gt;</span> I'm
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-2 tracking-tighter leading-tight relative">
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 via-orange-400 to-yellow-400 animate-gradient-text drop-shadow-2xl name-glow">
                    Jatin Kavani
                  </span>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm animate-pulse"></span>
                </h1>
                <div className="text-lg sm:text-xl lg:text-2xl text-blue-300 font-bold h-8 my-2">
                  <span>{typedText}</span>
                  <span className="inline-block w-1 h-6 bg-blue-400 ml-1 animate-blink"></span>
                </div>
              </div>
              
              <div className="w-full space-y-2 bg-gray-900/80 rounded-xl shadow-lg p-4 sm:p-5 border border-blue-900/30 mb-4">
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
              </div>
            </div>

            {/* CTA Buttons */}
            <div 
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-6 sm:mb-8 w-full opacity-0 transform translate-y-10 transition-all duration-1000"
            >
              <a 
                href="src/assets/JATIN KAVANI.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium flex items-center justify-center gap-2 text-sm hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-blue-500/30 w-full sm:w-auto min-w-[140px] mt-1"
              >
                Resume
                <FileText className="w-4 h-4" />
              </a>
            
            </div>
          </div>

          {/* Right: Profile Image */}
         <div className="flex-1 flex justify-center items-center w-full max-w-lg">
            <div className="relative w-96 h-96">
              {/* Central rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 animate-spin-slow"></div>
              <div className="absolute inset-8 rounded-full border-2 border-blue-400 opacity-40 animate-spin-reverse"></div>
              <div className="absolute inset-16 rounded-full border border-purple-400 opacity-50 animate-spin-slow"></div>
              
              {/* Center content */}
              <div className="absolute inset-24 bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-full border border-blue-500/30 backdrop-blur-lg flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                    &lt;/&gt;
                  </div>
                  <div className="text-blue-300 text-sm font-semibold mb-1">Full Stack</div>
                  <div className="text-purple-400 text-xs">Developer</div>
                </div>
              </div>
              
              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-orbit-1 z-[-10]">
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-blue-400/50"></div>
              </div>
              <div className="absolute inset-0 animate-orbit-2 z-[-10]">
                <div className="absolute top-1/2 right-0 w-2 h-2 bg-purple-400 rounded-full transform -translate-y-1/2 shadow-lg shadow-purple-400/50"></div>
              </div>
              <div className="absolute inset-0 animate-orbit-3 z-[-10]">
                <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-cyan-400/50"></div>
              </div>
              
              {/* Pulsing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-full animate-pulse-glow"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator with bounce, responsive - Perfectly positioned */}
      <div className="absolute bottom-[60px] left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-30">
       
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
        .animate-gradient-flow {
          background-size: 300% 300%;
          animation: gradient-flow 4s ease-in-out infinite;
        }
        
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
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-orbit-1 { animation: orbit 12s linear infinite; }
        .animate-orbit-2 { animation: orbit 16s linear infinite reverse; }
        .animate-orbit-3 { animation: orbit 14s linear infinite; }
   
        
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 50% 0%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 50% 100%; }
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
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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