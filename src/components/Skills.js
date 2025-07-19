import React, { useState } from "react";
import { motion } from "framer-motion";

const SKILLS = [
  { name: "HTML/CSS", category: "Frontend", percent: 95 },
  { name: "JavaScript", category: "Frontend", percent: 90 },
  { name: "React", category: "Frontend", percent: 90 },
  { name: "TypeScript", category: "Frontend", percent: 85 },
  { name: "Tailwind CSS", category: "Frontend", percent: 90 },
  { name: "Next.js", category: "Frontend", percent: 80 },
  { name: "Vite", category: "Frontend", percent: 75 },
  { name: "Node.js", category: "Backend", percent: 80 },
  { name: "MySQL", category: "Backend", percent: 75 },
  { name: "MongoDB", category: "Backend", percent: 70 },
  { name: "C", category: "Tools", percent: 80 },
  { name: "C++", category: "Tools", percent: 80 },
  { name: "Java", category: "Tools", percent: 75 },
  { name: "Python", category: "Tools", percent: 85 },
  { name: "Matplotlib", category: "Tools", percent: 70 },
  { name: "Numpy", category: "Tools", percent: 75 },
  { name: "DSA", category: "Tools", percent: 80 },
  { name: "OOPS", category: "Tools", percent: 80 },
  { name: "Git", category: "Tools", percent: 85 },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Tools"];

export default function Skills() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? SKILLS : SKILLS.filter(s => s.category === active);

  return (
    <section id="skills" className="w-full py-24 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto w-full bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600 text-white rounded-3xl shadow-xl p-8 md:p-16">
        <motion.h2
          className="text-4xl font-bold text-center mb-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          My <span className="text-purple-400">Skills</span>
        </motion.h2>
        <p className="text-center text-gray-200 mb-8">
          {/* Optional subtitle */}
        </p>
        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${active === cat ? "bg-purple-400 text-white" : "bg-[#23243a] text-gray-200 hover:bg-purple-500/40"}`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Skills Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((skill, idx) => (
            <motion.div
              key={skill.name}
              className="bg-[#18192a] rounded-xl p-6 shadow-lg flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">{skill.name}</span>
                <span className="text-purple-300 font-bold">{skill.percent}%</span>
              </div>
              <div className="w-full h-3 bg-[#23243a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-400 rounded-full transition-all"
                  style={{ width: `${skill.percent}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 