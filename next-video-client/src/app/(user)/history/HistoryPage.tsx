'use client'

import { watchHistoryService } from "@/services/watch-history.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { WatchHistoryItem } from "./WatchHistoryItem";
import { useState } from "react";
import { ConfirmationWindow } from "@/components/ConfirmationWindow";
import { Button } from "@/ui/button/Button";

export function HistoryPage() {
  const [isConfirmationWindowOpen, setIsConfirmationWindowOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['watch-history'],
    queryFn: () => watchHistoryService.getWatchHistory()
  });

  const { mutate: clearWatchHistory } = useMutation({
    mutationKey: ['clear-watch-history'],
    mutationFn: () => watchHistoryService.removeWarchHistory(),
    onSuccess: () => refetch()
  })

  const watchHistoryArray = data?.data;

  return (
    <div>
      <div className="w-full mb-10 px-4 py-5 bg-gray-800 rounded-md">
        <h2 className="mb-2">History:</h2>
        <Button
          onClick={() => setIsConfirmationWindowOpen(!isConfirmationWindowOpen)}
        >
          Clear history
        </Button>
      </div>

      {isConfirmationWindowOpen &&
        <ConfirmationWindow
          setIsConfirmationWindowOpen={setIsConfirmationWindowOpen}
          clearWatchHistory={clearWatchHistory}
        />
      }

      {isLoading && <div>Loading...</div>}

      {watchHistoryArray
        ? <ul>{watchHistoryArray.map(video => <WatchHistoryItem key={video.video.id} video={video.video} />)}</ul>
        : <p>You have not watched anything yet.</p>
      }
    </div>
  )
}
