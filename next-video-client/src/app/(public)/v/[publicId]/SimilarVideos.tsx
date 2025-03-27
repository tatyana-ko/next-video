import type { IVideo, IVideoResponse } from "@/types/video.types"
import { VideoItem } from "@/ui/video-item/VideoItem"

interface IChannelVideosProps {
  videos: IVideoResponse['similarVideos']
}

export function SimilarVideos({ videos }: IChannelVideosProps) {
  return <ul className='grid grid-cols-1 gap-6'>
    {videos.map((video: IVideo) => (
      <VideoItem
        key={video.title}
        video={video}
      />
    ))}
  </ul>
}