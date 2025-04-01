import type { IChannel } from './channel.types';
import type { IComment } from './comments.types';
import type { IPagination } from './pagination.types';
import type { EnumVideoPlayerQuality } from './video-player.types';

export interface IVideo {
	id: string;
	publicId: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	videoFileName: string;
	channel: IChannel;
	createdAt: string;
	isPublic: boolean;
	viewsCount: number;
	maxResolution: EnumVideoPlayerQuality;
}

export interface IFullVideo extends IVideo {
	likes: [];
	comments: IComment[];
}

export interface IVideoResponse extends IFullVideo {
	similarVideos: IVideo[];
}

export interface IVideosPagination extends IPagination {
	videos: IFullVideo[];
}

export interface IVideoDataResponse extends IFullVideo {
	tags: { id: string; name: string }[];
}
