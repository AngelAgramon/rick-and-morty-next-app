// services/AuthService.ts
import axios, { AxiosInstance } from 'axios';
import { LoginCredentials, LoginResponse, User } from '../models';

export class AuthService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:3001',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Interceptor para agregar token a las requests
    this.apiClient.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptor para manejar respuestas de error
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = '/';
        }
        return Promise.reject(error);
      }
    );
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await this.apiClient.post<{
        access_token: string;
        user: User;
      }>('/auth/login', credentials);

      // Guardar token en localStorage
      localStorage.setItem('authToken', response.data.access_token);

      return {
        success: true,
        message: 'Login exitoso',
        token: response.data.access_token,
        user: response.data.user,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Credenciales inválidas';
      return {
        success: false,
        message,
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await this.apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      localStorage.removeItem('authToken');
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      await this.apiClient.post('/auth/validate', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      const response = await this.apiClient.post<{ access_token: string }>('/auth/refresh');
      const newToken = response.data.access_token;
      localStorage.setItem('authToken', newToken);
      return newToken;
    } catch (error) {
      return null;
    }
  }
}
