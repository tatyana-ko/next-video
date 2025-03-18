import { videoService } from '@/services/video.service';
import Explore from './explore/Explore';
import { VideoItem } from '@/ui/video-item/VideoItem';
import type { IVideo } from '@/types/video.types';
import type { Metadata } from 'next';
import { Title } from '@/ui/title/Title';
import { Flame } from 'lucide-react';

export const dynamic = 'force-static';
export const revalidate = 1000;

export const metadata: Metadata = {
	title: 'Home',
	description: 'Video viewing platform',
	alternates: {
		canonical: '/',
	},
	openGraph: {
		type: 'website',
	},
};

export default async function Home() {
	const data = await videoService.getTrendingVideos();

	console.log('revalidate');

	return (
		<div>
			<>
				<Title Icon={Flame}>Trending</Title>
				<ul className='grid grid-cols-5 gap-2'>
					{data?.data &&
						data?.data?.map((video: IVideo) => (
							<VideoItem
								key={video.title}
								video={video}
							/>
						))}
				</ul>
			</>

			<Explore />
		</div>
	);
}
