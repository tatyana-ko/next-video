'use client';

import { Title } from '@/ui/title/Title';
import { Skeleton } from '@/ui/skeleton/Skeleton';
import type { IVideo } from '@/types/video.types';
import { VideoItem } from '@/ui/video-item/VideoItem';
import { useProfile } from '@/hooks/useProfile';

export function SubscriptionPage() {
  const { profile, isLoading } = useProfile();

  return (
    <section>
      <Title>Videos: </Title>
      
      {isLoading
        ? (<ul className='grid grid-cols-5 gap-5'>
          <Skeleton
            quantity={5}
            className='h-52 rounded-md'
          />
        </ul>
        )
        : (profile?.subscribedVideos?.length === 0
          ? <p>You have not subscribed to anyone yet.</p>
          : <ul className='grid grid-cols-5 gap-5'>
            {profile?.subscribedVideos?.map((video: IVideo) => (
              <VideoItem
                key={video.id}
                video={video}
              />
            ))}
          </ul>
        )}
    </section>
  );
}
