import { ApiClient } from "./api";
import { UserResponse } from '~/types';

export class UserApiClient extends ApiClient {
    public constructor() {
        super();
    }

    public getUsers = async () : Promise<UserResponse> => {
        const response = await this.get<UserResponse>('/users');
        return response.data;
    };
}
