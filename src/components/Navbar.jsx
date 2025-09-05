import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    gsap.set(navbarRef.current, {
      y: 0,
      opacity: 1,
      backgroundColor: "rgba(17, 24, 39, 0.8)",
    });

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = prevScrollPos < currentScrollPos;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isAtTop = currentScrollPos < 50;

      if (Math.abs(prevScrollPos - currentScrollPos) > 10) {
        if (isScrollingDown && !isAtTop && visible) {
          gsap.to(navbarRef.current, {
            y: "-100%",
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => setVisible(false),
          });
        } else if ((isScrollingUp || isAtTop) && !visible) {
          setVisible(true);
          gsap.to(navbarRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(mobileMenuRef.current, { height: 0, opacity: 0 });
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.fromTo(
        ".mobile-nav-item",
        { opacity: 0, y: -5 },
        { opacity: 1, y: 0, duration: 0.15, stagger: 0.03 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    document.body.style.overflow = "";
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -70; // adjust for navbar height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const menuItems = [
    { href: "home", label: "Home" },
    { href: "about", label: "About" },
    { href: "skills", label: "Skills" },
    { href: "certificates", label: "Certificates" },
    { href: "projects", label: "Projects" },
    { href: "contact", label: "Contact" },
  ];

  return (
    <nav
      ref={navbarRef}
      className="fixed w-full top-0 left-0 z-50 transition-all duration-300 bg-gray-900"
      style={{ boxShadow: 'none', borderRadius: 0, border: 'none' }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "home")}
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 hover:from-pink-500 hover:to-purple-600 transition-all duration-300"
          >
            Portfolio
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`nav-link text-gray-300 hover:text-white px-3 py-2 text-sm font-medium relative group ${
                  item.href === "contact"
                    ? "px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                    : ""
                }`}
              >
                {item.label}
                {item.href !== "contact" && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                )}
              </a>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-r from-blue-500/80 to-purple-600/80"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden w-full bg-gray-900/95 backdrop-blur-lg border-b border-white/10 overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-3 py-3 space-y-1">
          {menuItems.map((item) => (
            <div key={item.href} className="mobile-nav-item">
              <a
                href={`#${item.href}`}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`block px-3 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors ${
                  item.href === "contact"
                    ? "text-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 mt-2"
                    : ""
                }`}
              >
                {item.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
