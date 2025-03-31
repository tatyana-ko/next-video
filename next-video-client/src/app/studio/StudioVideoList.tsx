'use client'

import { studioVideoService } from "@/services/studio-video.service"
import { Skeleton } from "@/ui/skeleton/Skeleton";
import { StudioVideoItem } from "@/ui/video-item/StudioVideoItem";
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect } from "react";

export function StudioVideoList() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['studioVideoList'],
    queryFn: ({ pageParam }) => studioVideoService.getAll({
      page: pageParam.page,
      limit: 5
    }),
    initialPageParam: { page: 1 },
    getNextPageParam: lastPage => {
      const { page, totalPages } = lastPage;

      return page < totalPages ? { page: page + 1 } : undefined
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight * 0.99 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allVideos = data?.pages.flatMap(page => page.videos) || []

  return (
    <div>
      <ul>
        {isLoading && !allVideos.length
          ? <Skeleton quantity={3} className="h-[140]"/>
          : allVideos.map(video => <StudioVideoItem key={video.publicId} video={video} />)
          }
      </ul>
    </div>
  )
}
