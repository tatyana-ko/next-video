import type { Metadata } from 'next';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { SearchPage } from './SearchPage';
import { Suspense } from 'react';

export const metadata: Metadata = {
	...NO_INDEX_PAGE,
};

export default function Page() {
	return <Suspense>
		<SearchPage />
	</Suspense>;
}
