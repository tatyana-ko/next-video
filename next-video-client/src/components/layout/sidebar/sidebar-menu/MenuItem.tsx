import type { ISidebarItem } from '@/types/sidebar-data.types';
import clsx from 'clsx';
import Link from 'next/link';

interface IMenuItemProps {
	item: ISidebarItem;
	isActiveLink: boolean;
}

export function MenuItem({ item, isActiveLink }: IMenuItemProps) {
	return (
		<li className='py-3'>
			<Link
				href={item.link}
				className='flex items-center gap-4'
			>
				<item.icon size={20} />
				<span className={clsx({ 'border-b border-gray-300': isActiveLink })}>{item.label}</span>
			</Link>
		</li>
	);
}
