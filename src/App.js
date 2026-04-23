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
  const [theme, setTheme] = React.useState(() => {
    try {
      return localStorage.getItem("portfolio_theme") || "bold";
    } catch {
      return "bold";
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem("portfolio_theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  return (
    <div
      className={`relative z-10 min-h-screen ${
        theme === "minimal" ? "theme-minimal-bg" : "bg-gray-900"
      }`}
    >
      <StarsBackground theme={theme} />
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero theme={theme} />
      <About theme={theme} />
      <Projects theme={theme} />
      <Skills theme={theme} />
      <Contact theme={theme} />
      <ChatWidget />
    </div>
  );
}

export default App;
