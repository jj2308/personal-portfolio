import React from "react";
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";

export default function StarsBackground() {
  const particlesInit = async (main) => {
    await loadStarsPreset(main);
  };

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
          number: { value: 120 },
          size: { value: 1.5 },
        },
      }}
      className="fixed inset-0 pointer-events-none"
    />
  );
} 