import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDiscord } from '../context/DiscordContext';

interface LootPackProps {
  onClose: () => void;
}

const LootPacks: React.FC<LootPackProps> = ({ onClose }) => {
  const { user, unlockCharacter } = useDiscord();
  const [isOpening, setIsOpening] = useState(false);
  const [showAnticipation, setShowAnticipation] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showEmpty, setShowEmpty] = useState(false);
  
  const videos = [
    'Akai Tsuki', 'Catto', 'Coorogi', 'Gopegi', 'Gotsu',
    'Horichi', 'Kanopio', 'Kichi', 'Kumamo', 'Ratieza',
    'Reza', 'Saruffy', 'Sukusa', 'Togune', 'Toro'
  ];

  const openLootPack = () => {
    if (!user) {
      alert('Please login to open loot packs!');
      return;
    }

    setIsOpening(true);
    setShowAnticipation(true);
    setShowEmpty(false);
    setSelectedVideo(null);
    
    // First stage: Anticipation (1.5s)
    setTimeout(() => {
      const roll = Math.random();
      if (roll <= 0.4) { // 40% chance
        // Filter out already unlocked characters
        const availableCharacters = videos.filter(
          video => !user.unlockedCharacters?.includes(video)
        );
        
        if (availableCharacters.length > 0) {
          const randomVideo = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
          setSelectedVideo(randomVideo);
          unlockCharacter(randomVideo);
        } else {
          setShowEmpty(true);
        }
      } else {
        setShowEmpty(true);
      }
      
      // Second stage: Reveal animation starts after anticipation
      setTimeout(() => {
        setShowAnticipation(false);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative w-[800px] pokemon-panel p-6">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="pokemon-hollow text-2xl mb-6 pokemon-glow text-center">LOOT PACKS</h2>

        <AnimatePresence mode="wait">
          {!isOpening ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="pokemon-panel p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="pokemon-hollow text-lg pokemon-glow">Daily Loot Pack</h3>
                    <p className="text-white/70 text-sm">Try your luck to obtain a rare character!</p>
                  </div>
                  <motion.button
                    onClick={openLootPack}
                    className="pokeball-button w-16 h-16"
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ 
                      scale: 0.9,
                      transition: { duration: 0.1 }
                    }}
                  />
                </div>
              </div>

              {user && user.unlockedCharacters && user.unlockedCharacters.length > 0 && (
                <div className="pokemon-panel p-4 space-y-4">
                  <h3 className="pokemon-hollow text-lg pokemon-glow">Your Collection</h3>
                  <div className="grid grid-cols-5 gap-4">
                    {user.unlockedCharacters.map((character) => (
                      <div key={character} className="aspect-square relative overflow-hidden rounded-lg">
                        <img
                          src={`./Characters/${character}.png`}
                          alt={character}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                          <div className="absolute bottom-2 left-2 pokemon-hollow text-xs pokemon-glow">
                            {character}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative aspect-video"
            >
              <AnimatePresence mode="wait">
                {showAnticipation && (
                  <motion.div
                    key="anticipation"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: [0.8, 1.2, 0.9, 1.1, 1],
                      rotate: [0, -5, 5, -3, 0]
                    }}
                    exit={{ opacity: 0, scale: 1.5 }}
                    transition={{
                      duration: 1.5,
                      times: [0, 0.2, 0.4, 0.6, 0.8],
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="w-32 h-32 pokeball-button"
                      />
                      <motion.div
                        animate={{
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute inset-0 bg-white/30 rounded-full"
                      />
                    </div>
                  </motion.div>
                )}

                {!showAnticipation && selectedVideo && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotate: 0,
                      transition: {
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    }}
                    className="relative w-full h-full"
                  >
                    <video
                      src={`./Characters/${selectedVideo}.mp4`}
                      className="w-full h-full object-cover rounded-lg"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                    />
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="absolute bottom-4 left-4"
                    >
                      <h3 className="pokemon-hollow text-xl pokemon-glow mb-2">
                        {selectedVideo}
                      </h3>
                      <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white text-sm"
                      >
                        Click anywhere to close
                      </button>
                    </motion.div>
                  </motion.div>
                )}

                {!showAnticipation && showEmpty && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-lg"
                  >
                    <div className="text-center space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                      >
                        <div className="pokemon-text text-4xl">
                          Better luck
                        </div>
                        <div className="pokemon-text text-4xl">
                          next time!
                        </div>
                      </motion.div>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        onClick={onClose}
                        className="pokemon-hollow text-sm pokemon-glow hover:scale-105 transition-transform"
                      >
                        Click anywhere to close
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LootPacks;