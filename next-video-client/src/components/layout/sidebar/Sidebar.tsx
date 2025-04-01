import { SidebarMenu } from './sidebar-menu/SidebarMenu';
import { SidebarHeader } from './header/SidebarHeader';
import {
	SIDEBAR_CHANNEL_DATA,
	SIDEBAR_CHANNEL_SETTINGS_MENU,
	SIDEBAR_PUBLIC_DATA,
	STUDIO_MENU,
} from './sidebar.data';
import { usePathname } from 'next/navigation';
import { STUDIO_PAGE } from '@/config/studio-page.config';
// import { SidebarSubscriptions } from "./subscriptions/SidebarSubscriptions";

interface ISidebarProps {
	isSidebarOpen: boolean
	toggleSidebar: () => void;
}

export function Sidebar({ toggleSidebar, isSidebarOpen }: ISidebarProps) {
	const pathname = usePathname();

	return (
		<aside className='w-54 p-2 border-r border-gray-600 whitespace-nowrap overflow-hidden'>
			<SidebarHeader toggleSidebar={toggleSidebar} />
			<SidebarMenu
				items={SIDEBAR_PUBLIC_DATA}
				hasBorder={true}
				isSidebarOpen={isSidebarOpen}
			/>
			<SidebarMenu
				items={SIDEBAR_CHANNEL_DATA}
				hasBorder={true}
				isSidebarOpen={isSidebarOpen}
			/>

			{pathname.includes(STUDIO_PAGE.HOME) && <SidebarMenu
				title='Studio:'
				items={STUDIO_MENU}
				hasBorder={true}
				isSidebarOpen={isSidebarOpen}
			/>}

			{/* <SidebarSubscriptions title={Subscriptions} /> */}

			<SidebarMenu
				items={SIDEBAR_CHANNEL_SETTINGS_MENU}
				title='Settings:'
				isSidebarOpen={isSidebarOpen}
			/>
		</aside>
	);
}
