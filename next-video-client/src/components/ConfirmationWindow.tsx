import type { Dispatch, SetStateAction } from "react"
import { Button } from "./ui/button/Button";

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
      className="absolute inset-0 flex items-center justify-center bg-gray-800/80"
    >
      <div className="flex flex-col items-center justify-center w-[400px] h-[160px] bg-white rounded-2xl">
        <h2 className="mb-10 text-black">Are you sure you want to clear history?</h2>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleClearHistory}
          >
            Yes
          </Button>
          <Button 
            onClick={() => setIsConfirmationWindowOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
