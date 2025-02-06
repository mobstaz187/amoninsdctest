import React, { useState } from 'react';
import AnimatedPage from './AnimatedPage';
import ParticlesBackground from './ParticlesBackground';

interface Character {
  id: number;
  name: string;
  role: string;
  description: string;
  roleDescription: string;
  image: string;
  video: string;
}

const characters: Character[] = [
  {
    id: 1,
    name: "AKAI TSUKI",
    role: "DUELIST",
    description: 'A masterful swordsman with lightning-fast strikes.',
    roleDescription: "Duelists excel in aggressive plays and securing kills.",
    image: './Characters/Akai Tsuki.png',
    video: './Characters/Akai Tsuki.mp4'
  },
  {
    id: 2,
    name: "CATTO",
    role: "INITIATOR",
    description: 'A stealthy operative who can gather crucial information.',
    roleDescription: "Initiators challenge angles by setting up teammates to enter contested ground.",
    image: './Characters/Catto.png',
    video: './Characters/Catto.mp4'
  },
  {
    id: 3,
    name: "COOROGI",
    role: "SENTINEL",
    description: 'A defensive expert who can lock down multiple angles.',
    roleDescription: "Sentinels are defensive experts who can lock down areas.",
    image: './Characters/Coorogi.png',
    video: './Characters/Coorogi.mp4'
  },
  {
    id: 4,
    name: "GOPEGI",
    role: "CONTROLLER",
    description: 'A strategic mastermind who can reshape the battlefield.',
    roleDescription: "Controllers specialize in slicing up dangerous territory.",
    image: './Characters/Gopegi.png',
    video: './Characters/Gopegi.mp4'
  },
  {
    id: 5,
    name: "GOTSU",
    role: "CONTROLLER",
    description: 'A master of area control and battlefield manipulation.',
    roleDescription: "Controllers shape the battlefield to their advantage.",
    image: './Characters/Gotsu.png',
    video: './Characters/Gotsu.mp4'
  },
  {
    id: 6,
    name: "HORICHI",
    role: "DUELIST",
    description: 'A fierce combatant with devastating close-range abilities.',
    roleDescription: "Duelists are designed to seek out engagements and win them.",
    image: './Characters/Horichi.png',
    video: './Characters/Horichi.mp4'
  },
  {
    id: 7,
    name: "KANOPIO",
    role: "INITIATOR",
    description: 'A tactical genius who excels at gathering intelligence.',
    roleDescription: "Initiators set up their team for success with reconnaissance.",
    image: './Characters/Kanopio.png',
    video: './Characters/Kanopio.mp4'
  },
  {
    id: 8,
    name: "KICHI",
    role: "DUELIST",
    description: 'A dynamic fighter with explosive potential.',
    roleDescription: "Duelists are expected to seek out engagements and frag.",
    image: './Characters/Kichi.png',
    video: './Characters/Kichi.mp4'
  },
  {
    id: 9,
    name: "KUMAMO",
    role: "SENTINEL",
    description: 'A defensive specialist with powerful fortification abilities.',
    roleDescription: "Sentinels excel at holding positions and protecting objectives.",
    image: './Characters/Kumamo.png',
    video: './Characters/Kumamo.mp4'
  },
  {
    id: 10,
    name: "RATIEZA",
    role: "DUELIST",
    description: 'A fierce warrior with exceptional combat abilities.',
    roleDescription: "Duelists are self-sufficient fraggers who can secure kills through agility and skill.",
    image: './Characters/Ratieza.png',
    video: './Characters/Ratieza.mp4'
  },
  {
    id: 11,
    name: "REZA",
    role: "INITIATOR",
    description: 'A tactical expert who excels at creating opportunities.',
    roleDescription: "Initiators set up teammates for success with their utility abilities.",
    image: './Characters/Reza.png',
    video: './Characters/Reza.mp4'
  },
  {
    id: 12,
    name: "SARUFFY",
    role: "SENTINEL",
    description: 'A mysterious guardian with unparalleled defensive capabilities.',
    roleDescription: "Sentinels are defensive experts who can lock down areas and watch flanks.",
    image: './Characters/Saruffy.png',
    video: './Characters/Saruffy.mp4'
  },
  {
    id: 13,
    name: "SUKUSA",
    role: "DUELIST",
    description: 'An agile fighter who can quickly turn the tide of battle.',
    roleDescription: "Duelists are designed to seek out engagements and win them.",
    image: './Characters/Sukusa.png',
    video: './Characters/Sukusa.mp4'
  },
  {
    id: 14,
    name: "TOGUNE",
    role: "CONTROLLER",
    description: 'A battlefield commander who excels at zone control.',
    roleDescription: "Controllers dictate the flow of battle through area denial.",
    image: './Characters/Togune.png',
    video: './Characters/Togune.mp4'
  },
  {
    id: 15,
    name: "TORO",
    role: "SENTINEL",
    description: 'A steadfast defender with impenetrable defenses.',
    roleDescription: "Sentinels specialize in locking down and holding strategic positions.",
    image: './Characters/Toro.png',
    video: './Characters/Toro.mp4'
  }
];

const CharacterSelection: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <AnimatedPage>
      <div className="min-h-screen relative overflow-hidden">
        <img 
          src="./logo-default-animon.png"
          alt="Default Animon Background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${selectedCharacter ? 'opacity-0' : 'opacity-100'}`}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent backdrop-blur-sm" />
        
        {!selectedCharacter && <ParticlesBackground />}

        <div className={`absolute inset-0 transition-opacity duration-1000 ${selectedCharacter ? 'opacity-100' : 'opacity-0'}`}>
          {selectedCharacter && (
            <video
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
              src={selectedCharacter.video}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
            />
          )}
        </div>

        <div className="absolute left-32 top-48 z-10">
          <div className="grid grid-cols-3 gap-3">
            {characters.map(character => (
              <button
                key={character.id}
                onClick={() => {
                  setIsVideoLoaded(false);
                  setSelectedCharacter(character);
                }}
                className={`w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 hover:scale-110
                  ${selectedCharacter?.id === character.id 
                    ? 'ring-2 ring-white/50 scale-110' 
                    : 'opacity-70 hover:opacity-100'}`}
              >
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {selectedCharacter && (
          <div className="absolute top-24 right-12 z-10">
            <div className="bg-[#4a90e2]/30 backdrop-blur-sm rounded-lg p-6 w-[500px] space-y-6">
              <div className="space-y-4">
                <h1 className="text-[72px] font-bold text-white leading-none tracking-wider"
                    style={{
                      fontFamily: "'Pokemon Solid', sans-serif",
                      textShadow: '2px 2px 0 #2563eb, -2px -2px 0 #2563eb, 2px -2px 0 #2563eb, -2px 2px 0 #2563eb'
                    }}>
                  {selectedCharacter.name}
                </h1>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm tracking-wider" style={{ fontFamily: "'Pokemon Hollow', sans-serif" }}>
                      • {selectedCharacter.role}
                    </span>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {selectedCharacter.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 border-t border-white/20 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm tracking-wider" style={{ fontFamily: "'Pokemon Hollow', sans-serif" }}>
                    • ROLE INFO
                  </span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  {selectedCharacter.roleDescription}
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedCharacter && (
          <div className="absolute bottom-32 right-12 z-10">
            <button className="bg-[#4a90e2]/30 backdrop-blur-sm rounded-lg px-20 py-4 
              hover:bg-[#4a90e2]/40 transition-all duration-300">
              <span className="text-white text-xl tracking-[0.2em]" 
                style={{ fontFamily: "'Pokemon Hollow', sans-serif" }}>
                LOCK IN
              </span>
            </button>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default CharacterSelection;