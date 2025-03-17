'use client'

import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { videoService } from "@/services/video.service"
import { Title } from "@/ui/title/Title"
import { Skeleton } from "@/ui/skeleton/Skeleton"
import type { IVideo } from "@/types/video.types"
import { VideoItem } from "@/ui/video-item/VideoItem"

export function SearchPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('term')

  const { isPending, data } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: () => videoService.searchVideos(searchTerm)
  })

  return (
    <section>
      <Title>Search results </Title>

      <ul className='grid grid-cols-5 gap-5'>
        {isPending ? (
          <Skeleton quantity={5} className='h-52 rounded-md' />
        ) : (
          data?.data.videos.map((video: IVideo) => <VideoItem key={video.id} video={video} />)
        )}
      </ul>
    </section>
  )
}
