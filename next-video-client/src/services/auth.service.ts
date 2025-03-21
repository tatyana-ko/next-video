import { axiosClassic } from '@/api/axios';
import { removeAuthData, setAuthData } from '@/redux/auth.slice';
import { store } from '@/store';
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
			expires: 1 / 24,
			secure: true,
		});
	}

	async main(type: 'login' | 'register', data: IAuthData, recaptcha?: string | null) {
		const response = await axiosClassic.post<IAuthResponse>(`${this._AUTH}/${type}`, data, {
			headers: {
				recaptcha,
			},
		});

		if (response.data.accessToken) {
			store.dispatch(setAuthData(response.data));
			this._saveTokenToStorage(response.data.accessToken);
		}

		return response;
	}

	async initialAuth() {
		const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);

		if (accessToken) return;

		try {
			await this.getNewToken();
		} catch (error: unknown) {
			store.dispatch(removeAuthData());
			console.log(error);
		}
	}

	removeTokenFromStorage() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN);
		store.dispatch(removeAuthData());
	}

	async logout() {
		const response = await axiosClassic.post<boolean>(`${this._AUTH}/logout`);

		if (response.data) {
			this.removeTokenFromStorage();
		}

		return response;
	}

	async getNewToken() {
		const response = await axiosClassic.post<IAuthResponse>(`${this._AUTH}/access-token`);

		if (response.data.accessToken) {
			store.dispatch(setAuthData(response.data));
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
