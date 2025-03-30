import { PUBLIC_PAGE } from "@/config/public-page.config"
import type { IPlaylist } from "@/types/playlists.types"
import Image from "next/image"
import Link from "next/link"

interface Props {
  playlist: IPlaylist
}

export function PlaylistItem({ playlist }: Props) {
  return (
    <li className="relative w-max">
      <Link
        href={PUBLIC_PAGE.PLAYLIST_PATH(playlist.id)}
      >
        <Image
          alt='playlist cover'
          src={playlist.videos[0]?.thumbnailUrl || '/playlist-cover.jpg'}
          width={300}
          height={135}
        />
      </Link>

      <p
        className="absolute bottom-2 left-2 px-1 py-1 text-xs rounded-md text-gray-200 bg-gray-800/50"
      >
        {playlist.videos.length} videos
      </p>
    </li>
  )
}
