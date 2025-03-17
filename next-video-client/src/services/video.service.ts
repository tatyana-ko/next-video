// import type { IVideo } from "@/types/video.types";
import axios from 'axios';

class VideoService {
	getExploreVideos() {
		return axios.get('http://localhost:4200/api/videos/explore');
	}

	getTrendingVideos() {
		return axios.get('http://localhost:4200/api/videos/trending');
	}

	searchVideos(searchTerm: string | null) {
		return axios.get(
			'http://localhost:4200/api/videos',
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
