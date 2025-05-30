import Link from 'next/link';
import { PUBLIC_PAGE } from '@/config/public-page.config';
import { AlignJustify, ChevronRight } from 'lucide-react';

interface ISidebarHeaderProps {
	toggleSidebar: () => void;
}

export function SidebarHeader({ toggleSidebar }: ISidebarHeaderProps) {
	return (
		<div className='flex items-center justify-between mb-5'>
			<button
				className='cursor-pointer'
				onClick={toggleSidebar}
				aria-label='Sidebar switcher'
				title='Sidebar switcher'
			>
				<AlignJustify />
			</button>
			<Link
				href={PUBLIC_PAGE.HOME_PAGE}
				aria-label='Open home page'
				title='Home'
			>
				<div className='flex items-center relative'>
					<ChevronRight
						color='red'
						size={26}
						className='absolute left-[-18px]'
					/>
					<span className='font-semibold uppercase'>ideo</span>
				</div>
			</Link>
		</div>
	);
}
