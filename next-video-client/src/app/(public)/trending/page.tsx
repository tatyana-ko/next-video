import { PUBLIC_PAGE } from '@/config/public-page.config';
import { videoService } from '@/services/video.service';
import type { IVideo } from '@/types/video.types';
import { Skeleton } from '@/ui/skeleton/Skeleton';
import { Title } from '@/ui/title/Title';
import { VideoItem } from '@/ui/video-item/VideoItem';
import { Flame } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Trending',
	description: 'Trending videos',
	alternates: {
		canonical: PUBLIC_PAGE.TRENDING,
	},
};

export default async function TrendingPage() {
	const data = await videoService.getTrendingVideos();

	return (
		<>
			<Title Icon={Flame}>Trending Videos</Title>
			<ul className='grid grid-cols-5 gap-2'>
				{data?.data ? (
					data?.data.map((video: IVideo) => (
						<VideoItem
							key={video.title}
							video={video}
						/>
					))
				) : (
					<Skeleton
						quantity={10}
						className='h-34 w-58'
					/>
				)}
			</ul>
		</>
	);
}
