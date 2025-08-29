// app/types.ts
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface CharacterApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface AppContextType {
  auth: AuthContextType;
  characters: Character[];
  charactersLoading: boolean;
  charactersError: string | null;
  fetchCharacters: () => Promise<void>;
}

interface LayoutProps {
  children: React.ReactNode;
}

interface CharacterCardProps {
  character: Character;
}

interface CharacterGridProps {
  characters: Character[];
}

export type {
  Character,
  CharacterApiResponse,
  AuthContextType,
  AppContextType,
  LayoutProps,
  CharacterCardProps,
  CharacterGridProps,
};