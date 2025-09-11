// models/UI.ts
export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

export interface ThemeConfig {
  light: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  dark: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}
