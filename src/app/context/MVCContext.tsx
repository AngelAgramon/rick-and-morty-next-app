// context/MVCContext.tsx
import React, { createContext, useContext, useMemo } from 'react';
import { AppController } from '../controllers';

const MVCContext = createContext<AppController | undefined>(undefined);

export const MVCProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Crear el controlador principal dentro del componente para evitar problemas de SSR
  const appController = useMemo(() => {
    const controller = new AppController();
    // Inicializar la aplicación de forma asíncrona
    controller.initializeApp().catch(console.error);
    return controller;
  }, []);

  return (
    <MVCContext.Provider value={appController}>
      {children}
    </MVCContext.Provider>
  );
};

export const useMVC = () => {
  const context = useContext(MVCContext);
  if (context === undefined) {
    throw new Error('useMVC debe ser usado dentro de un MVCProvider');
  }
  return context;
};

// Hooks específicos para cada controlador
export const useAuth = () => {
  const { auth } = useMVC();
  return auth;
};

export const useCharacter = () => {
  const { character } = useMVC();
  return character;
};

export const useUI = () => {
  const { ui } = useMVC();
  return ui;
};
