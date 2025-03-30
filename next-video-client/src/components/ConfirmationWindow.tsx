import type { Dispatch, SetStateAction } from "react"

interface IConfirmationWindowProps {
  setIsConfirmationWindowOpen: Dispatch<SetStateAction<boolean>>
  clearWatchHistory: () => void
}

export function ConfirmationWindow({ clearWatchHistory, setIsConfirmationWindowOpen }: IConfirmationWindowProps) {
  const handleClearHistory = () => {
    clearWatchHistory();
    setIsConfirmationWindowOpen(false);
  }

  return (
    <div 
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800/80"
    >
      <div className="flex flex-col items-center justify-center w-[400px] h-[160px] bg-white rounded-2xl">
        <h2 className="mb-10 text-black">Are you sure you want to clear history?</h2>

        <div className="flex items-center gap-3">
          <button className="px-3 py-1 border border-gray-600 text-black rounded-md cursor-pointer"
            onClick={handleClearHistory}
          >
            Yes
          </button>
          <button className="px-3 py-1 border border-gray-600 text-black rounded-md cursor-pointer"
            onClick={() => setIsConfirmationWindowOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
