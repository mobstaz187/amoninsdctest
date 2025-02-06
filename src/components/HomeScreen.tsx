import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from './AnimatedPage';
import LootPacks from './LootPacks';
import DiscordLogin from './DiscordLogin';
import UserProfile from './UserProfile';
import { useDiscord } from '../context/DiscordContext';

interface VideoEvent extends React.SyntheticEvent<HTMLVideoElement> {
  currentTarget: HTMLVideoElement;
}

const HomeScreen: React.FC = () => {
  const { user } = useDiscord();
  const [currentVideo, setCurrentVideo] = useState(0);
  const [selectedMode, setSelectedMode] = useState('story');
  const [activeTab, setActiveTab] = useState<'featured' | 'roadmap' | 'lootpacks'>('featured');
  const [showLootPacks, setShowLootPacks] = useState(false);
  
  const featuredVideos = [
    'Ratiza', 'Reza', 'Gotsu', 'kumamo', 'Sukusa',
    'Catto', 'Gopegi', 'Coorogi', 'Kichi'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % featuredVideos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedPage>
      <div className="fixed inset-0 w-full h-full">
        {/* Background */}
        <div className="fixed inset-0">
          <img
            src="./Splash/Gif-Animon.gif"
            alt="Animon Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent backdrop-blur-sm" />
        </div>

        {/* Top Navigation Bar */}
        <div className="fixed top-0 left-0 right-0 h-20 pokemon-panel px-8 flex items-center justify-between z-30">
          <div className="relative">
            <img 
              src="./logo-default-animon.png" 
              alt="Animon Logo" 
              className="h-12 w-auto drop-shadow-lg"
            />
            <div className="absolute -inset-4 bg-white/20 blur-xl rounded-full -z-10" />
          </div>

          <div className="flex items-center gap-8">
            {user ? <UserProfile /> : <DiscordLogin />}
            
            <Link
              to="/characters"
              className="pokemon-text text-2xl transform hover:scale-105 
                transition-transform duration-300"
            >
              ANIMONS
            </Link>
            
            <Link
              to="/about"
              className="pokemon-text text-2xl transform hover:scale-105 
                transition-transform duration-300"
            >
              ABOUT
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="fixed top-24 bottom-16 left-0 right-0 flex gap-6 p-6">
          {/* Left Column */}
          <div className="w-72 space-y-4">
            <div className="pokemon-panel p-4 space-y-3">
              <h3 className="pokemon-hollow text-lg pokemon-glow">GAME MODES</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedMode('story')}
                  className={`w-full p-2.5 rounded-lg flex items-center gap-3 transition-all duration-300
                    ${selectedMode === 'story' 
                      ? 'pokemon-border bg-white/20' 
                      : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                >
                  <div className="w-2 h-2 rounded-none bg-white pixelated-circle" />
                  <div className="text-left">
                    <div className="pokemon-hollow text-sm pokemon-glow">Story Mode</div>
                    <div className="text-xs text-white/70">2/5 Chapters</div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedMode('battle')}
                  className={`w-full p-2.5 rounded-lg flex items-center gap-3 transition-all duration-300
                    ${selectedMode === 'battle' 
                      ? 'pokemon-border bg-white/20' 
                      : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                >
                  <div className="w-2 h-2 rounded-none bg-white pixelated-circle" />
                  <div className="text-left">
                    <div className="pokemon-hollow text-sm pokemon-glow">Battle Arena</div>
                    <div className="text-xs text-white/70">0/10 Matches</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="pokemon-panel p-4 space-y-3">
              <h3 className="pokemon-hollow text-lg pokemon-glow">STATS</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-white/70">Total Animons</span>
                  <span className="pokemon-hollow text-sm pokemon-glow">9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/70">Latest Update</span>
                  <span className="pokemon-hollow text-sm pokemon-glow">2 days ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div className="flex-1 flex">
            <div className="flex-1 pokemon-panel overflow-hidden h-full flex flex-col">
              {/* Tabs */}
              <div className="flex border-b-2 border-white/30">
                <button
                  onClick={() => setActiveTab('featured')}
                  className={`flex-1 py-3 text-center transition-all duration-300
                    pokemon-hollow text-sm
                    ${activeTab === 'featured' 
                      ? 'scale-110 pokemon-glow' 
                      : 'opacity-50 hover:opacity-100'}`}
                >
                  FEATURED COLLECTION
                </button>
                <button
                  onClick={() => setActiveTab('roadmap')}
                  className={`flex-1 py-3 text-center transition-all duration-300
                    pokemon-hollow text-sm
                    ${activeTab === 'roadmap' 
                      ? 'scale-110 pokemon-glow' 
                      : 'opacity-50 hover:opacity-100'}`}
                >
                  ROADMAP
                </button>
                <button
                  onClick={() => {
                    setActiveTab('lootpacks');
                    setShowLootPacks(true);
                  }}
                  className={`flex-1 py-3 text-center transition-all duration-300
                    pokemon-hollow text-sm
                    ${activeTab === 'lootpacks' 
                      ? 'scale-110 pokemon-glow' 
                      : 'opacity-50 hover:opacity-100'}`}
                >
                  LOOT PACKS
                </button>
              </div>

              <div className="flex-1 overflow-hidden">
                <div className={`h-full transition-all duration-500 ease-in-out flex
                  ${activeTab === 'featured' ? 'translate-x-0' : '-translate-x-full'}`}>
                  {/* Featured Content */}
                  <div className="h-full min-w-full flex">
                    {/* Main Featured Video */}
                    <div className="relative w-[600px]">
                      <div className="relative pt-[56.25%]">
                        <video
                          key={featuredVideos[currentVideo]}
                          src={`./Featured/${featuredVideos[currentVideo]}.mp4`}
                          className="absolute inset-0 w-full h-full object-contain bg-black"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="pokemon-hollow text-lg pokemon-glow">
                          {featuredVideos[currentVideo]}
                        </h3>
                      </div>

                      {/* Navigation Dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {featuredVideos.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentVideo(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 
                              ${currentVideo === index 
                                ? 'bg-white w-4' 
                                : 'bg-white/50 hover:bg-white/70'}`}
                            aria-label={`Go to video ${index + 1}`}
                          />
                        ))}
                      </div>

                      {/* Arrow Buttons */}
                      <button
                        onClick={() => setCurrentVideo((prev) => 
                          prev === 0 ? featuredVideos.length - 1 : prev - 1
                        )}
                        className="absolute left-2 top-1/2 -translate-y-1/2 pokeball-button w-10 h-10"
                        aria-label="Previous video"
                      />
                      <button
                        onClick={() => setCurrentVideo((prev) => 
                          (prev + 1) % featuredVideos.length
                        )}
                        className="absolute right-2 top-1/2 -translate-y-1/2 pokeball-button w-10 h-10"
                        aria-label="Next video"
                      />
                    </div>

                    {/* Video Previews */}
                    <div className="w-48 p-2 space-y-2 border-l-2 border-white/30 overflow-y-auto">
                      {featuredVideos.slice(0, 3).map((video, index) => (
                        <div 
                          key={video}
                          onClick={() => setCurrentVideo(index)}
                          className={`aspect-video relative cursor-pointer overflow-hidden rounded transition-all duration-300
                            ${currentVideo === index 
                              ? 'pokemon-border scale-105' 
                              : 'opacity-70 hover:opacity-100 hover:scale-105'}`}
                        >
                          <video
                            src={`./Featured/${video}.mp4`}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                            onMouseEnter={(e: VideoEvent) => e.currentTarget.play()}
                            onMouseLeave={(e: VideoEvent) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-2 left-2 pokemon-hollow text-xs pokemon-glow">
                              {video}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Roadmap Content */}
                  <div className={`h-full min-w-full transition-all duration-500 
                    ${activeTab === 'roadmap' ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="p-6 space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 mt-2 rounded-none bg-white pixelated-circle flex-shrink-0" />
                        <div>
                          <div className="pokemon-hollow text-sm mb-1">Q1 2024</div>
                          <div className="text-white/80 text-xs">New Animon releases and battle system improvements</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 mt-2 rounded-none bg-white pixelated-circle flex-shrink-0" />
                        <div>
                          <div className="pokemon-hollow text-sm mb-1">Q2 2024</div>
                          <div className="text-white/80 text-xs">Ranked matches and seasonal rewards</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 mt-2 rounded-none bg-white pixelated-circle flex-shrink-0" />
                        <div>
                          <div className="pokemon-hollow text-sm mb-1">Q3 2024</div>
                          <div className="text-white/80 text-xs">Team battles and social features</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 mt-2 rounded-none bg-white pixelated-circle flex-shrink-0" />
                        <div>
                          <div className="pokemon-hollow text-sm mb-1">Q4 2024</div>
                          <div className="text-white/80 text-xs">World championship tournament</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patch Notes Section */}
              <div className="p-2 border-t-2 border-white/30">
                <div className="flex items-center justify-between text-white/60 text-xs">
                  <span>PATCH NOTES</span>
                  <span>15.15 MB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 h-12 pokemon-panel px-8 flex justify-between items-center">
          <div className="pokemon-hollow text-xs">© 2024 Animon. All rights reserved.</div>
          <div className="flex gap-6">
            <button className="pokemon-hollow text-xs hover:text-white transition-colors">Support</button>
            <button className="pokemon-hollow text-xs hover:text-white transition-colors">Privacy Policy</button>
            <button className="pokemon-hollow text-xs hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>

        {showLootPacks && (
          <LootPacks onClose={() => {
            setShowLootPacks(false);
            setActiveTab('featured');
          }} />
        )}
      </div>
    </AnimatedPage>
  );
};

export default HomeScreen;