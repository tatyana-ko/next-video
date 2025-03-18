import type { IChannel } from './channel.types';

export interface IVideo {
	id: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	videoFileName: string;
	channel: IChannel;
	createdAt: string;
	isPublic: boolean;
	viewsCount: number;
}
