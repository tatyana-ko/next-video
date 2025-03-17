import Link from "next/link";
import { PUBLIC_PAGE } from "@/config/public-page.config";
import { AlignJustify, ChevronRight } from "lucide-react";

export function SidebarHeader() {
  return <div className="flex items-center gap-10 mb-5">
    <button className="cursor-pointer">
      <AlignJustify />
    </button>
    <Link href={PUBLIC_PAGE.HOME_PAGE} >
      <div className="flex items-center ">
        <ChevronRight color='red' />
        <span className="font-semibold uppercase">Video</span>
      </div>
    </Link>
  </div>
}
