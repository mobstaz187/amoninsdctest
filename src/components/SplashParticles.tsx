import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';

const SplashParticles: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      className="absolute inset-0"
      init={particlesInit}
      options={{
        background: {
          opacity: 0
        },
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              area: 800
            }
          },
          color: {
            value: ["#ffffff", "#ffd700", "#00ffff"]
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: { min: 0.1, max: 1 },
            animation: {
              enable: true,
              speed: 1,
              sync: false,
              minimumValue: 0.1
            }
          },
          size: {
            value: { min: 1, max: 3 },
            animation: {
              enable: true,
              speed: 2,
              sync: false,
              minimumValue: 0.1
            }
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            outModes: "out"
          },
          twinkle: {
            particles: {
              enable: true,
              color: "#ffffff",
              frequency: 0.05,
              opacity: 1
            }
          },
          life: {
            duration: {
              sync: false,
              value: 3
            },
            count: 0,
            delay: {
              random: {
                enable: true,
                minimumValue: 0.5
              },
              value: 1
            }
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble"
            }
          },
          modes: {
            bubble: {
              distance: 200,
              size: 4,
              duration: 0.3,
              opacity: 1
            }
          }
        },
        detectRetina: true
      }}
    />
  );
};

export default SplashParticles;