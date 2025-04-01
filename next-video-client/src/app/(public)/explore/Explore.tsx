'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Compass } from 'lucide-react';
import { videoService } from '@/services/video.service';
import { VideoItem } from '@/ui/video-item/VideoItem';
import type { IVideo } from '@/types/video.types';
import { Title } from '@/ui/title/Title';
import { Skeleton } from '@/ui/skeleton/Skeleton';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useEffectScroll } from '@/hooks/useEffectScroll';

export default function Explore() {
	const { user } = useSelector((state: RootState) => state.auth);

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['explore videos'],
		queryFn: ({ pageParam }) => videoService.getExploreVideos(
			user?.id,
			{
				page: pageParam.page,
				limit: 10
			},
			pageParam.excludeIds
		),
		initialPageParam: { page: 1, excludeIds: [] as string[] },
		getNextPageParam: (lastPage, allPages) => {
			const { page, totalPages } = lastPage
			const allVideoIds = allPages.flatMap(page => page.videos.map(video => video.id))

			return page < totalPages ? { page: page + 1, excludeIds: allVideoIds } : undefined
		}
	});

	useEffectScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

	const allVideos = data?.pages.flatMap(page => page.videos) || [];

	return (
		<>
			<Title Icon={Compass}>Explore</Title>
			<ul className='grid grid-cols-5 gap-2'>
				{isLoading && !allVideos.length
					? (
						<Skeleton
							quantity={5}
							className='h-34 w-58'
						/>
					)
					: (
						allVideos.map((video: IVideo) => (
							<VideoItem
								key={video.title}
								video={video}
							/>
						))
					)}

				{isFetchingNextPage && (
					<Skeleton
						quantity={6}
						className='h-34 w-58'
					/>
				)}
			</ul>
		</>
	);
}
