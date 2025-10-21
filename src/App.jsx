import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Single robust loader lifecycle:
    // - If the document is already complete, hide loader after a short delay
    // - Otherwise wait for window 'load' then hide after a short delay
    // - Fallback safety timeout to ensure loader never hangs
    let settled = false;

    const finish = (delay = 600) => {
      if (settled) return;
      settled = true;
      setTimeout(() => setLoading(false), delay);
    };

    const onLoad = () => finish(600);

    if (document.readyState === 'complete') {
      // already loaded
      finish(400);
    } else {
      window.addEventListener('load', onLoad);
    }

    // Safety fallback in case load doesn't fire
    const fallback = setTimeout(() => finish(800), 2000);

    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      {showLoader && (
        <Loader
          isVisible={loading}
          onExited={() => setShowLoader(false)}
        />
      )}

      {/* Fixed Navbar (hidden while loading) */}
      {!loading && <Navbar />}

      <main className="pt-14 sm:pt-16">
        {/* Home Section */}
        <section
          id="home"
          className="min-h-screen w-full flex items-start justify-center bg-gray-900"
        >
          <Home />
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen w-full flex items-start justify-center bg-gray-900"
        >
          <About />
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="min-h-screen w-full flex items-start justify-center bg-gray-900"
        >
          <Skills />
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen w-full flex items-start justify-center bg-gray-900"
        >
          <Projects />
        </section>

        {/* Certificates Section */}
        <section
          id="certificates"
          className="min-h-screen w-full flex items-start justify-center bg-gray-900"
        >
          <Certificates />
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen w-full flex items-start justify-center bg-gray-900"
        >
          <Contact />
        </section>
      </main>
      
  {/* Footer (hidden while loading) */}
  {!loading && <Footer />}
    </div>
  );
}

export default App;
