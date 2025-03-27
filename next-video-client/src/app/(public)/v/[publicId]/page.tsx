import { videoService } from "@/services/video.service";
import type { TPagePublicId } from "@/types/page.types";
import type { Metadata } from "next";
import type { IVideo } from '@/types/video.types';
import { stripHtml } from '@/utils/strip-html';
import { VideoPage } from './VideoPage';

export const dynamic = 'force-static';
export const revalidate = 1000;

export async function generateMetadata({ params }: TPagePublicId): Promise<Metadata> {
  const { publicId } = await params;

  const data = await videoService.getVideoByPublicId(publicId);
  const video = data?.data;

  return {
    title: video.title,
    description: stripHtml(video.description).slice(0, 150),
    openGraph: {
      type: 'video.other',
      images: [video.thumbnailUrl]
    }
  }
};

export async function generateStaticParams() {
  const { data } = await videoService.searchVideos(null)

  return data?.videos.map((video: IVideo) => ({
    publicId: video.publicId
  }))
}

export default async function Page({ params }: TPagePublicId) {
  const { publicId } = await params;

  const data = await videoService.getVideoByPublicId(publicId);
  const video = data?.data;

  return (
    <VideoPage video={video}/>
  );
}