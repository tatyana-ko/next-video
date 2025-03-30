import { videoService } from '@/services/video.service';
import { watchHistoryService } from '@/services/watch-history.service';
import type { IVideoResponse } from '@/types/video.types';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useWatchHistory({ video }: { video: IVideoResponse }) {
  const {mutate: updateViews} = useMutation({
    mutationKey: ['update-views'],
    mutationFn: () => videoService.updateViews(video.publicId)
  });

  const {mutate: updateWatchHistory} = useMutation({
    mutationKey: ['update-watch-history'],
    mutationFn: () => watchHistoryService.addToWatchHistory(video.id)
  });

  useEffect(() => {
    updateViews();
    updateWatchHistory();
  }, [updateViews, updateWatchHistory])

	return {};
}
