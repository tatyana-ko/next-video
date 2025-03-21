import type { IChannel } from "./channel.types";
import type { IFullUserInfo } from "./user.types";

export interface ISettingsData extends Pick<IFullUserInfo, 'email' | 'name' > {
  password?: string
  channel?: Pick<IChannel, 'avatarUrl' | 'slug' | 'description' | 'bannerUrl'>
}