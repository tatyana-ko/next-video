import type { IChannel } from "./channel.types"
import type { IWatchHistory } from "./watchHistory.types"

export interface IUser {
  id: string
  name?: string
  email: string
  channel?: IChannel
}

export interface IFullUserInfo extends IUser {
  channel?: IChannel
  subscriptions: IChannel[]
  watchHistory: IWatchHistory[]
}