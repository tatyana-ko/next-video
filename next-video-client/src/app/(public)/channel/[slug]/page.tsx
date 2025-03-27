import Image from 'next/image';
import { Verified } from 'lucide-react';
// import dynamicNext from 'next/dynamic';
import { channelService } from "@/services/channel.service";
import type { TPageSlugProp } from "@/types/page.types";
import type { Metadata } from "next";
import { ChannelVideos } from "./ChannelVideos";
import { SubscribeButton } from '@/components/SubscribeButton';

// const DynamicSubscribeButton = dynamicNext(() => import('@/components/SubscribeButton').then((mod) => mod.SubscribeButton), {
// 	ssr: false})

export const dynamic = 'force-static';
export const revalidate = 1000;

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
	const { slug }  = await params;

	const data = await channelService.getChannelInfoBySlug(slug);
	const channel = data?.data;

	return {
		title: channel.slug,
		description: channel.description,
		openGraph: {
			type: 'profile',
			images: [channel.avatarUrl]
		}
	}
};

export async function generateStaticParams() {
	const { data } = await channelService.getAllChannels();

	return data.map(channel => ({
		slug: channel.slug
	}))
}

export default async function ChannelPage({ params}: TPageSlugProp) {
	const { slug }  = await params;

	const data = await channelService.getChannelInfoBySlug(slug);
	const channel = data?.data;

	return (
		<div className='w-[1200px] ml-auto mr-auto'>
			<div className='relative w-full h-[200px] overflow-hidden mb-4'>
				<Image
					alt='channel avatar'
					src={channel.bannerUrl || '/default-banner.webp'}
					fill
					style={{objectFit:"cover"}}
					priority
				/>
			</div>

			<div className='flex items-center gap-3 mb-10'>
				<Image
					alt='channel avatar'
					src={channel.avatarUrl || '/default-avatar.png'}
					width={105}
					height={105}
					className='rounded-full'
				/>

				<div>
					<div className='flex items-center gap-1.5'>
						<h3>{channel.slug}</h3>
						{channel.isVerified && <Verified size={15} color='green' />}
					</div>

					<div className='flex items-center gap-4'>
						<span className='text-xs opacity-45'>@{channel.slug}</span>
						<span className='text-xs opacity-45'>{channel.subscribers.length} subscribers</span>
						<span className='text-xs opacity-45'>{channel.videos.length} videos</span>
					</div>

					<p className='line-clamp-2 text-xs leading-[1.3]'>{channel.description}</p>

					<SubscribeButton slug={slug} />
				</div>
			</div>

			{!!channel.videos.length && <ChannelVideos videos={channel.videos} />}
		</div>
	);
}
