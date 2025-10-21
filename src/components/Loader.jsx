import React, { useEffect, useRef } from 'react';
import { Code } from 'lucide-react';

const Loader = ({ 
  title = "Loading", 
  subtitle = "J. K.",
  size = "md",
  icon = <Code className="w-8 h-8 text-cyan-400" />,
  isVisible = true,
  onExited = () => {}
}) => {
  // Size variants
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24",
  };

  const loaderSize = sizeClasses[size] || sizeClasses.md;
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const handleTransitionEnd = (e) => {
      if (e.target === el && e.propertyName === 'opacity' && !isVisible) {
        onExited();
      }
    };

    el.addEventListener('transitionend', handleTransitionEnd);
    return () => el.removeEventListener('transitionend', handleTransitionEnd);
  }, [isVisible, onExited]);

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black loader-root ${isVisible ? '' : 'loader--hidden'}`}
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className={`${loaderSize} rounded-full border-t-4 border-r-4 border-blue-400 loader-spin`}></div>
          <div className={`${loaderSize} rounded-full border-b-4 border-l-4 border-purple-400 loader-spin-reverse absolute top-0 left-0`}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {icon}
          </div>
        </div>
        <div className="mt-6 text-xl font-bold">
          <span className="loader-pulse bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">{title}</span>
        </div>
        <div className="mt-2 text-sm text-blue-300 opacity-80">
          <span>{subtitle}</span>
        </div>
      </div>

      <style jsx>{`
        .loader-root {
          transition: opacity 360ms ease, transform 360ms ease;
          opacity: 1;
          transform: translateY(0);
        }

        .loader--hidden {
          opacity: 0;
          transform: translateY(-6px);
          pointer-events: none;
        }

        @keyframes loader-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes loader-spin-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        @keyframes loader-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        .loader-spin {
          animation: loader-spin 1s linear infinite;
        }
        
        .loader-spin-reverse {
          animation: loader-spin-reverse 1.5s linear infinite;
        }
        
        .loader-pulse {
          animation: loader-pulse 2s ease-in-out infinite;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .loader-spin {
            animation-duration: 1.2s;
          }
          
          .loader-spin-reverse {
            animation-duration: 1.8s;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;