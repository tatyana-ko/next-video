import type { EnumVideoPlayerQuality } from "./video-player.types"

export interface IVideoFormData {
  title: string
  description: string
  thumbnailUrl: string
  maxResolution: EnumVideoPlayerQuality
  videoFileName: string
  tags: string[]
}