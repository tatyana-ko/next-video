import Link from 'next/link';
import Image from 'next/image';
import { STUDIO_PAGE } from '@/config/studio-page.config';

export function HeaderProfile() {
	return (
		<div>
			<Link href={STUDIO_PAGE.HOME}>
				<Image
					src='/default-avatar.png'
					alt='profile avatar'
					width={40}
					height={40}
					className='border border-gray-200 rounded-full'
				/>
			</Link>
		</div>
	);
}
