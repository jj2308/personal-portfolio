import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import profileImg from "../assets/profile.jpg";

export default function Hero() {
  return (
    <section id="hero" className="w-full pt-40 md:pt-56 pb-12 px-4 min-h-[80vh] flex items-center justify-center bg-transparent">
      <div className="max-w-7xl mx-auto w-full bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600 text-white flex flex-col md:flex-row items-center justify-center rounded-3xl shadow-xl p-8 md:p-16 md:-mt-24">
        {/* Left Side */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-6 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hi, I'm <span className="text-purple-400">Joel Leah</span>
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-gray-200 mb-8 max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            I love building web apps with state-of-the-art technologies and experimenting with new tools. My passion is crafting user-friendly, functional interfaces that make a real impact for people.
          </motion.p>
          <div className="w-full flex justify-center">
            <Link to="projects" smooth={true} duration={500} offset={-70}>
              <motion.button
                className="bg-purple-400 hover:bg-purple-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                View My Work
              </motion.button>
            </Link>
          </div>
          {/* Scroll to see more animation */}
          <div className="w-full flex justify-center">
            <motion.div
              className="flex flex-col items-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <span className="text-white mb-2">Scroll</span>
              <motion.span
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="text-2xl text-purple-400"
              >
                &#8595;
              </motion.span>
            </motion.div>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1 flex justify-center items-center mb-8 md:mb-0">
          <motion.img
            src={profileImg}
            alt="Joel Leah"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-3xl shadow-xl border-4 border-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
} 