'use client'

import { commentService } from "@/services/comment.service";
import type { RootState } from "@/store";
import type { ICommentData } from "@/types/comments.types"
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form"
import { useSelector } from "react-redux";

interface IAddCommentFormProps {
  videoId: string
  refetch: () => void
}

export function AddCommentForm({ videoId, refetch }: IAddCommentFormProps) {  
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, reset } = useForm<ICommentData>({
    mode: 'onChange'
  });

  const { mutate } = useMutation({
    mutationKey: ['add comment'],
    mutationFn: (data: ICommentData) => commentService.addComment(data),
    onSuccess: () => {
      reset();
      refetch();
    }
  });

  const onSubmitCommentForm: SubmitHandler<ICommentData> = ({ text }: { text: string }) => {
    if (text.trim() === '') return;

    mutate({
      text,
      videoId
    })
  };

  if(!isLoggedIn) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmitCommentForm)}
      className="my-7 flex flex-col gap-2 items-end"
    >
      <input
        type="text"
        {...register('text')}
        placeholder="Add comment..."
        className="w-full border-b border-b-gray-500"
      />
      <button
        type="submit"
        className="px-3 py-1 rounded-md border border-gray-500"
      >
        Save
      </button>
    </form>
  )
}
