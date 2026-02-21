import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const GITHUB_USERNAME = "jj2308";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="w-full py-24 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto w-full bg-[#121325]/80 backdrop-blur border border-white/10 text-white rounded-3xl shadow-2xl p-8 md:p-16">
        <motion.h2
          className="text-4xl font-bold text-center mb-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        <p className="text-center text-gray-200 mb-12">
          A showcase of my recent work and personal projects
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full text-center text-gray-400">Loading projects...</div>
          ) : (
            Array.isArray(repos) ? (
              repos.map((repo) => (
                <motion.div
                  key={repo.id}
                  className="bg-[#18192a] rounded-2xl shadow-lg overflow-hidden flex flex-col"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  {/* Project image placeholder */}
                  <div className="h-40 bg-gradient-to-tr from-purple-700 to-violet-500 flex items-center justify-center">
                    <span className="text-5xl text-white/30 font-bold">
                      {repo.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {repo.name.replace(/[-_]/g, ' ')}
                    </h3>
                    {/* Tech tags placeholder (could be improved with topics API) */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.language && (
                        <span className="bg-purple-700/30 text-purple-200 px-3 py-1 rounded text-xs font-semibold">
                          {repo.language}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-auto">
                      {repo.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                          <FaExternalLinkAlt size={18} />
                        </a>
                      )}
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                        <FaGithub size={20} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400">No projects found.</div>
            )
          )}
        </div>
      </div>
    </section>
  );
} 