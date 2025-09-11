import React, { createContext, useContext, useMemo } from 'react';
import { RootStore } from './RootStore';

const StoreContext = createContext<RootStore | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Crear el store dentro del componente para evitar problemas de SSR
  const rootStore = useMemo(() => {
    const store = new RootStore();
    return store;
  }, []);

  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

// Hooks específicos para cada store
export const useAuthStore = () => {
  const store = useStore();
  return store.authStore;
};

export const useCharacterStore = () => {
  const store = useStore();
  return store.characterStore;
};

export const useUIStore = () => {
  const store = useStore();
  return store.uiStore;
}; 