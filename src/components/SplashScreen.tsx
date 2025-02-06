import React from 'react';
import SplashParticles from './SplashParticles';

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  return (
    <div 
      className="fixed inset-0 w-full h-full flex items-center justify-center cursor-pointer"
      onClick={onEnter}
    >
      <img
        src="./Splash/Animon-Latest-Banner.png"
        alt="Animon Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <SplashParticles />
      <div className="absolute bottom-12 left-0 right-0 text-center">
        <p className="text-white/60 text-lg tracking-[0.2em] font-light">
          Click Anywhere to Continue
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;