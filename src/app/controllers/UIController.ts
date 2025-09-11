// controllers/UIController.ts
import { UIState, Notification } from '../models';

export class UIController {
  private state: UIState;

  constructor() {
    this.state = {
      sidebarOpen: false,
      theme: 'light',
      notifications: [],
    };

    // Cargar tema desde localStorage en el cliente
    if (typeof window !== 'undefined') {
      this.loadThemeFromStorage();
    }
  }

  // Getters
  get sidebarOpen(): boolean {
    return this.state.sidebarOpen;
  }

  get theme(): 'light' | 'dark' {
    return this.state.theme;
  }

  get notifications(): Notification[] {
    return this.state.notifications;
  }

  get isDarkMode(): boolean {
    return this.state.theme === 'dark';
  }

  // Actions
  toggleSidebar(): void {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  setSidebarOpen(open: boolean): void {
    this.setState({ sidebarOpen: open });
  }

  toggleTheme(): void {
    const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
    this.setState({ theme: newTheme });
    this.saveThemeToStorage();
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.setState({ theme });
    this.saveThemeToStorage();
  }

  addNotification(
    message: string, 
    type: 'success' | 'error' | 'info' = 'info', 
    duration: number = 5000
  ): void {
    const id = Date.now().toString();
    const notification: Notification = { id, message, type, duration };
    
    this.setState({
      notifications: [...this.state.notifications, notification]
    });

    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(id);
      }, duration);
    }
  }

  removeNotification(id: string): void {
    this.setState({
      notifications: this.state.notifications.filter(n => n.id !== id)
    });
  }

  clearNotifications(): void {
    this.setState({ notifications: [] });
  }

  private loadThemeFromStorage(): void {
    try {
      const stored = localStorage.getItem('rickAndMortyTheme');
      if (stored === 'light' || stored === 'dark') {
        this.setState({ theme: stored });
      }
    } catch (error) {
      console.error('Error al cargar tema desde localStorage:', error);
    }
  }

  private saveThemeToStorage(): void {
    try {
      localStorage.setItem('rickAndMortyTheme', this.state.theme);
    } catch (error) {
      console.error('Error al guardar tema en localStorage:', error);
    }
  }

  private setState(updates: Partial<UIState>): void {
    this.state = { ...this.state, ...updates };
  }
}
