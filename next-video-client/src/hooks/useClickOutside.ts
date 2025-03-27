import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"

type TypeOut = {
  ref: any
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

export const useClickOutside = (initialVisibility: boolean): TypeOut => {
  const [isVisible, setIsVisible] = useState(initialVisibility);
  const ref = useRef<HTMLElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if(ref.current && !ref.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  }
  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })
  
  return {ref, isVisible, setIsVisible}
}