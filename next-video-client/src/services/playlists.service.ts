import { instance } from '@/api/axios';
import type { IPlaylist, IPlaylistData } from '@/types/playlists.types';

class PlaylistsService {
	private _PLAYLISTS = '/playlists';

	getAllUserPlaylists() {
		return instance.get<IPlaylist[]>(`${this._PLAYLISTS}`);
	}

	addNewPlaylist(playlist: IPlaylistData) {
		return instance.post(`${this._PLAYLISTS}`, playlist);
	}

	getVideosFromPlaylist(playlistId: string) {
		return instance.get<IPlaylist>(`${this._PLAYLISTS}/${playlistId}`);
	}

	toggleVideoOnPlaylist(playlistId: string, videoId: string) {
		return instance.post(`${this._PLAYLISTS}/${playlistId}/toggle-video`, { videoId });
	}
}
export const playlistsService = new PlaylistsService();
