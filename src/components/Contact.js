import React from "react";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
  const [state, handleSubmit] = useForm("xnnzneob");

  return (
    <section id="contact" className="w-full py-24 px-4 bg-transparent flex flex-col items-center justify-center min-h-[60vh]">
      {/* Top Heading and Subtitle */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <motion.h2
          className="text-4xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Get In <span className="text-purple-400">Touch</span>
        </motion.h2>
        <p className="text-gray-200 text-lg">
          Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discussing new opportunities.
        </p>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-12 items-center justify-center">
        {/* Left: Contact Info */}
        <div className="flex-1 bg-[#18192a] rounded-3xl shadow-2xl p-10 flex flex-col items-center md:items-start mb-8 md:mb-0 min-w-[320px]">
          <motion.h3
            className="text-2xl font-bold mb-6 text-center md:text-left text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Contact Information
          </motion.h3>
          <div className="flex items-center gap-4 mb-6 w-full">
            <span className="bg-[#23243a] p-4 rounded-full text-purple-400">
              <FaEnvelope size={24} />
            </span>
            <div>
              <div className="font-semibold text-white">Email</div>
              <div className="text-gray-200 text-sm">jj3854@srmist.edu.in</div>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-6 w-full">
            <span className="bg-[#23243a] p-4 rounded-full text-purple-400">
              <FaLinkedin size={24} />
            </span>
            <div>
              <div className="font-semibold text-white">LinkedIn</div>
              <a href="https://www.linkedin.com/in/joel-jacob-ba7929346/" target="_blank" rel="noopener noreferrer" className="text-gray-200 text-sm hover:underline">linkedin.com/in/joel-jacob-ba7929346</a>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-6 w-full">
            <span className="bg-[#23243a] p-4 rounded-full text-purple-400">
              <FaGithub size={24} />
            </span>
            <div>
              <div className="font-semibold text-white">GitHub</div>
              <a href="https://github.com/jj2308" target="_blank" rel="noopener noreferrer" className="text-gray-200 text-sm hover:underline">github.com/jj2308</a>
            </div>
          </div>
        </div>
        {/* Right: Contact Form */}
        <div className="flex-1 bg-[#18192a] rounded-3xl shadow-2xl p-10 flex flex-col items-center md:items-start w-full max-w-lg min-w-[320px]">
          <motion.h3
            className="text-2xl font-bold mb-6 text-center md:text-left text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Send a Message
          </motion.h3>
          {state.succeeded ? (
            <div className="w-full text-center text-green-400 font-semibold py-8">
              Thank you! Your message has been sent.
            </div>
          ) : (
            <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 font-semibold text-white" htmlFor="name">Your Name</label>
                <input id="name" name="name" type="text" className="w-full rounded-lg bg-[#23243a] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="write your name..." required />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-white" htmlFor="email">Your Email</label>
                <input id="email" name="email" type="email" className="w-full rounded-lg bg-[#23243a] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="write your email" required />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-white" htmlFor="message">Your Message</label>
                <textarea id="message" name="message" className="w-full rounded-lg bg-[#23243a] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400" rows={4} placeholder="Hello, I'd like to talk about..." required />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>
              <button type="submit" disabled={state.submitting} className="w-full bg-purple-400 hover:bg-purple-500 text-white font-semibold py-3 rounded-full mt-4 transition flex items-center justify-center gap-2 disabled:opacity-60">
                {state.submitting ? "Sending..." : <>Send Message <span className="text-lg">&#10148;</span></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
} 