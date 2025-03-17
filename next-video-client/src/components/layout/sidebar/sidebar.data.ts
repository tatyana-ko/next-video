import { PUBLIC_PAGE } from '@/config/public-page.config';
import { STUDIO_PAGE } from '@/config/studio-page.config';
import type { ISidebarItem } from '@/types/sidebar-data.types';
import {
	ArrowBigUp,
	CircleAlert,
	CirclePlay,
	Compass,
	FolderHeart,
	Gamepad2,
	History,
	Settings,
	TvMinimalPlay,
} from 'lucide-react';

export const SIDEBAR_PUBLIC_DATA: ISidebarItem[] = [
	{
		label: 'Explore',
		icon: Compass,
		link: PUBLIC_PAGE.HOME_PAGE,
	},
	{
		label: 'Trending',
		icon: ArrowBigUp,
		link: PUBLIC_PAGE.TRENDING,
	},
	{
		label: 'Video Games',
		icon: Gamepad2,
		link: PUBLIC_PAGE.VIDEO_GAMES,
	},
];

export const SIDEBAR_CHANNEL_DATA = [
	{
		icon: TvMinimalPlay,
		label: 'My channel',
		link: PUBLIC_PAGE.MY_CHANNEL,
	},
	{
		icon: CirclePlay,
		label: 'Subscriptions',
		link: PUBLIC_PAGE.SUBSCRIPTIONS,
	},
	{
		icon: History,
		label: 'History',
		link: PUBLIC_PAGE.HISTORY,
	},
	{
		icon: FolderHeart,
		label: 'Liked videos',
		link: PUBLIC_PAGE.LIKED_VIDEOS,
	},
];

export const SIDEBAR_CHANNEL_SETTINGS_MENU = [
	{
		icon: Settings,
		label: 'Settings',
		link: STUDIO_PAGE.SETTINGS,
	},
	{
		icon: CircleAlert,
		label: 'Send Feedback',
		link: PUBLIC_PAGE.FEEDBACK,
	},
];
