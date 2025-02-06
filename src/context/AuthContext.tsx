import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  unlockedCharacters: string[];
  unlockCharacter: (characterName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [unlockedCharacters, setUnlockedCharacters] = useState<string[]>([]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUnlockedCharacters(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUnlockedCharacters(session.user.id);
      } else {
        setUnlockedCharacters([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUnlockedCharacters = async (userId: string) => {
    const { data, error } = await supabase
      .from('unlocked_characters')
      .select('character_name')
      .eq('profile_id', userId);

    if (error) {
      console.error('Error fetching unlocked characters:', error);
      return;
    }

    setUnlockedCharacters(data.map(row => row.character_name));
  };

  const unlockCharacter = async (characterName: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('unlocked_characters')
      .insert([
        {
          profile_id: user.id,
          character_name: characterName,
        }
      ])
      .single();

    if (error) {
      console.error('Error unlocking character:', error);
      return;
    }

    setUnlockedCharacters(prev => [...prev, characterName]);
  };

  const value = {
    user,
    unlockedCharacters,
    unlockCharacter,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}