'use client'

import { useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic"
import { commentService } from "@/services/comment.service"
import type { IVideoResponse } from "@/types/video.types"
  import { Skeleton } from "@/ui/skeleton/Skeleton"

const DynamicAddCommentForm = dynamic(() => import('./AddCommentForm').then((mod) => mod.AddCommentForm), {
  ssr: false
})

const DynamicCommentItem = dynamic(() => import('./CommentItem').then((mod) => mod.CommentItem), {
  ssr: false
})

interface ICommentsProps {
  video: IVideoResponse
}

export function Comments({ video }: ICommentsProps) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['comments', video.id],
    queryFn: () => commentService.getCommentsByVideoId(video.publicId),
    initialData: video.comments,
  })

  return (
    <>
      <DynamicAddCommentForm
        videoId={video.id}
        refetch={refetch}
      />
      {isLoading
        ? <Skeleton
          quantity={10}
          className='h-34 w-full'
        />
        : <ul className="border-t border-t-gray-600 pt-5 flex flex-col gap-7">
          {!!data && data.map(comment => <DynamicCommentItem key={comment.id} comment={comment} refetch={refetch} />)}
        </ul>
      }
    </>
  )
}
