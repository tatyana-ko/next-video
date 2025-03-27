'use client'

import { PUBLIC_PAGE } from "@/config/public-page.config"
import { useAuthForm } from "@/hooks/useAuthForm"
import type { IAuthForm } from "@/types/auth.types"
import { Button } from "@/ui/button/Button"
import { Field } from "@/ui/field/Field"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import {  useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"

export function Auth() {
  const [isALoginForm, setIsALoginForm] = useState<boolean>(true)

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IAuthForm>({
    mode: 'onChange'
  })

  const { isLoading, onSubmitForm, recaptchaRef } = useAuthForm(isALoginForm ? 'login' : 'register', reset)

  return (
    <div>
      <Link href={PUBLIC_PAGE.HOME_PAGE}>
        <div className='flex items-center p-2'>
          <ChevronRight
            color='red'
            size={26}
          />
          <span className='font-semibold uppercase'>ideo</span>
        </div>
      </Link>

      <div className="max-w-md mx-auto mt-8">
        <div className="flex justify-center mb-6 gap-5 ">
          <Button
            type="button"
            className={`px-3 py-2 font-semibold ${isALoginForm ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
              }`}
            onClick={() => setIsALoginForm(true)}
          >
            Login
          </Button>

          <Button
            type="button"
            className={`px-3 py-2 font-semibold ${!isALoginForm ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
              }`}
            onClick={() => setIsALoginForm(false)}
          >
            Registration
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Field
            type='email'
            placeholder="example@gmail.com"
            label="Email:"
            registration={register('email', { required: "Field is required", maxLength: 15 })}
            error={errors.email?.message}
          />

          <Field
            type='password'
            placeholder="Password"
            label="Password:"
            registration={register('password', { required: "Field is required", minLength: 6 })}
            error={errors.password?.message}
          />

          {!isALoginForm &&
            <Field
              type='password'
              placeholder="Confirm password"
              label="Please, confirm password"
              registration={register('confirmPassword', {
                required: true,
                validate: value => value === watch('password') || 'Passwords do not match'
              })}
              error={errors.confirmPassword?.message}
            />
          }

          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
            ref={recaptchaRef}
            size="normal"
          />

          <Button
            isLoading={isLoading}
            className="mt-8"
            type="submit"
          >
            {isALoginForm ? 'Login' : 'Registration'}
          </Button>
        </form>
      </div>
    </div>
  )
}
