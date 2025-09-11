import { makeAutoObservable, runInAction } from 'mobx';

export class UIStore {
  sidebarOpen = false;
  theme: 'light' | 'dark' = 'light';
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
    duration?: number;
  }> = [];

  constructor() {
    makeAutoObservable(this);
    // Solo cargar tema en el cliente
    if (typeof window !== 'undefined') {
      this.loadThemeFromStorage();
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  setSidebarOpen(open: boolean) {
    this.sidebarOpen = open;
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.saveThemeToStorage();
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
    this.saveThemeToStorage();
  }

  addNotification(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 5000) {
    const id = Date.now().toString();
    
    runInAction(() => {
      this.notifications.push({ id, message, type, duration });
    });

    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(id);
      }, duration);
    }
  }

  removeNotification(id: string) {
    runInAction(() => {
      this.notifications = this.notifications.filter(n => n.id !== id);
    });
  }

  private loadThemeFromStorage() {
    try {
      const stored = localStorage.getItem('rickAndMortyTheme');
      if (stored === 'light' || stored === 'dark') {
        this.theme = stored;
      }
    } catch (error) {
      // Error silencioso al cargar tema
    }
  }

  private saveThemeToStorage() {
    try {
      localStorage.setItem('rickAndMortyTheme', this.theme);
    } catch (error) {
      // Error silencioso al guardar tema
    }
  }

  get isDarkMode() {
    return this.theme === 'dark';
  }
} 