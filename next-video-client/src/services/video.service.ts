import { axiosClassic } from '@/api/axios';
import type { IPaginationParams } from '@/types/pagination.types';
import type { IVideoResponse, IVideosPagination } from '@/types/video.types';

class VideoService {
	private _VIDEOS = '/videos'

	async getExploreVideos(userId?: string, params?: IPaginationParams, excludeIds?: string[]) {
		const excludeIdsString = excludeIds?.join(',') || '';

		const { data } = await axiosClassic.get<IVideosPagination>(`${this._VIDEOS}/explore`, {
			params: userId
				? {
						userId,
						...params,
						excludeIds: excludeIdsString
					}
				: params
		})

		return data
	}

	getTrendingVideos() {
		return axiosClassic.get(`${this._VIDEOS}/trending`);
	}

	getVideosAboutGames() {
		return axiosClassic.get(`${this._VIDEOS}/games`);
	}

	searchVideos(searchTerm: string | null) {
		return axiosClassic.get<IVideosPagination>(
			`${this._VIDEOS}`,
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
		return axiosClassic.get<IVideoResponse>(`${this._VIDEOS}/by-publicId/${publicId}`);
	}

	updateViews(publicId: string) {
		return axiosClassic.put(`${this._VIDEOS}/update-views-count/${publicId}`);
	}
}
export const videoService = new VideoService();
