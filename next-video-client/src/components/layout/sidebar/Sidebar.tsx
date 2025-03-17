import { SidebarMenu } from "./sidebar-menu/SidebarMenu";
import { SidebarHeader } from "./header/SidebarHeader";
import { SIDEBAR_CHANNEL_DATA, SIDEBAR_CHANNEL_SETTINGS_MENU, SIDEBAR_PUBLIC_DATA } from "./sidebar.data";
// import { SidebarSubscriptions } from "./subscriptions/SidebarSubscriptions";

export function Sidebar() {
  return (
    <aside className="w-56 p-2 border-r border-gray-600">
      <SidebarHeader />
      <SidebarMenu items={SIDEBAR_PUBLIC_DATA} hasBorder={true} />
      <SidebarMenu items={SIDEBAR_CHANNEL_DATA} hasBorder={true} />

      {/* <SidebarSubscriptions title={Subscriptions} /> */}

      <SidebarMenu items={SIDEBAR_CHANNEL_SETTINGS_MENU} title="Settings:" />
    </aside>
  )
}
