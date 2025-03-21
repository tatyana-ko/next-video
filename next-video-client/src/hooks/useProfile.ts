import { userService } from "@/services/user.service"
import { useQuery } from "@tanstack/react-query"

export function useProfile() {
  const {data, isLoading, isSuccess, refetch} = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.getProfile(),
    refetchInterval: 100000000,
  })

  return {
    profile: data?.data,
    isLoading,
    isSuccess,
    refetch
  }
}