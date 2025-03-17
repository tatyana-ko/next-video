import type { ISidebarItem } from "@/types/sidebar-data.types";
import Link from "next/link";

interface IMenuItemProps {
  item: ISidebarItem
}

export function MenuItem({ item }: IMenuItemProps) {
  return (
    <li className="py-3">
      <Link href={item.link} className="flex items-center gap-4">
        <item.icon size={20} />
        <span>{item.label}</span>
      </Link>
    </li>
  )
}
