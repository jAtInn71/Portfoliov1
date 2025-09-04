import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      {/* Fixed Navbar */}
      <Navbar />

      <main className="pt-14 sm:pt-16">
        {/* Home Section */}
        <section
          id="home"
          className="min-h-screen w-full flex items-center justify-center bg-gray-900"
        >
          <Home />
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen w-full flex items-center justify-center bg-gray-900"
        >
          <About />
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="min-h-screen w-full flex items-center justify-center bg-gray-900"
        >
          <Skills />
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen w-full flex items-center justify-center bg-gray-900"
        >
          <Projects />
        </section>

        {/* Certificates Section */}
        <section
          id="certificates"
          className="min-h-screen w-full flex items-center justify-center bg-gray-900"
        >
          <Certificates />
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen w-full flex items-center justify-center bg-gray-900"
   >       <Contact />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
