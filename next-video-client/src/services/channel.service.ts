import { axiosClassic, instance } from '@/api/axios';
import type { IChannel } from '@/types/channel.types';

class ChannelService {
	getAllChannels() {
		return axiosClassic.get<IChannel[]>(`/channels`);
	}

	getChannelInfoBySlug(slug: string | null) {
		return axiosClassic.get<IChannel>(`/channels/by-slug/${slug}`);
	}

	toggleSubscription(slug: string) {
		return instance.patch(`channels/toggle-subscribe/${slug}`)
	}
}
export const channelService = new ChannelService();
