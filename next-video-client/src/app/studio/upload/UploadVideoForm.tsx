import { STUDIO_PAGE } from "@/config/studio-page.config"
import { studioVideoService } from "@/services/studio-video.service"
import type { IVideoFormData } from "@/types/studio.types"
import { Button } from "@/ui/button/Button"
import { Field } from "@/ui/field/Field"
import { Textarea } from "@/ui/textarea/Textarea"
import { UploadField } from "@/ui/upload-field/UploadField"
import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, type SubmitHandler, type UseFormReturn } from "react-hook-form"
import toast from "react-hot-toast"
import { SkeletonUploadForm } from "./SkeletonUploadForm"
import { TagsField } from "@/ui/tags-field/TagsField"

interface Props {
  form: UseFormReturn<IVideoFormData, unknown, undefined>
  isReadyToPublish: boolean
}

export function UploadVideoForm({
  form: { handleSubmit, register, formState: { errors }, watch, reset, control }, isReadyToPublish
}: Props) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ['create video'],
    mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
    onSuccess: () => {
      toast.success('Video uploaded successfully!');
      reset();
      router.push(STUDIO_PAGE.HOME)
    },
    onError: () => {
      toast.error('An error occurred while loading the video!');
    }
  })

  const handleSubmitVideoUploadForm: SubmitHandler<IVideoFormData> = (data) => {
    mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitVideoUploadForm)}
      className="w-full"
    >
      <div className='grid-cols-[2.5fr_1fr] grid gap-10'>
        {isPending
          ? <SkeletonUploadForm />
          : (
            <>
              <div>
                <Field
                  type="text"
                  label="Video title:"
                  placeholder="Name"
                  registration={register('title', { required: 'Title is required' })}
                  error={errors?.title?.message}
                />

                <Textarea
                  label="Description:"
                  placeholder="Write a description for your video..."
                  registration={register('description')}
                  error={errors?.description?.message}
                  rows={12}
                />

                <Controller
                  name="thumbnailUrl"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <UploadField
                      label="thumbnailUrl:"
                      value={value}
                      onChange={onChange}
                      error={error}
                      folder="thumbnails"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name='tags'
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TagsField
                      label='Tags:'
                      onTagsChange={onChange}
                      tags={value}
                      error={error?.message}
                    />
                  )}
                />
              </div>

              <div>
                {watch('thumbnailUrl')
                  ? <Image
                    alt="thumbnail url"
                    src={watch('thumbnailUrl')}
                    width={220}
                    height={140}
                    className="rounded-md"
                  />
                  : <div className="w-[220] h-[140] flex items-center justify-center text-sm bg-gray-600 rounded-md">Wait thumbnail...</div>
                }
                <div>
                  <span className="block text-xs text-gray-400">File name:</span>
                  <span>{watch('videoFileName')}</span>
                </div>
              </div>
            </>
          )
        }
      </div>

      <div className="flex items-center gap-3 mt-4">
        <Button
          type="submit"
          disabled={!isReadyToPublish}
        >
          {isReadyToPublish ? 'Publish' : 'Wait processing...'}
        </Button>

        <Button type="button">
          <Link href={STUDIO_PAGE.HOME}>
            Cancel
          </Link>
        </Button>
      </div>

    </form>
  )
}
