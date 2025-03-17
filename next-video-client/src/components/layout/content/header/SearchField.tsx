import { PUBLIC_PAGE } from "@/config/public-page.config"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function SearchField() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const router = useRouter()

  const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (e.key !== 'Enter') return
    e.preventDefault()

    if (!searchQuery.trim()) return

    router.push(PUBLIC_PAGE.SEARCH(searchQuery))
  }

  return <div className="grow-1">
    <input 
      type="search" 
      placeholder="Type to search..." 
      className="w-1/2 px-4 py-2" 
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}  
      onKeyDown={handleKeyDown}
    />
  </div>
}
