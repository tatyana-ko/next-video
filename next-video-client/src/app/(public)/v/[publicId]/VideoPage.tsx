'use client'

import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import type {  IVideoResponse } from '@/types/video.types';
import { SimilarVideos } from './SimilarVideos';
import { SubscribeButton } from '@/components/SubscribeButton';
import Link from 'next/link';
import { PUBLIC_PAGE } from '@/config/public-page.config';
import { VideoDescription } from './description/VideoDescription';
import VideoActions from './video-actions/VideoActions';
import { VideoPlayer } from '@/ui/video-player/VideoPlayer';
import { Comments } from './comments/Comments';

export function VideoPage({ video }: {video: IVideoResponse}) {
  
  return (
    <section className='grid grid-cols-[2.7fr_1fr] gap-10'>
      <div>
        <VideoPlayer
          fileName={video.videoFileName}
          maxResolution={video.maxResolution}
        />

        <div className='flex items-start justify-between pb-3 mb-3 border-b border-gray-600'>
          <div>
            <h2 className='text-xl'>{video.title}</h2>
            <p className='text-sm opacity-50'>{video.viewsCount.toLocaleString()} views</p>
          </div>

          <VideoActions video={video} likes={video?.likes.length} />
        </div>

        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-2'>
            <Link href={PUBLIC_PAGE.CHANNEL(video.channel.slug)}>
              <Image
                alt='avatar url'
                src={video.channel.avatarUrl}
                width={40}
                height={40}
                className='rounded-md'
              />
            </Link>
            <div>
              <Link href={PUBLIC_PAGE.CHANNEL(video.channel.slug)}>
                <h3>{video.channel.user.name} {video.channel.isVerified && <BadgeCheck size={12} color='green' className='inline' />}</h3>
              </Link>
              <p className='text-xs opacity-50'>{video.channel.subscribers.length} subscribers</p>
            </div>
          </div>

          <SubscribeButton slug={video.channel.slug} />
        </div>

        <VideoDescription description={video.description} />

        <Comments video={video}/>
      </div>

      {!!video.similarVideos.length && <SimilarVideos videos={video.similarVideos} />}
    </section>
  );
}