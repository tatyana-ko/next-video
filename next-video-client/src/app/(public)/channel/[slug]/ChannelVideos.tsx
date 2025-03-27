import type { IChannel } from "@/types/channel.types"
import type { IVideo } from "@/types/video.types"
import { Skeleton } from "@/ui/skeleton/Skeleton"
import { Title } from "@/ui/title/Title"
import { VideoItem } from "@/ui/video-item/VideoItem"
import { Video } from "lucide-react"

interface IChannelVideosProps {
  videos: IChannel['videos']
}

export function ChannelVideos({ videos }: IChannelVideosProps) {
  return <div>
    <Title Icon={Video}>Channel`s Videos</Title>
    <ul className='grid grid-cols-5 gap-2'>
      {videos ? (
        videos.map((video: IVideo) => (
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
  </div>
}
