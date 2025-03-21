import { userService } from "@/services/user.service"
import { useQuery } from "@tanstack/react-query"

export function useProfile() {
  const {data, isLoading} = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.getExploreVideos(),
    refetchInterval: 100000000,
  })

  return {
    profile: data?.data,
    isLoading
  }
}