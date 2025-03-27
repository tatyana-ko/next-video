'use client'

import { useClickOutside } from "@/hooks/useClickOutside";
import { EnumVideoPlayerQuality } from "@/types/video-player.types";

const VIDEO_QUALITIES: EnumVideoPlayerQuality[] = [
  EnumVideoPlayerQuality['4K'],
  EnumVideoPlayerQuality['2K'],
  EnumVideoPlayerQuality['1080p'],
  EnumVideoPlayerQuality['720p'],
  EnumVideoPlayerQuality['480p'],
  EnumVideoPlayerQuality['360p']
]

interface ISelectQualityProps {
  currentQuality: EnumVideoPlayerQuality
  onChange: (quality: EnumVideoPlayerQuality) => void
  maxResolution: EnumVideoPlayerQuality
}

export function SelectQuality({ currentQuality, onChange, maxResolution }: ISelectQualityProps) {
  const { ref, isVisible, setIsVisible } = useClickOutside(false);

  const availableQualities = VIDEO_QUALITIES.slice(VIDEO_QUALITIES.indexOf(maxResolution));

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setIsVisible(!isVisible)}>
        {currentQuality}
      </button>

      {isVisible && (
        <ul className="bg-white/10 px-1 py-2 absolute bottom-full right-0 z-10">
          {availableQualities.map(quality => (
            <li key={quality} className="mb-1">
              <button onClick={() => {
                onChange(quality)
                setIsVisible(false)
              }}>
                {quality}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
