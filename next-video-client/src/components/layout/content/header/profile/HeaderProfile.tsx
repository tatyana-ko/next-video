import Link from 'next/link';
import Image from 'next/image';
import { STUDIO_PAGE } from '@/config/studio-page.config';
import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { LogIn } from 'lucide-react';
import { PUBLIC_PAGE } from '@/config/public-page.config';

export function HeaderProfile() {
	const { isLoggedIn } = useSelector((state: RootState) => state.auth)

	return (
		<div>
			{isLoggedIn
				? <Link href={STUDIO_PAGE.HOME}>
					<Image
						src='/default-avatar.png'
						alt='profile avatar'
						width={40}
						height={40}
						className='border border-gray-200 rounded-full'
					/>
				</Link>
				: (<Link href={PUBLIC_PAGE.AUTH}>
					<LogIn />
				</Link>)
			}
		</div>
	);
}
