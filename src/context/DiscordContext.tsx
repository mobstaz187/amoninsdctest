import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { DiscordUser, DiscordContext as DiscordContextType } from '../types/discord';

const DiscordContext = createContext<DiscordContextType | undefined>(undefined);

export function useDiscord() {
  const context = useContext(DiscordContext);
  if (context === undefined) {
    throw new Error('useDiscord must be used within a DiscordProvider');
  }
  return context;
}

export function DiscordProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data: unlockedData, error: unlockedError } = await supabase
            .from('unlocked_characters')
            .select('character_name')
            .eq('profile_id', session.user.id);

          if (unlockedError) {
            throw unlockedError;
          }

          setUser({
            id: session.user.id,
            username: session.user.user_metadata.full_name,
            discriminator: '',
            avatar: session.user.user_metadata.avatar_url,
            email: session.user.email,
            unlockedCharacters: unlockedData.map(d => d.character_name)
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: unlockedData } = await supabase
          .from('unlocked_characters')
          .select('character_name')
          .eq('profile_id', session.user.id);

        setUser({
          id: session.user.id,
          username: session.user.user_metadata.full_name,
          discriminator: '',
          avatar: session.user.user_metadata.avatar_url,
          email: session.user.email,
          unlockedCharacters: unlockedData?.map(d => d.character_name) || []
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const unlockCharacter = async (characterName: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('unlocked_characters')
        .insert([
          {
            profile_id: user.id,
            character_name: characterName
          }
        ]);

      if (error) throw error;

      setUser(prev => prev ? {
        ...prev,
        unlockedCharacters: [...(prev.unlockedCharacters || []), characterName]
      } : null);
    } catch (error) {
      console.error('Error unlocking character:', error);
    }
  };

  const value = {
    user,
    setUser,
    isLoading,
    unlockCharacter
  };

  return (
    <DiscordContext.Provider value={value}>
      {children}
    </DiscordContext.Provider>
  );
}