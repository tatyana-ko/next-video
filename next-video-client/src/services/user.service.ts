import { instance } from '@/api/axios';
import type { ISettingsData } from '@/types/settings.types';
import type { IProfileResponse } from '@/types/user.types';

class UserService {
	private _USERS = '/users';

	getProfile() {
		return instance.get<IProfileResponse>(`${this._USERS}/profile`);
	}

	updateProfile(data: ISettingsData) {
		return instance.put(`${this._USERS}/profile`, data);
	}

	toggleLikesOnVideo(videoId: string) {
		return instance.put(`/users/profile/likes`, {videoId});
	}
}
export const userService = new UserService();
