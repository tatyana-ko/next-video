'use client';

import { useQuery } from '@tanstack/react-query';
import { videoService } from '@/services/video.service';
import { VideoItem } from '@/ui/video-item/VideoItem';
import type { IVideo } from '@/types/video.types';
import { Title } from '@/ui/title/Title';
import { Skeleton } from '@/ui/skeleton/Skeleton';

export default function Explore() {
	const { isPending, data } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos(),
	});

	return (
		<>
			<Title>Explore</Title>
			<ul className='grid grid-cols-5 gap-2'>
				{isPending ? (
					<Skeleton
						quantity={10}
						className='h-34 w-58'
					/>
				) : (
					data?.data &&
					data?.data?.videos.map((video: IVideo) => (
						<VideoItem
							key={video.title}
							video={video}
						/>
					))
				)}
			</ul>
		</>
	);
}
