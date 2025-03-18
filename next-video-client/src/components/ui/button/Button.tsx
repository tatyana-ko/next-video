import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from 'tailwind-merge';


export interface IFieldProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  children: ReactNode
  className?: string
}

export function Button({ isLoading, children, className, ...props }: IFieldProps) {
  return (
    <button
      className={twMerge('px-3 py-2 border border-gray-500 rounded-xl text-white disabled:bg-gray-500 hover:border-gray-50', className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>)
}
