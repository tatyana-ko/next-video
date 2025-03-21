import { PUBLIC_PAGE } from "@/config/public-page.config"
import { LogIn } from "lucide-react"
import Link from "next/link"

export function LogInButton() {
  return <button type="button" title="Log In">
    <Link href={PUBLIC_PAGE.AUTH}>
      <LogIn />
    </Link>
  </button>
}