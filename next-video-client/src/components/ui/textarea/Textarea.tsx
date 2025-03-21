import type { TextareaHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { clsx } from "clsx";

export interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  registration: UseFormRegisterReturn
}

export function Textarea({ label, error, registration, ...props }: ITextareaProps) {
  return <>
    <label>
      <span className="block mb-2 text-gray-500 font-semibold">{label}</span>
      <textarea
        className={clsx('w-full px-3 py-2 resize-none bg-gray-700 border rounded',
          error ? 'border-red-700' : 'border-transparent'
        )}
        {...registration}
        {...props}
      />
    </label>
    {error && <span className="block mt-1 text-red-600">{error}</span>}
  </>
}
