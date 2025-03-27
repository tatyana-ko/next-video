import Link from 'next/link';
import Image from 'next/image';
import type { IVideo } from '@/types/video.types';
import { PUBLIC_PAGE } from '@/config/public-page.config';
import { BadgeCheck, type LucideIcon } from 'lucide-react';
import { transformViews } from '@/utils/transform-views';
import { transformDate } from '@/utils/transform-date';

interface IVideoItemProps {
	video: IVideo;
	Icon?: LucideIcon;
}

export function VideoItem({ video, Icon }: IVideoItemProps) {
	return (
		<li>
			<div className='relative mb-2'>
				<Link href={PUBLIC_PAGE.VIDEO(video.publicId)}>
					<Image
						src={video.thumbnailUrl}
						alt={video.title}
						width={230}
						height={140}
						priority={true}
						className='rounded-md w-full'
					/>
				</Link>

				<Link href={PUBLIC_PAGE.CHANNEL(video.channel.slug)}>
					<Image
						src={video.channel.avatarUrl}
						alt={video.channel.id}
						width={25}
						height={25}
						className='absolute bottom-1 left-1 rounded-full'
					/>
				</Link>
			</div>

			<div className='flex items-center justify-between mb-1'>
				<div className='flex items-center justify-between'>
					{Icon && <Icon />}
					<span className='text-xs opacity-45'>{transformViews(video.viewsCount)}</span>
				</div>
				<span className='text-xs opacity-45'>{transformDate(video.createdAt)}</span>
			</div>

			<Link href={PUBLIC_PAGE.VIDEO(video.publicId)}>
				<h3 className='line-clamp-2 text-sm leading-[1.3]'>{video.title}</h3>
			</Link>

			<Link
				href={PUBLIC_PAGE.CHANNEL(video.channel.slug)}
				className='flex items-center gap-1 mt-1'
			>
				<span className='text-xs opacity-75'>{video.channel.slug}</span>
				{video.channel.isVerified && (
					<BadgeCheck
						color='green'
						size={14}
					/>
				)}
			</Link>
		</li>
	);
}
