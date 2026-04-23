import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { to: "hero", label: "Home" },
  { to: "about", label: "About" },
  { to: "projects", label: "Projects" },
  { to: "skills", label: "Skills" },
  { to: "contact", label: "Contact" },
];

export default function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false);

  const nextTheme = theme === "minimal" ? "bold" : "minimal";
  const isMinimal = theme === "minimal";

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <nav
      className={`fixed w-full z-50 backdrop-blur text-white shadow ${
        isMinimal ? "bg-[#0b1223]/70" : "bg-gray-900/80"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <span className="font-bold text-xl">Joel Leah</span>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <div className="space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-70}
                className={`cursor-pointer transition ${
                  isMinimal ? "hover:text-sky-300" : "hover:text-purple-400"
                }`}
                activeClass={isMinimal ? "text-sky-300" : "text-purple-400"}
                spy={true}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setTheme(nextTheme)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border transition text-xs font-semibold ${
              isMinimal
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-white/90"
                : "bg-white/10 hover:bg-white/15 border-white/10"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "minimal" ? "Minimal" : "Bold"}
          </button>
        </div>

        {/* Mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile overlay + panel */}
      <AnimatePresence>
        {open ? (
          <div className="md:hidden">
            <motion.button
              type="button"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              aria-label="Close navigation overlay"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
            <motion.div
              className="fixed top-[72px] left-0 right-0 mx-4 rounded-2xl bg-[#121325]/95 border border-white/10 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            >
              <div className="p-2">
                <button
                  type="button"
                  onClick={() => {
                    setTheme(nextTheme);
                    setOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl text-left text-white/90 hover:text-white hover:bg-white/10 transition text-sm font-semibold"
                  aria-label="Toggle theme"
                >
                  Theme: {theme === "minimal" ? "Minimal" : "Bold"}
                </button>
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="block px-4 py-3 rounded-xl cursor-pointer text-white/90 hover:text-white hover:bg-white/10 transition"
                    activeClass="text-purple-300"
                    spy={true}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}