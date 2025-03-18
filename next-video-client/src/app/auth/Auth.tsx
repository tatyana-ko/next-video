'use client'

import { PUBLIC_PAGE } from "@/config/public-page.config"
import { Button } from "@/ui/button/Button"
import { Field } from "@/ui/field/Field"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"

export interface IAuthForm {
  login: string
  password: string
  confirmPassword: string
}

export function Auth() {
  const [isALoginForm, setIsALoginForm] = useState<boolean>(true)

  const { register, handleSubmit, watch, formState: { errors }, } = useForm<IAuthForm>({
    mode: 'onChange'
  })

  const onSubmitForm: SubmitHandler<IAuthForm> = (data) => {
    if (isALoginForm) {
      console.log('log', data);
    } else {
      console.log('regis', data);
    }
  }

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
            registration={register('login', { required: "Field is required", maxLength: 15 })}
            error={errors.login?.message}
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

          <Button
            className="mt-8"
          >
            {isALoginForm ? 'Login' : 'Registration'}
          </Button>
        </form>
      </div>
    </div>
  )
}
