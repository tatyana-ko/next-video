import type { IUser } from './user.types'
import type { IVideo } from './video.types'

export interface IWatchHistory {
  id: string
  user: IUser
  userId: IVideo
  watchedAt: string
}