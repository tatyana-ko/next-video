'use client'

import { Maximize, Pause, Play } from "lucide-react";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { EnumVideoPlayerQuality } from "@/types/video-player.types";
import { PlayerProgressBar } from "./PlayerProgressBar";
import { SelectQuality } from "./SelectQuality";
import { getTime } from "@/utils/video-player";
import { VolumeController } from "./volume-controller/VolumeController";

interface IVideoPlayerProps {
  fileName: string
  maxResolution: EnumVideoPlayerQuality
}

export function VideoPlayer({ fileName, maxResolution }: IVideoPlayerProps) {

  const { playerRef,
    isPlaying,
    quality,
    videoTime,
    progress,
    volume,
    isMuted,
    togglePlayPause,
    toggleFullScreen,
    changeQuality,
    changeVolume,
    toggleMute } = useVideoPlayer({ fileName });

  return (
    <div className='relative rounded-lg overflow-hidden'>
      <video
        ref={playerRef}
        className='w-full h-full aspect-video'
        controls={false}
        src={`/uploads/videos/${EnumVideoPlayerQuality['720p']}/${fileName}`}
        preload='metadata'
      />

      <div className='flex items-center justify-between p-2 absolute bottom-3 w-full'>
        <PlayerProgressBar progress={progress} />

        <div className='flex items-center gap-4'>
          <button
            onClick={togglePlayPause}
            className=''
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <div>
            <span>{getTime(videoTime)}</span>
          </div>
        </div>

        <div className='flex items-center gap-5'>
          <VolumeController
            value={volume}
            isMuted={isMuted}
            changeVolume={changeVolume}
            toggleMute={toggleMute}
          />
          <SelectQuality
            currentQuality={quality}
            onChange={changeQuality}
            maxResolution={maxResolution}
          />
          <button
            onClick={toggleFullScreen}
            className='hoverPrimary'
          >
            <Maximize />
          </button>
        </div>

      </div>
    </div>
  )
}
