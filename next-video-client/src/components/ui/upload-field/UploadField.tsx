import { useUpload } from "@/hooks/useUpload"
import Image from "next/image"
import { useId } from "react"
import type { FieldError } from "react-hook-form"

interface IUploadFieldProps {
  folder?: string
  value?: string
  label: string
  error?: FieldError
  className?: string
  isImage?: boolean
  aspectRation?: '16:9' | '1:1'
  onChange: (...event: unknown[]) => void
}

export function UploadField({
  folder,
  value,
  label,
  error,
  className,
  aspectRation = '1:1',
  onChange,
  isImage = true
}: IUploadFieldProps) {
  const { uploadFile, isLoading } = useUpload({ onChange, folder });
  const inputId = useId();

  const previewImageWidth = aspectRation === '16:9' ? 387 : 100;
  const previewImageHeight = aspectRation === '16:9' ? 217 : 100;

  return (
    <div className={className}>
      <label htmlFor={inputId}>
        <span className="block mb-2 text-gray-500 font-semibold">{label}</span>
      </label>

      <input
        id={inputId}
        type="file"
        onChange={uploadFile}
        accept="image/*"
        className="block w-full border border-gray-400 rounded-md cursor-pointer"
      />

      {error && <span className="block mt-1 text-red-600">{error.message}</span>}

      {isImage && (
        <div className="mt-3">
          {isLoading ? 'Loading...' : !!value &&
            <Image
              alt='preview uploaded image'
              src={value}
              width={previewImageWidth}
              height={previewImageHeight}
            />}
        </div>
      )}
    </div>
  )
}
