import { STUDIO_PAGE } from '@/config/studio-page.config';
import { Bell, LayoutGrid, PlusIcon } from 'lucide-react';
import Link from 'next/link';

export function HeaderLinks() {
	return (
		<div className='flex items-center gap-3'>
			<Link
				href={STUDIO_PAGE.UPLOAD_VIDEO}
				className='opacity-80 hover:opacity-100'
				title='upload video'
			>
				<PlusIcon size={16} />
			</Link>

			<Link
				href={STUDIO_PAGE.HOME}
				className='opacity-80 hover:opacity-100'
				title='studio page'
			>
				<LayoutGrid size={16} />
			</Link>

			<Link
				href={STUDIO_PAGE.HOME}
				className='opacity-80 hover:opacity-100'
				title='notifications'
			>
				<Bell size={16} />
			</Link>
		</div>
	);
}
