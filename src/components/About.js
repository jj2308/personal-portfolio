import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaUserCircle, FaBriefcase } from "react-icons/fa";
import { Link } from "react-scroll";

export default function About() {
  return (
    <section id="about" className="w-full py-24 px-4 min-h-[70vh] flex items-center justify-center bg-transparent">
      <div className="max-w-7xl mx-auto w-full bg-[#121325]/80 backdrop-blur border border-white/10 text-white flex flex-col md:flex-row items-center justify-center rounded-3xl shadow-2xl p-8 md:p-16 gap-4 md:-mt-12">
        {/* Left Side: Centered Text */}
        <div className="flex-1 flex flex-col items-center justify-center text-center md:text-left md:items-center md:justify-center">
          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            About <span className="text-purple-400">Me</span>
          </motion.h2>
          <motion.h3
            className="text-2xl font-semibold mb-4"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            viewport={{ once: true }}
          >
            Passionate Web Developer & Tech Creator
          </motion.h3>
          <motion.p
            className="mb-4 text-lg text-gray-200 max-w-xl"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
          >
            With 5+ years of hands-on experience, I build fast, accessible, and robust web apps using the latest technologies. I love turning ideas into digital products that work beautifully everywhere.
          </motion.p>
          <motion.p
            className="mb-8 text-gray-300 max-w-xl"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            viewport={{ once: true }}
          >
            I thrive on solving complex problems with elegant solutions, and I’m always exploring new tools and techniques to stay ahead in the ever-evolving world of web development.
          </motion.p>
          <Link to="contact" smooth={true} duration={500} offset={-70}>
            <motion.button
              className="bg-purple-400 hover:bg-purple-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Get In Touch
            </motion.button>
          </Link>
        </div>
        {/* Right Side: Feature Cards */}
        <div className="flex-1 flex flex-col gap-6 w-full max-w-md md:items-start items-center">
          <motion.div
            className="bg-[#18192a] rounded-xl p-6 flex items-center gap-4 shadow-lg w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="bg-[#23243a] p-4 rounded-full text-purple-400">
              <FaCode size={28} />
            </span>
            <div>
              <h4 className="text-lg font-semibold mb-1">Web Development</h4>
              <p className="text-gray-300 text-sm">Building fast, accessible, and scalable web apps with modern frameworks and best practices.</p>
            </div>
          </motion.div>
          <motion.div
            className="bg-[#18192a] rounded-xl p-6 flex items-center gap-4 shadow-lg w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="bg-[#23243a] p-4 rounded-full text-purple-400">
              <FaUserCircle size={28} />
            </span>
            <div>
              <h4 className="text-lg font-semibold mb-1">UI/UX Design</h4>
              <p className="text-gray-300 text-sm">Designing intuitive, user-friendly interfaces that delight and engage people.</p>
            </div>
          </motion.div>
          <motion.div
            className="bg-[#18192a] rounded-xl p-6 flex items-center gap-4 shadow-lg w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="bg-[#23243a] p-4 rounded-full text-purple-400">
              <FaBriefcase size={28} />
            </span>
            <div>
              <h4 className="text-lg font-semibold mb-1">Project Management</h4>
              <p className="text-gray-300 text-sm">Guiding projects from idea to launch with agile, collaborative workflows.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 