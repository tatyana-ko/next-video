'use client'

import { useSettings } from "@/hooks/useSettings"
import { Button } from "@/ui/button/Button";
import { Field } from "@/ui/field/Field";
import { Textarea } from "@/ui/textarea/Textarea";
import { UploadField } from "@/ui/upload-field/UploadField";
import { Controller } from "react-hook-form";

export function SettingsForm() {
  const {
    onSubmitSettings,
    form: { register, handleSubmit, formState: { errors }, control },
    isPending } = useSettings();

  return <div>
    <form onSubmit={handleSubmit(onSubmitSettings)} >
      <div className="grid grid-cols-2 gap-5">
        <div>
          <Field
            type='email'
            placeholder="example@gmail.com"
            label="Email:"
            registration={register('email', { required: "Field is required", maxLength: 15 })}
            error={errors.email?.message}
          />

          <Field
            type='text'
            placeholder="name"
            label="Name:"
            registration={register('name')}
            error={errors.name?.message}
          />

          <Field
            type='password'
            placeholder="Password"
            label="Password:"
            registration={register('password')}
            error={errors.password?.message}
          />

          <Field
            type='text'
            placeholder="slug"
            label="Slug:"
            registration={register('channel.slug')}
            error={errors.channel?.slug?.message}
          />

          <Textarea
            placeholder="description"
            label="Description:"
            rows={5}
            registration={register('channel.description')}
            error={errors.channel?.description?.message}
          />

        </div>

        <div>
          <Controller
            name="channel.avatarUrl"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <UploadField
                label="Avatar:"
                value={value}
                onChange={onChange}
                error={error}
                folder="avatars"
              />
            )}
          />

          <Controller
            name="channel.bannerUrl"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <UploadField
                label="Banner:"
                value={value}
                onChange={onChange}
                error={error}
                folder="banners"
                aspectRation="16:9"
              />
            )}
          />
        </div>
      </div>

      <Button
        isLoading={isPending}
        className="mt-8"
        type="submit"
      >
        Update
      </Button>
    </form>

  </div>
}
