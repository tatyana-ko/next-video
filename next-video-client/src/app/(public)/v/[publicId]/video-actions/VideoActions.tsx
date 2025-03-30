'use client'

import { useProfile } from "@/hooks/useProfile";
import { playlistsService } from "@/services/playlists.service";
import { userService } from "@/services/user.service";
import type { IVideoResponse } from "@/types/video.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FolderHeart, Heart } from "lucide-react";
import { startTransition, useEffect, useState } from "react";

export default function VideoActions({ video, likes }: { video: IVideoResponse, likes: number }) {
  const { profile, refetch } = useProfile();
  const hasLike = profile?.likes.some(like => like.videoId === video.id);

  const [optimisticLikes, setOptimisticLikes] = useState(likes);
  const [isLiked, setIsLiked] = useState(hasLike);

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

  const {data} = useQuery({
    queryKey: ['playlists'],
    queryFn: () => playlistsService.getAllUserPlaylists()
  })

  const {mutate: toggleVideoInPlaylist, isPending} = useMutation({
    mutationKey: ['toggle video in playlist'],
    mutationFn: (playlistId: string) => playlistsService.toggleVideoOnPlaylist(playlistId, video.id),

  })


  return (
    <div className='flex items-center gap-5'>
      <button className='flex items-center gap-1 cursor-pointer'>
        <FolderHeart size={14} /> Save
      </button>
      <button
        className='flex items-center gap-1 cursor-pointer'
        onClick={() => mutateAsync()}
      >
        <Heart size={14} color='red' />
        {optimisticLikes}
      </button>
    </div>
  )
}
