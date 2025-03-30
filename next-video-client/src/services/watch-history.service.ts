import {  instance } from '@/api/axios';
import type {  IVideoResponse } from '@/types/video.types';

class WatchHistoryService {
	getWatchHistory() {
		return instance.get<{ video: IVideoResponse }[]>(`/watch-history/`);
	}

	addToWatchHistory(videoId: string) {
		return instance.post(`/watch-history/`, { videoId });
	}

	removeWarchHistory() {
		return instance.delete(`/watch-history/`);
	}
}
export const watchHistoryService = new WatchHistoryService();
