import dynamic from 'next/dynamic';
import { HeaderLinks } from './HeaderLinks';
import { SearchField } from './SearchField';
import { Skeleton } from '@/ui/skeleton/Skeleton';

const DynamicHeaderProfile = dynamic(() => import('./profile/HeaderProfile').then((mod) => mod.HeaderProfile), {
	ssr: false,
	loading: () => <Skeleton quantity={1} className='w-10 mb-0 rounded-full ' />,
})

export function Header() {
	return (
		<header className='flex items-center justify-between mb-4 border-b border-gray-500 p-2'>
			<SearchField />

			<div className='flex items-center gap-5'>
				<HeaderLinks />
				<DynamicHeaderProfile />
			</div>
		</header>
	);
}
