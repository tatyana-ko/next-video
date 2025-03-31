'use client'

import { playlistsService } from "@/services/playlists.service"
import { useQuery } from "@tanstack/react-query"
import { PlaylistItem } from "./PlaylistItem";
import { Skeleton } from "@/ui/skeleton/Skeleton";
import { useState } from "react";
import { CreatePlaylist } from "./CreatePlaylist";
import { Button } from "@/ui/button/Button";

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

    <Button
      className="mb-3"
      onClick={() => setIsModalOpen(true)}
    >
      Add new playlist
    </Button>

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
