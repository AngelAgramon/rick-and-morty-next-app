import { Api } from "./api";

interface LoginResponse {
    success: boolean;
    message?: string;
    token?: string;
}

export class AuthApi extends Api {
    public constructor() {
        super();
    }
    
    public simulateLogin = async (username: string, password: string): Promise<LoginResponse> => {
        const response = await this.post<LoginResponse>(`/auth/login`, { username, password });
        return response.data;
    };

    public simulateLogout = async (): Promise<LoginResponse> => {
      const response = await this.post<LoginResponse>(`/auth/logout`);
      return response.data;
    };
}