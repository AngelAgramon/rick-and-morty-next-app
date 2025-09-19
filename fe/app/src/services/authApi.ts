import { LoginResponseDto } from "../../rick-and-morty-backend/src/auth/dto/login.dto";
import { Api } from "./api";

export class AuthApi extends Api {
    public constructor() {
        super();
    }
    
    public simulateLogin = async (username: string, password: string): Promise<LoginResponseDto> => {
        const response = await this.post<LoginResponseDto>(`/auth/login`, { username, password });
        return response.data;
    };

    public  simulateLogout = async (): Promise<LoginResponseDto> => {
      const response = await this.post<LoginResponseDto>( `/auth/logout` );
      return response.data;
    };

}