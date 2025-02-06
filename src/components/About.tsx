import React from 'react';
import AnimatedPage from './AnimatedPage';

const About: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-900 relative overflow-hidden p-20">
        <div className="max-w-3xl mx-auto bg-black/30 p-8 rounded-lg text-white">
          <h1 className="text-4xl font-bold mb-6">About Animon</h1>
          <p className="text-lg leading-relaxed mb-4">
            Welcome to the world of Animon, where unique characters with extraordinary abilities await your command.
          </p>
          <p className="text-lg leading-relaxed">
            Each Animon brings their own special powers and tactical advantages to the battlefield. 
            Choose your character wisely and master their abilities to become the ultimate champion.
          </p>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default About;