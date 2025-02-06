import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { DiscordProvider } from './context/DiscordContext';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import CharacterSelection from './components/CharacterSelection';
import Navigation from './components/Navigation';
import About from './components/About';
import AuthCallback from './components/AuthCallback';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/characters" element={<CharacterSelection />} />
        <Route path="/about" element={<About />} />
        <Route path="/callback" element={<AuthCallback />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onEnter={() => setShowSplash(false)} />;
  }

  return (
    <AuthProvider>
      <DiscordProvider>
        <Router>
          <Navigation />
          <AnimatedRoutes />
        </Router>
      </DiscordProvider>
    </AuthProvider>
  );
};

export default App;