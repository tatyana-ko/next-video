import clsx from 'clsx';
import { match } from 'path-to-regexp';
import { usePathname } from 'next/navigation';
import type { ISidebarItem } from '@/types/sidebar-data.types';
import { MenuItem } from './MenuItem';

interface ISidebarMenuProps {
	title?: string;
	items: ISidebarItem[];
	hasBorder?: boolean;
}

export function SidebarMenu({ title, items, hasBorder }: ISidebarMenuProps) {
	const pathname = usePathname();

	return (
		<div className={clsx(hasBorder && 'border-b border-gray-600 mb-4')}>
			{title && <h2 className='text-xs opacity-50 uppercase'>{title}</h2>}
			<nav>
				<ul>
					{items.map(item => (
						<MenuItem
							key={item.label}
							item={item}
							isActiveLink={!!match(item.link)(pathname)}
						/>
					))}
				</ul>
			</nav>
		</div>
	);
}
