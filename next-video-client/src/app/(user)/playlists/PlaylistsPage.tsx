'use client'

import { playlistsService } from "@/services/playlists.service"
import { useQuery } from "@tanstack/react-query"
import { PlaylistItem } from "./PlaylistItem";
import { Skeleton } from "@/ui/skeleton/Skeleton";
import { useState } from "react";
import { CreatePlaylist } from "./CreatePlaylist";

export function PlaylistsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['playlists'],
    queryFn: () => playlistsService.getAllUserPlaylists()
  })

  return <div>
    <h2
      className="mb-3 text-xl"
    >
      My playlists:
    </h2>

    <button
      className="mb-3 px-2 py-1 border border-gray-600 rounded-md cursor-pointer"
      onClick={() => setIsModalOpen(true)}
    >
      Add new playlist
    </button>

    {isLoading
      ? <Skeleton quantity={5} />
      : <ul className="flex flex-col flex-wrap gap-10">
        {data?.data?.length
          ? data?.data?.map(playlist => <PlaylistItem key={playlist.id} playlist={playlist} />)
          : <h3>Sorry, you do not have any playlists!</h3>
        }
      </ul>
    }

    {isModalOpen && <CreatePlaylist refetch={refetch} setIsModalOpen={setIsModalOpen} />}
  </div>
}
