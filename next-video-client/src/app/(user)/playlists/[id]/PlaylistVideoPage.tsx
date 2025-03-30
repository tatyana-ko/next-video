'use client'

import { playlistsService } from "@/services/playlists.service";
import { Skeleton } from "@/ui/skeleton/Skeleton";
import { VideoItem } from "@/ui/video-item/VideoItem";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

export function PlaylistVideoPage() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['user playlist'],
    queryFn: () => playlistsService.getVideosFromPlaylist(id as string),
    enabled: !!id
  })

  return <div>
    <h2>{data?.data?.title}</h2>

    {isLoading && <Skeleton quantity={10} className='h-34 w-58' />}

    {data?.data &&
      <ul className="flex flex-col gap-5 w-max">
        {data?.data?.videos.map(video => <VideoItem key={video.id} video={video} />)}
      </ul>
    }
  </div>
}
