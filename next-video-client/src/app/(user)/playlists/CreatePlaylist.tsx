import { playlistsService } from "@/services/playlists.service"
import type { IPlaylistData } from "@/types/playlists.types"
import { Button } from "@/ui/button/Button"
import { Field } from "@/ui/field/Field"
import { useMutation } from "@tanstack/react-query"
import type { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface Props {
  refetch: () => void
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export function CreatePlaylist({ refetch, setIsModalOpen }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IPlaylistData>({
    mode: 'onChange'
  });

  const { mutate: addNewPlaylist } = useMutation({
    mutationKey: ['create a playlist'],
    mutationFn: (data: IPlaylistData) => playlistsService.addNewPlaylist(data),
    onSuccess: () => {
      toast.success('You have created a new playlist!')

      setIsModalOpen(false);
      refetch();
      reset();
    },
    onError: () => {
      toast.error('Something went wrong. Please try again later.')
    }
  });

  const handleSubmitForm = (data) => {
    addNewPlaylist({
      title: data.title,
      videoPublicId: '-coThuQCc1'
    });
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800/80">
      <div className="flex flex-col items-center justify-center w-[400px] h-[160px] bg-inherit rounded-2xl border border-gray-400">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Field
            type="text"
            label="Playlist title:"
            placeholder="My playlist"
            registration={register('title', { required: 'Title is required' })}
            error={errors?.title?.message}
          />

          <div className="mt-3 flex items-center gap-3">
            <Button>Create Playlist</Button>

            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
