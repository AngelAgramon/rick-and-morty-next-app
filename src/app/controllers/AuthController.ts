// controllers/AuthController.ts
import { AuthState, LoginCredentials, LoginResponse, User } from '../models';
import { AuthService } from '../services/AuthService';

export class AuthController {
  private authService: AuthService;
  private state: AuthState;

  constructor() {
    this.authService = new AuthService();
    this.state = {
      isAuthenticated: false,
      token: null,
      user: null,
      loading: false,
      error: null,
    };
  }

  // Getters
  get isAuthenticated(): boolean {
    return this.state.isAuthenticated;
  }

  get token(): string | null {
    return this.state.token;
  }

  get user(): User | null {
    return this.state.user;
  }

  get loading(): boolean {
    return this.state.loading;
  }

  get error(): string | null {
    return this.state.error;
  }

  // Actions
  async login(credentials: LoginCredentials): Promise<boolean> {
    this.setState({ loading: true, error: null });

    try {
      const response = await this.authService.login(credentials);
      
      if (response.success && response.token && response.user) {
        this.setState({
          isAuthenticated: true,
          token: response.token,
          user: response.user,
          loading: false,
          error: null,
        });
        return true;
      } else {
        this.setState({
          isAuthenticated: false,
          token: null,
          user: null,
          loading: false,
          error: response.message || 'Error de autenticación',
        });
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      this.setState({
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
        error: errorMessage,
      });
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      this.setState({
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
        error: null,
      });
    }
  }

  async validateToken(): Promise<boolean> {
    if (!this.state.token) {
      return false;
    }

    try {
      const isValid = await this.authService.validateToken(this.state.token);
      if (!isValid) {
        this.setState({
          isAuthenticated: false,
          token: null,
          user: null,
        });
      }
      return isValid;
    } catch (error) {
      this.setState({
        isAuthenticated: false,
        token: null,
        user: null,
      });
      return false;
    }
  }

  async checkAuthOnMount(): Promise<void> {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.setState({ token });
        const isValid = await this.validateToken();
        if (isValid) {
          this.setState({ 
            isAuthenticated: true,
            user: { id: 1, username: 'user', email: 'user@example.com' } // Usuario por defecto
          });
        }
      }
    }
  }

  private setState(updates: Partial<AuthState>): void {
    this.state = { ...this.state, ...updates };
  }
}
