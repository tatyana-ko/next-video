import clsx from 'clsx'
import type { ISidebarItem } from "@/types/sidebar-data.types"
import { MenuItem } from "./MenuItem"

interface ISidebarMenuProps {
  title?: string
  items: ISidebarItem[]
  hasBorder?: boolean
}

export function SidebarMenu({ title, items, hasBorder }: ISidebarMenuProps) {
  return (
    <div className={clsx(hasBorder && 'border-b border-gray-600 mb-4')}>
      {title && <h2>{title}</h2>}
      <nav>
        <ul>
          {items.map(item => <MenuItem key={item.label} item={item} />)}
        </ul>
      </nav>
    </div>
  )
}
