import { axiosClassic } from '@/api/axios';
import type { IVideoResponse, IVideosPagination } from '@/types/video.types';

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
		return axiosClassic.get<IVideosPagination>(
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

	getVideoByPublicId(publicId: string | null) {
		return axiosClassic.get<IVideoResponse>(`/videos/by-publicId/${publicId}`);
	}
}
export const videoService = new VideoService();
