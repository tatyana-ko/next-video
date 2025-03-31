import { useUpload } from "@/hooks/useUpload"
import type { IVideoFormData } from "@/types/studio.types"
import { Upload } from "lucide-react"
import { useState, type ChangeEvent, type DragEventHandler } from "react"
import type { UseFormReset } from "react-hook-form"
import toast from "react-hot-toast"
import { twMerge } from "tailwind-merge"

interface Props {
  reset: UseFormReset<IVideoFormData>
}

export function DragNDropVideo({ reset }: Props) {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const { uploadFile, isLoading: isUploading } = useUpload({
    onSuccess(data) {
      const file = data[0]

      if (!file) return;

      reset({
        videoFileName: file.name,
        maxResolution: file.maxResolution,
        title: file.name
      })
      toast.success('File uploaded successfuly!')
    },
    onError() {
      toast.error('Something get wrong')
    },
    maxFileSize: 3 * 1024 * 1024 * 1024,
    folder: 'videos'
  });

  const handleDragOver: DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop: DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      uploadFile({ target: { files: [file] } } as unknown as ChangeEvent<HTMLInputElement>)
    }
  };

  return (
    isUploading
      ? <div>Uploading...</div>
      : (
        <label
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={twMerge('flex flex-col items-center justify-center gap-5 px-10 py-8 w-full border border-dashed rounded-xl',
            isDragging ? 'bg-gray-600 border-green-500' : 'hover:bg-gray-600'
          )}
        >
          <Upload size={30} />
          <span>
            {isDragging ? 'Drop here' : 'Please select a video-file and drag it here!'}
          </span>
          <input
            type="file"
            className="hidden"
            accept=""
            onChange={uploadFile}
          />

        </label>
      )
  )
}
