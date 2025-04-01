'use client'

import { STUDIO_PAGE } from "@/config/studio-page.config"
import { studioVideoService } from "@/services/studio-video.service"
import type { IFullVideo } from "@/types/video.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import toast, { type Toast } from "react-hot-toast"

interface IStudioVideoActionsProps {
  video: IFullVideo
}

export function StudioVideoActions({ video }: IStudioVideoActionsProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteVideo, isPending } = useMutation({
    mutationKey: ['delete video'],
    mutationFn: () => studioVideoService.delete(video.id),
    onError: () => {
      toast.error('Something went wrong. Please try again later!')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['studioVideoList']
      });
      toast.success('Video successfully deleted!')
    }
  })

  const handleDeleteVideo = () => {
    toast((t: Toast) => (
      <div>
        <p>Are you sure you want to delete this video?</p>
        <div className='flex justify-end gap-4 mt-2'>
          <button
            onClick={() => {
              deleteVideo()
              toast.dismiss(t.id)
            }}
            className='text-red-600'
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className='text-gray-400'
          >
            Cancel
          </button>
        </div>
      </div>
    ))
  }

  return (
    <div className="flex items-start gap-3">
      <Link href={STUDIO_PAGE.EDIT_VIDEO(video.id)}>
        <Edit className="opacity-75 hover:opacity-100 cursor-pointer" size={20} />
      </Link>

      <button
        type="button"
        onClick={handleDeleteVideo}
        disabled={isPending}
        className="opacity-75 hover:opacity-100"
      >
        <Trash2 className="cursor-pointer" size={20} />
      </button>
    </div>
  )
}
