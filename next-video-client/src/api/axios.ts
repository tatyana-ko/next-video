import { API_URL } from '@/constants/constants';
import { EnumTokens } from '@/types/enum.tokens';
import axios, { type CreateAxiosDefaults } from 'axios';
import Cookies from 'js-cookie';
import { errorCatch } from './api.helpers';
import { authService } from '@/services/auth.service';

export const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-type': 'application/json',
	},
	withCredentials: true,
};

export const axiosClassic = axios.create(options);

export const instance = axios.create(options);

instance.interceptors.request.use(config => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);

	if (accessToken && config.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config;

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;

			try {
				authService.getNewToken();
				return instance.request(originalRequest);
			} catch (e) {
				if (errorCatch(e) === 'jwt expired' || errorCatch(e) === 'Refresh token not passed') {
					authService.removeTokenFromStorage();
				}
			}
		}

		throw error;
	},
);
