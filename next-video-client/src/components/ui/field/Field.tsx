import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { clsx } from "clsx";

export interface IFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  registration: UseFormRegisterReturn
}

export function Field({ label, error, registration, ...props }: IFieldProps) {
  return <>
    <label>
      <span className="block mb-2 text-gray-500 font-semibold">{label}</span>
      <input
        className={clsx('w-full px-3 py-2 bg-gray-700 border rounded',
          error ? 'border-red-700' : 'border-transparent'
        )}
        {...registration}
        {...props}
      />
    </label>
    {error && <span className="block mt-1 text-red-600">{error}</span>}
  </>
}
