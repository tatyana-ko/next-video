'use client'

import type { IComment } from "@/types/comments.types"
import { transformDate } from "@/utils/transform-date"
import { transformUserInitials } from "@/utils/transform-user-initials"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { CommentActions } from "./CommentActions"
import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { useMutation } from "@tanstack/react-query"
import { commentService } from "@/services/comment.service"

interface ICommentItemProps {
  comment: IComment
  refetch: () => void
}

export function CommentItem({ comment, refetch }: ICommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState(comment.text);

  const { user } = useSelector((state: RootState) => state.auth);
  const isMyComment = user?.id === comment.user.id;

  const { mutate: deleteComment } = useMutation({
    mutationKey: ['delete comment'],
    mutationFn: () => commentService.deleteComment(comment.id),
    onSuccess: () => refetch()
  })

  const { mutate: updateComment } = useMutation({
    mutationKey: ['update comment'],
    mutationFn: () => commentService.updateComment(comment.id, { text: commentText, videoId: comment.videoId }),
    onSuccess: () => {
      refetch();
      setIsEditing(false);
    }
  })

  return (
    <li className="flex items-start gap-3">
      {comment.user.channel
        ? <Link href={comment.user.channel?.slug || ''} className="rounded-2xl border border-gray-600 h-16 w-16 flex-shrink-0">
          <Image
            alt="user avatar"
            src={comment.user.channel?.avatarUrl || '/default-avatar.png'}
            width={64}
            height={64}
          />
        </Link>
        : <div className="rounded-2xl border border-gray-600 h-16 w-16 flex-shrink-0 flex items-center justify-center">
          {transformUserInitials(comment.user.name)}
        </div>
      }

      <div>
        <div className="flex items-center gap-2">
          <h3>{comment.user.name}</h3>
          <span className="text-xs opacity-50">{transformDate(comment.createdAt)}</span>
        </div>

        {isEditing
          ? (<div className="flex flex-col gap-2 items-end my-2">
            <input
              type="text"
              className="border-b border-b-gray-500"
              value={commentText}
              onChange={e => {
                setCommentText(e.target.value);

              }}
            />
            <div className="flex gap-2">
              <button
                className="px-3 py-0.5 border border-gray-500 rounded-md"
                onClick={() => updateComment()}
              >
                Save
              </button>
              <button
                className="px-3 py-0.5 border border-gray-500 rounded-md"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>)
          : <p className="my-3 text-sm">{commentText}</p>
        }

        {isMyComment
          ? <CommentActions
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            deleteComment={deleteComment}
          />
          : <div className="flex items-center gap-5">
            <Heart size={14} />
            <span className="text-xs opacity-50">Reply</span>
          </div>
        }
      </div>
    </li>
  )
}
