import type { IFullVideo } from "@/types/video.types"
import Link from "next/link"
import Image from 'next/image'
import { PUBLIC_PAGE } from "@/config/public-page.config"
import { StudioVideoActions } from "./StudioVideoActions"

interface IStudioVideoItemProps {
  video: IFullVideo
}

export function StudioVideoItem({ video }: IStudioVideoItemProps) {
  
  return <li className="grid grid-cols-[.6fr_1.2fr_.3fr] py-3 border-b border-b-gray-700">
    <Link href={PUBLIC_PAGE.VIDEO(video.id)}>
      <Image
        alt="video thumbnailUrl"
        src={video.thumbnailUrl}
        width={200}
        height={120}
      />
    </Link>

    <div>
      <h3>{video.title}</h3>
      <p>{video.description}</p>
    </div>

    <StudioVideoActions video={video} />
  </li>
}
