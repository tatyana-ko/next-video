import { PUBLIC_PAGE } from "@/config/public-page.config";
import { STUDIO_PAGE } from "@/config/studio-page.config";
import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function LogoutButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();
  const pathname = usePathname();

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      if (pathname.includes(STUDIO_PAGE.HOME) || pathname.includes(STUDIO_PAGE.SETTINGS)) {
        router.push(PUBLIC_PAGE.HOME_PAGE)
      }
    }
  })

  if (!isLoggedIn) return null

  return <button
    onClick={() => mutate()}
    type="button"
    title="Logout"
    className="cursor-pointer hover:scale-[1.1]">
    <LogOut size={24} />
  </button>
}
