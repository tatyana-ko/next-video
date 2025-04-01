import type { ISidebarItem } from '@/types/sidebar-data.types';
import clsx from 'clsx';
import Link from 'next/link';

interface IMenuItemProps {
	item: ISidebarItem;
	isActiveLink: boolean;
	isSidebarOpen: boolean;
}

export function MenuItem({ item, isActiveLink, isSidebarOpen }: IMenuItemProps) {

	return (
		<li className='py-3'>
			<Link
				href={item.link}
				className='flex items-center gap-4'
				title={item.label}
				aria-label={`open ${item.label} page`}
			>
				<item.icon size={24} className={clsx('min-w-6', { 'text-[#cc4104]': isActiveLink && !isSidebarOpen })} />
				<span className={clsx({ 'border-b border-gray-300': isActiveLink })}>{item.label}</span>
			</Link>
		</li>
	);
}
