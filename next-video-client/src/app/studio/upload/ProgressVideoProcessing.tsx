'use client'

import { fileService } from "@/services/files.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";

interface Props {
  fileName: string
  isReadyToPublish: boolean
  setIsReadyToPublish: Dispatch<SetStateAction<boolean>>
}

export function ProgressVideoProcessing({ fileName, setIsReadyToPublish, isReadyToPublish }: Props) {
  const [progress, setProgress] = useState<number>(0);

  const { data: progressData, isSuccess } = useQuery({
    queryKey: ['processing video upload'],
    queryFn: () => fileService.getProcessingStatus(fileName),
    select(data) {
      return data.data.status
    },
    refetchInterval: (query) => {
      const queryProgress = query.state.data?.data;

      return (queryProgress !== undefined && queryProgress.status < 100) ? 10000 : false;
    },
    enabled: !!fileName && !isReadyToPublish
  });

  useEffect(() => {
    if (!progressData) return;
    setProgress(progressData);

    if (progressData === 100) {
      setIsReadyToPublish(true);
      toast.success('Video processed successfully!')
    }
  }, [isSuccess, progressData, setIsReadyToPublish])

  return (
    progress > 0 && (
      <div className="relative flex items-center justify-center w-full rounded-md text-sm overflow-hidden mt-2 mb-4 bg-gray-500/15">
        <div
          className="absolute inset-0 h-full bg-blue-500/15 animate-pulse"
          style={{
            width: progress ? `${progress}%` : 0
          }}
        />
        <span>Processing video {Math.round(progress)}%</span>
      </div>
    )
  )
}
