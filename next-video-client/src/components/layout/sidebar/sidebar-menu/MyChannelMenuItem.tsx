'use client'

import { PUBLIC_PAGE } from "@/config/public-page.config";
import { useProfile } from "@/hooks/useProfile";
import type { ISidebarItem } from "@/types/sidebar-data.types";
import { MenuItem } from "./MenuItem";

interface IMyChannelProps {
  item: ISidebarItem
  isActiveLink: boolean;
}

export function MyChannelMenuItem({ item, ...props }: IMyChannelProps) {
  const { profile } = useProfile();
  const myChannelLink = profile?.channel?.slug ? PUBLIC_PAGE.CHANNEL(profile?.channel?.slug) : null

  if (!myChannelLink) return null;

  return (
    <MenuItem
      item={{
        ...item,
        link: myChannelLink
      }}
      {...props}
    />
  )
}
