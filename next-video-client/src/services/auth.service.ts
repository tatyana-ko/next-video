import { axiosClassic } from '@/api/axios';
import type { IAuthData } from '@/types/auth.types';
import { EnumTokens } from '@/types/enum.tokens';
import type { IUser } from '@/types/user.types';
import Cookies from 'js-cookie';

export interface IAuthResponse {
	user: IUser;
	accessToken: string;
}

class AuthService {
	private _AUTH = '/auth';

	private _saveTokenToStorage(accessToken: string) {
		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			domain: 'localhost',
			sameSite: 'strict',
			expires: 10,
		});
	}

	private _removeTokenFromStorage() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN);
	}

	async main(type: 'login' | 'register', data: IAuthData, recaptcha?: string | null) {
		const response = await axiosClassic.post<IAuthResponse>(`${this._AUTH}/${type}`, data, {
			headers: {
				recaptcha,
			},
		});

		if (response.data.accessToken) {
			this._saveTokenToStorage(response.data.accessToken);
		}

		return response;
	}

	async logout() {
		const response = await axiosClassic.post<boolean>(`${this._AUTH}/logout`);

		if (response.data) {
			this._removeTokenFromStorage();
		}

		return response;
	}

	async getNewToken() {
		const response = await axiosClassic.post<IAuthResponse>(`${this._AUTH}/access-token`);

		if (response.data.accessToken) {
			this._saveTokenToStorage(response.data.accessToken);
		}

		return response;
	}

	async getNewTokenByRefresh(refreshToken: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			`${this._AUTH}/access-token`,
			{},
			{
				headers: {
					Cookie: `refreshToken=${refreshToken}`,
				},
			},
		);

		return response.data;
	}
}
export const authService = new AuthService();
