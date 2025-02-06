import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Don't show navigation on home screen
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-50">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300
          group bg-black/30 px-6 py-3 rounded-lg"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 transform group-hover:-translate-x-1 transition-transform duration-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
        <span className="uppercase tracking-wider text-sm font-medium">Back</span>
      </button>
    </div>
  );
};

export default Navigation;