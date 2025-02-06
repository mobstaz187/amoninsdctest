import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg 
          hover:bg-black/50 transition-colors duration-300"
      >
        {user.user_metadata.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            {user.user_metadata.full_name?.[0] || user.email?.[0] || '?'}
          </div>
        )}
        <span className="text-white/90">
          {user.user_metadata.full_name || user.email?.split('@')[0] || 'User'}
        </span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-lg 
          shadow-xl border border-white/10 overflow-hidden z-50">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-white/90 hover:bg-white/10 
              transition-colors duration-300"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;