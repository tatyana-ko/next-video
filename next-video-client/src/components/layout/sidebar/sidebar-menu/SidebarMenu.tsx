'use client'

import clsx from 'clsx';
import { match } from 'path-to-regexp';
import { usePathname } from 'next/navigation';
import type { ISidebarItem } from '@/types/sidebar-data.types';
import { MenuItem } from './MenuItem';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { PUBLIC_PAGE } from '@/config/public-page.config';
import { MyChannelMenuItem } from './MyChannelMenuItem';

interface ISidebarMenuProps {
	title?: string;
	items: ISidebarItem[];
	hasBorder?: boolean;
}

export function SidebarMenu({ title, items, hasBorder }: ISidebarMenuProps) {
	const pathname = usePathname();
	const { isLoggedIn } = useSelector((state: RootState) => state.auth);

	return (
		<div className={clsx(hasBorder && 'border-b border-gray-600 mb-4')}>
			{title && <h2 className='text-xs opacity-50 uppercase'>{title}</h2>}
			<nav>
				<ul>
					{items.map(item => {
						const props = {
							item,
							isActiveLink: !!match(item.link)(pathname),
						}

						const isMyChannel = item.link === PUBLIC_PAGE.MY_CHANNEL
						const isMyChannelItem = isMyChannel && isLoggedIn

						return isMyChannelItem 
						? (
							<MyChannelMenuItem
								key={item.label}
								{...props} />
						)
						: isMyChannel ? null : (
							<MenuItem
							key={item.label}
							{...props}
						/>
						)
					})}
				</ul>
			</nav>
		</div>
	);
}

// <MenuItem
// 							key={item.label}
// 							item={item}
// 							isActiveLink={!!match(item.link)(pathname)}
// 						/>