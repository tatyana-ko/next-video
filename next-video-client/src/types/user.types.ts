import type { IChannel } from './channel.types';
import type { IVideo } from './video.types';
import type { IWatchHistory } from './watchHistory.types';

export interface IUser {
	id: string;
	name?: string;
	email: string;
	channel?: IChannel;
}

export interface IFullUserInfo extends IUser {
	subscriptions: IChannel[];
	watchHistory: IWatchHistory[];
}

export interface IProfileResponse extends IFullUserInfo {
	likes: {
		id: string;
		videoId: string;
		userId: string;
	}[];
	subscribedVideos?: IVideo[];
}
