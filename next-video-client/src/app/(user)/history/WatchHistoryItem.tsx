import type { IVideoResponse } from "@/types/video.types"
import Link from "next/link"
import Image from "next/image"
import { PUBLIC_PAGE } from "@/config/public-page.config"
import { transformViews } from "@/utils/transform-views"
import { transformDate } from "@/utils/transform-date"

interface IWatchHistoryItemProps {
  video: IVideoResponse
}

export function WatchHistoryItem({ video }: IWatchHistoryItemProps) {
  return (
    <li className="flex items-start gap-5">
      <Link href={PUBLIC_PAGE.VIDEO(video.publicId)} className="flex-shrink-0">
        <Image
          alt='video cover'
          src={video.thumbnailUrl}
          width={200}
          height={100}
          className=" rounded-md"
        />
      </Link>

      <div>
        <h3 className="mb-4">{video.title}</h3>

        <div className="flex flex-col">
          <span className="text-sm opacity-50">{transformViews(video.viewsCount)}</span>
          <span className="text-xs opacity-50">{transformDate(video.createdAt)}</span>
        </div>
      </div>
    </li>
  )
}
