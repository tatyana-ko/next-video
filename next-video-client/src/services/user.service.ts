import { instance } from '@/api/axios';

class UserService {
	private _USERS = '/users';

	getExploreVideos() {
		return instance.get(`${this._USERS}/profile`);
	}
}
export const userService = new UserService();
