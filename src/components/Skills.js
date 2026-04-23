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

export default function Skills({ theme }) {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? SKILLS : SKILLS.filter(s => s.category === active);
  const isMinimal = theme === "minimal";

  return (
    <section id="skills" className="w-full py-24 px-4 bg-transparent">
      <div
        className={`max-w-7xl mx-auto w-full text-white rounded-3xl shadow-2xl p-8 md:p-16 ${
          isMinimal
            ? "bg-[#0f1629]/80 backdrop-blur border border-white/10"
            : "bg-[#121325]/80 backdrop-blur border border-white/10"
        }`}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          My <span className={isMinimal ? "text-white" : "text-purple-400"}>Skills</span>
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
              className={`px-6 py-2 rounded-full font-semibold transition-all border ${
                active === cat
                  ? isMinimal
                    ? "bg-white/10 text-white border-white/15"
                    : "bg-purple-400 text-white border-purple-300/20"
                  : isMinimal
                    ? "bg-white/5 text-white/80 border-white/10 hover:bg-white/8"
                    : "bg-[#23243a] text-gray-200 border-white/5 hover:bg-purple-500/40"
              }`}
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
              className={`rounded-xl p-6 flex flex-col ${
                isMinimal
                  ? "bg-white/5 border border-white/10 shadow-xl"
                  : "bg-[#18192a] shadow-lg"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">{skill.name}</span>
                <span className={isMinimal ? "text-white/70 font-bold" : "text-purple-300 font-bold"}>
                  {skill.percent}%
                </span>
              </div>
              <div
                className={`w-full h-3 rounded-full overflow-hidden ${
                  isMinimal ? "bg-white/10" : "bg-[#23243a]"
                }`}
              >
                <div
                  className={`h-full rounded-full transition-all ${
                    isMinimal
                      ? "bg-white/70"
                      : "bg-purple-400"
                  }`}
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