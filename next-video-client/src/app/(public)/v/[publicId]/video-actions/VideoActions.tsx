'use client'

import { useProfile } from "@/hooks/useProfile";
import { playlistsService } from "@/services/playlists.service";
import { userService } from "@/services/user.service";
import type { IVideoResponse } from "@/types/video.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FolderHeart, Heart, X } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VideoActions({ video, likes }: { video: IVideoResponse, likes: number }) {
  const { profile, refetch } = useProfile();
  const hasLike = profile?.likes.some(like => like.video.id === video.id);

  const [optimisticLikes, setOptimisticLikes] = useState(likes);
  const [isLiked, setIsLiked] = useState(hasLike);
  const [isPlaylistsShown, setIsPlaylistsShown] = useState(false);

  useEffect(() => {
    setIsLiked(hasLike)
  }, [hasLike])

  const { mutateAsync } = useMutation({
    mutationKey: ['like'],
    mutationFn: () => userService.toggleLikesOnVideo(video.id),
    onMutate: () => {
      startTransition(() => {
        setOptimisticLikes(prev => (isLiked ? prev - 1 : prev + 1))
      })
    },
    onSuccess: () => {
      refetch()
    }
  });

  const { data: allUserPlaylists, refetch: refetchPlaylists } = useQuery({
    queryKey: ['playlists'],
    queryFn: () => playlistsService.getAllUserPlaylists()
  })

  const { mutate: toggleVideoInPlaylist } = useMutation({
    mutationKey: ['toggle video in playlist'],
    mutationFn: (playlistId: string) => playlistsService.toggleVideoOnPlaylist(playlistId, video.id),
    onSuccess: () => {
      setIsPlaylistsShown(false);
      refetchPlaylists();
      toast.success('Video added to playlist!')
    },
    onError: () => {
      toast.error('Something went wrong. Please try again later!')
    }
  })

  return (
    <>
      <div className='flex items-center gap-5'>
        <button
          onClick={() => setIsPlaylistsShown(!isPlaylistsShown)}
          className='flex items-center gap-1 cursor-pointer'
        >
          <FolderHeart size={14} /> Save
        </button>
        <button
          className='flex items-center gap-1 cursor-pointer'
          onClick={() => mutateAsync()}
        >
          <Heart size={14} color='red' fill={isLiked ? 'red' : 'transparent'} />
          {optimisticLikes}
        </button>
      </div>

      {isPlaylistsShown &&
        <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center bg-gray-800/80">
          <div className="relative">
            <button
              onClick={() => setIsPlaylistsShown(false)}
              className="absolute right-4 top-2 cursor-pointer"
            >
              <X color="black" />
            </button>
            <ul className="flex flex-col items-center justify-center w-[400px] h-[160px] bg-white rounded-2xl">
              {allUserPlaylists?.data?.map(playlist => (
                <li key={playlist.id}>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      onChange={() => toggleVideoInPlaylist(playlist.id)}
                    />
                    <span className="text-gray-800">{playlist.title}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    </>
  )
}
