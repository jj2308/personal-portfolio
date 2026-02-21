import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import StarsBackground from "./components/StarsBackground";
import ChatWidget from "./components/ChatWidget";

function App() {
  return (
    <div className="relative z-10 bg-gray-900 min-h-screen">
      <StarsBackground />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <ChatWidget />
    </div>
  );
}

export default App;
