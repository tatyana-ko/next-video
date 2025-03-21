import { instance } from '@/api/axios';
import type { ISettingsData } from '@/types/settings.types';

class UserService {
	private _USERS = '/users';

	getProfile() {
		return instance.get(`${this._USERS}/profile`);
	}

	updateProfile(data: ISettingsData) {
		return instance.put(`${this._USERS}/profile`, data);
	}
}
export const userService = new UserService();
