import { axiosClassic } from '@/api/axios';

class VideoService {
	getExploreVideos() {
		return axiosClassic.get(`/videos/explore`);
	}

	getTrendingVideos() {
		return axiosClassic.get(`/videos/trending`);
	}

	getVideosAboutGames() {
		return axiosClassic.get(`/videos/games`);
	}

	searchVideos(searchTerm: string | null) {
		return axiosClassic.get(
			`/videos`,
			searchTerm
				? {
						params: {
							searchTerm,
						},
					}
				: {},
		);
	}
}
export const videoService = new VideoService();
