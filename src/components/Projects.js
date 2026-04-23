import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const FEATURED_PROJECTS = [
  {
    id: "steg-app",
    title: "Steganography Web App",
    description:
      "Secure web application that hides and extracts sensitive data inside images using steganography techniques.",
    tech: ["React", "Node.js", "Express", "Python", "OpenCV"],
    githubUrl: "https://github.com/jj2308/steg-app",
    liveUrl: "https://steg-frontend-two.vercel.app/",
  },
  {
    id: "acadvault",
    title: "AcadVault",
    description:
      "Secure academic management platform for storing, verifying, and managing student records and documents with streamlined workflows.",
    tech: ["React", "Supabase", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/jj2308/acad-v",
    liveUrl: "https://acad-v.vercel.app/",
  },
  {
    id: "webrtc",
    title: "WebRTC Video Communication App",
    description:
      "Real-time peer-to-peer video calling application using WebRTC with low-latency streaming.",
    tech: ["WebRTC", "JavaScript", "Node.js", "Socket.io"],
    githubUrl: "https://github.com/jj2308/webrtc",
    liveUrl: null,
  },
  {
    id: "ecourt-scraper",
    title: "eCourts Scraper & Case Tracker",
    description:
      "Automated scraper that fetches court case listings and checks case status with optional PDF downloads.",
    tech: ["Python", "BeautifulSoup", "Requests", "Automation"],
    githubUrl: "https://github.com/jj2308/ecourt-scraper",
    liveUrl: null,
  },
  {
    id: "amb-dashboard",
    title: "ADmyBRAND Insights Dashboard",
    description:
      "AI-powered analytics dashboard for digital marketing agencies featuring real-time KPIs, interactive charts, campaign filtering, and exportable reports in a modern responsive UI.",
    tech: ["React", "Node.js", "Firebase", "Maps API"],
    githubUrl: "https://github.com/jj2308/amb-dashboard",
    liveUrl: "https://amb-dashboard.vercel.app/"
  },
  {
    id: "view-all",
    title: "View All Projects",
    description: "Explore all my projects, experiments, and repositories on GitHub.",
    tech: [],
    githubUrl: "https://github.com/jj2308",
    liveUrl: null,
  },
];

export default function Projects({ theme }) {
  const repos = FEATURED_PROJECTS;
  const isMinimal = theme === "minimal";

  return (
    <section id="projects" className="w-full py-24 px-4 bg-transparent">
      <div
        className={`max-w-7xl mx-auto w-full text-white rounded-3xl p-8 md:p-16 ${
          isMinimal
            ? "bg-[#0f1629]/80 backdrop-blur border border-white/10 shadow-2xl"
            : "bg-[#121325]/80 backdrop-blur border border-white/10 shadow-2xl"
        }`}
      >
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
          {Array.isArray(repos) ? (
            repos.map((repo) => (
              <motion.div
                key={repo.id}
                className={`rounded-2xl overflow-hidden flex flex-col transition ${
                  isMinimal
                    ? "bg-white/5 border border-white/10 shadow-xl hover:bg-white/7"
                    : "bg-[#18192a] shadow-lg"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div
                  className={`h-40 flex items-center justify-center ${
                    isMinimal
                      ? "bg-gradient-to-tr from-[#0b1223] to-[#122445]"
                      : "bg-gradient-to-tr from-purple-700 to-violet-500"
                  }`}
                >
                  <span className="text-5xl text-white/30 font-bold">
                    {repo.title.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-white">{repo.title}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed mb-4">{repo.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(repo.tech) &&
                      repo.tech.map((t) => (
                        <span
                          key={`${repo.id}-${t}`}
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            isMinimal
                              ? "bg-white/10 text-white/80 border border-white/10"
                              : "bg-purple-700/30 text-purple-200"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    {repo.liveUrl && (
                      <a
                        href={repo.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          isMinimal
                            ? "text-white/70 hover:text-white"
                            : "text-purple-400 hover:text-purple-300"
                        }
                      >
                        <FaExternalLinkAlt size={18} />
                      </a>
                    )}
                    {repo.githubUrl && (
                      <a
                        href={repo.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          isMinimal
                            ? "text-white/70 hover:text-white"
                            : "text-purple-400 hover:text-purple-300"
                        }
                      >
                        <FaGithub size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">No projects found.</div>
          )}
        </div>
      </div>
    </section>
  );
}