import React from "react";
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";

export default function StarsBackground({ theme }) {
  const particlesInit = async (main) => {
    await loadStarsPreset(main);
  };

  const isMinimal = theme === "minimal";

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "stars",
        background: { color: "transparent" },
        fullScreen: { enable: true, zIndex: 0 },
        particles: {
          color: { value: "#fff" },
          number: { value: isMinimal ? 70 : 140 },
          size: { value: isMinimal ? 1.1 : 1.6 },
          opacity: { value: isMinimal ? 0.35 : 0.55 },
        },
      }}
      className="fixed inset-0 pointer-events-none"
    />
  );
}