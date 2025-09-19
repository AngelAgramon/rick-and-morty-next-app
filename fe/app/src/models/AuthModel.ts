export class AuthModel {
  isAuthenticated = false;
  authToken: string | null = null;
  authLoading = false;
  authError: string | null = null;

  constructor() {
    this.initializeAuth();
  }

  initializeAuth() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.isAuthenticated = true;
        this.authToken = token;
      }
    }
  }

  setAuthenticated(isAuth: boolean, token?: string) {
    this.isAuthenticated = isAuth;
    this.authToken = token || null;
  }

  setLoading(loading: boolean) {
    this.authLoading = loading;
  }

  setError(error: string | null) {
    this.authError = error;
  }

  clearAuth() {
    this.isAuthenticated = false;
    this.authToken = null;
    this.authError = null;
  }
}