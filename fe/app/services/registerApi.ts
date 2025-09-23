import { Api } from "./api";

interface RegisterResponse {
    success: boolean;
    message?: string;
}
export class RegisterApi extends Api {
    public constructor() {
        super();
    }
    
    public simulateRegister = async (username: string, password: string): Promise<RegisterResponse> => {
        const response = await this.post<RegisterResponse>(`/auth/register`, { username, password });
        return response.data;
    };
}