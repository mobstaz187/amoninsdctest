export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  email?: string;
  unlockedCharacters?: string[];
}

export interface DiscordContext {
  user: DiscordUser | null;
  setUser: (user: DiscordUser | null) => void;
  isLoading: boolean;
  unlockCharacter: (characterName: string) => Promise<void>;
}