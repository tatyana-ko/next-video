import type { Dispatch, SetStateAction } from "react"

interface ICommentActionsProps {
  deleteComment: () => void
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

export function CommentActions({ deleteComment,isEditing, setIsEditing }: ICommentActionsProps) {

  return <div className="flex items-center gap-5">
    <button
      className="text-sm opacity-50 cursor-pointer"
      onClick={() => setIsEditing(!isEditing)}
    >
      Edit
    </button>

    <button
      className="text-sm opacity-50 cursor-pointer"
      onClick={() => deleteComment()}
    >
      Delete
    </button>
  </div>
}
