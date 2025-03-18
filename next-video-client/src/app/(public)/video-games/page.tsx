import { PUBLIC_PAGE } from '@/config/public-page.config';
import { videoService } from '@/services/video.service';
import type { IVideo } from '@/types/video.types';
import { Skeleton } from '@/ui/skeleton/Skeleton';
import { Title } from '@/ui/title/Title';
import { VideoItem } from '@/ui/video-item/VideoItem';
import { Gamepad2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Games videos',
  description: 'Games videos',
  alternates: {
    canonical: PUBLIC_PAGE.VIDEO_GAMES,
  },
};

export default async function GamesVideoPage() {
  const data = await videoService.getVideosAboutGames();

  return (
    <>
      <Title Icon={Gamepad2}>Games Videos</Title>
      <ul className='grid grid-cols-5 gap-2'>
        {data?.data ? (
          data?.data.videos.map((video: IVideo) => (
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

