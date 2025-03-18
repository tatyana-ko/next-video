import type { LucideIcon } from 'lucide-react';

export interface ISidebarItem {
	label: string;
	icon: LucideIcon;
	link: string;
}

export interface ISidebarSubChannel {
	label: string;
	avatar: string;
	link: string;
	isLiveNow?: boolean;
	hasNewVideo?: boolean;
}
