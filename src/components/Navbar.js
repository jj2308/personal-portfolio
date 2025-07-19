import React from "react";
import { Link } from "react-scroll";

const navLinks = [
  { to: "hero", label: "Home" },
  { to: "about", label: "About" },
  { to: "projects", label: "Projects" },
  { to: "skills", label: "Skills" },
  { to: "contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur text-white shadow">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <span className="font-bold text-xl">Joel Leah</span>
        <div className="space-x-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              offset={-70}
              className="cursor-pointer hover:text-purple-400 transition"
              activeClass="text-purple-400"
              spy={true}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 