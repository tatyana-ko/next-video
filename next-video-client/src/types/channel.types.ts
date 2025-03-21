import type { IVideo } from './video.types';

export interface IChannel {
	id: string;
	slug: string;
	description: string;
	avatarUrl: string;
	bannerUrl: string;
	isVerified: string;
	videos: IVideo[];
	subscribers: [];
}
