import { axiosClassic } from '@/api/axios';

class VideoService {
	getExploreVideos() {
		return axiosClassic(`/videos/explore`);
	}

	getTrendingVideos() {
		return axiosClassic(`/videos/trending`);
	}

	getVideosAboutGames() {
		return axiosClassic(`/videos/games`);
	}

	searchVideos(searchTerm: string | null) {
		return axiosClassic(
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
