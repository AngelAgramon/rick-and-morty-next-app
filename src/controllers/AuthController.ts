import { AuthModel } from '../models/AuthModel';
import { simulateLogin } from '../services/api';

export class AuthController {
  constructor(private authModel: AuthModel) {}

  async login(username: string, password: string): Promise<boolean> {
    this.authModel.setLoading(true);
    this.authModel.setError(null);
    
    try {
      const response = await simulateLogin(username, password);
      if (response.success && response.token) {
        localStorage.setItem('authToken', response.token);
        this.authModel.setAuthenticated(true, response.token);
        this.authModel.setLoading(false);
        return true;
      } else {
        this.authModel.setError(response.message || 'Login failed');
        this.authModel.setAuthenticated(false);
        this.authModel.setLoading(false);
        return false;
      }
    } catch (error) {
      this.authModel.setError('Login failed');
      this.authModel.setLoading(false);
      return false;
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    this.authModel.clearAuth();
  }
}