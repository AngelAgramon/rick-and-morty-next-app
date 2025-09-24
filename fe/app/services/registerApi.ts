import { ApiClient } from "./api";

interface RegisterResponse {
    success: boolean;
    message?: string;
}
export class RegisterApiClient extends ApiClient {
    public constructor() {
        super();
    }
    
    public simulateRegister = async (username: string, password: string): Promise<RegisterResponse> => {
        const response = await this.post<RegisterResponse>(`/auth/register`, { username, password });
        return response.data;
    };
}