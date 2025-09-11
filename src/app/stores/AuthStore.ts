import { makeAutoObservable, runInAction } from 'mobx';
import { simulateLogin } from '../services/api';

export class AuthStore {
  isAuthenticated = false;
  token: string | null = null;
  loading = false;
  error: string | null = null;
  username: string = '';

  constructor() {
    makeAutoObservable(this);
    
    // Solo verificar autenticación en el cliente
    if (typeof window !== 'undefined') {
      this.checkAuthOnMount();
    }
  }

  checkAuthOnMount() {
    try {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        runInAction(() => {
          this.isAuthenticated = true;
          this.token = token;
        });
      }
    } catch (error) {
      console.warn('Error checking auth on mount:', error);
    }
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  async login(username: string, password: string): Promise<boolean> {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const response = await simulateLogin(username, password);
      
      if (response.success && response.token) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', response.token);
        }
        
        runInAction(() => {
          this.isAuthenticated = true;
          this.token = response.token;
          this.username = username;
          this.loading = false;
        });
        
        return true;
      } else {
        runInAction(() => {
          this.error = response.message || 'Login failed';
          this.loading = false;
        });
        
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed due to an unexpected error.';
      
      runInAction(() => {
        this.error = errorMessage;
        this.loading = false;
      });
      
      return false;
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
    
    runInAction(() => {
      this.isAuthenticated = false;
      this.token = null;
      this.username = '';
      this.error = null;
    });
  }

  get isLoggedIn() {
    return this.isAuthenticated && this.token !== null;
  }

  // Método para verificar si estamos en el cliente
  checkClientSide() {
    if (typeof window !== 'undefined') {
      this.checkAuthOnMount();
    }
  }
} 