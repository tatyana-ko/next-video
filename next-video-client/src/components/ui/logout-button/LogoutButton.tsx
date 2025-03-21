import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

export function LogoutButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout()
  })

  if (!isLoggedIn) return null

  return <button
    onClick={() => mutate()}
    type="button"
    title="Logout"
    className="cursor-pointer hover:scale-[1.1]">
    <LogOut size={20} />
  </button>
}
