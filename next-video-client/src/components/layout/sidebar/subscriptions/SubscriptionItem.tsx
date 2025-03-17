import type { ISidebarSubChannel } from "@/types/sidebar-data.types";
import { Dot, Radio } from "lucide-react";
import Link from "next/link";

interface IMenuItemProps {
  item: ISidebarSubChannel
}

export function SubscriptionItem({ item }: IMenuItemProps) {
  const { link, label, isLiveNow, hasNewVideo } = item;

  return (
    <li>
      <Link href={link}>     
        <span>{label}</span>
        {isLiveNow && <Radio />}
        {hasNewVideo && <Dot />}
      </Link>
    </li>
  )
}