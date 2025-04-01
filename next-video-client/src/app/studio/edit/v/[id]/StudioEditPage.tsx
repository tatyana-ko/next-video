'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { STUDIO_PAGE } from "@/config/studio-page.config";
import { studioVideoService } from "@/services/studio-video.service";
import type { IVideoFormData } from "@/types/studio.types";
import { SkeletonUploadForm } from "@/app/studio/upload/SkeletonUploadForm";
import { Field } from "@/ui/field/Field";
import { Textarea } from "@/ui/textarea/Textarea";
import { UploadField } from "@/ui/upload-field/UploadField";
import { TagsField } from "@/ui/tags-field/TagsField";
import Image from "next/image";
import { Button } from "@/ui/button/Button";

export function StudioEditPage() {
  const { id } = useParams();
  const { handleSubmit, watch, formState: { errors }, reset, register, control } = useForm<IVideoFormData>({
		mode: 'onChange'
	});
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isSuccess, data, isLoading: isLoadingVideo } = useQuery({
    queryKey: ['get a video', id],
    queryFn: () => studioVideoService.byId(id as string)
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['edit a video'],
    mutationFn: (data: IVideoFormData) => studioVideoService.update(id as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['studioVideoList']
      });
      toast.success("Video successfully updated");
      router.push(STUDIO_PAGE.HOME)
    },
    onError: () => {
      toast.error('An error has occurred. Please try again later!')
    }
  });

  useEffect(() => {
    if (!isSuccess) return;

    const video = data?.data;

    reset({
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      maxResolution: video.maxResolution,
      tags: !!video.tags && video.tags?.map(tag => tag.name),
      videoFileName: video.videoFileName,
    });
  }, [data?.data, isSuccess, reset]);

  const handleSubmitVideoUpdateForm: SubmitHandler<IVideoFormData> = (data) => {
    mutate(data)
  }

  return <div>
    <form
      onSubmit={handleSubmit(handleSubmitVideoUpdateForm)}
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
                      label="Video intro:"
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

      <Button
        type="submit"
        disabled={isLoadingVideo}
      >
        Update
      </Button>

    </form>
  </div>
}
