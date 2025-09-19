// app/services/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Character, CharacterApiResponse } from '../../types';

interface LoginResponse {
	success: boolean;
	message?: string;
	token?: string;
}


export class Api {
	private readonly API_BASE_URL: string = 'http://localhost:3002'; 
	private api: AxiosInstance;

	public constructor() {
		const config = this.getConfiguration();
		this.api = axios.create(config);
	}

	protected get = <T>(url: string): Promise<AxiosResponse<T>> => {
        return this.api.get(url);
    };

	protected post = <T>(url: string, data?: any): Promise<AxiosResponse<T, any>> => {
        return this.api.post<T>(url, data);
    };

	private getRequestToken () {
		return localStorage.getItem('authToken')
	}

	protected getConfiguration = () : AxiosRequestConfig => {
		const token = this.getRequestToken();
		const headers: Record<string, string> = {
			'Cache-Control': 'no-cache, no-store, must-revalidate',
			Pragma: 'no-cache',
			Accept: 'application/json',
		    'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json; charset=UTF-8',
		};
		if (token){
			headers['Authorization']=`Bearer ${token}`;
		}
		const config: AxiosRequestConfig = {
			withCredentials: true,
			timeout: 0,
			baseURL: this.API_BASE_URL,
			maxBodyLength: 1048576,
			maxContentLength: 1048576,
			headers,
		};

		return config;
	};

}