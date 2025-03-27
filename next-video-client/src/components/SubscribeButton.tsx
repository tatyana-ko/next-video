'use client'

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button/Button"
import { useProfile } from "@/hooks/useProfile";
import { channelService } from "@/services/channel.service";
import { PUBLIC_PAGE } from "@/config/public-page.config";

export function SubscribeButton({ slug }: { slug: string }) {
  const router = useRouter();
  const { profile, refetch } = useProfile();
  const { mutate } = useMutation({
    mutationKey: ['subscribe'],
    mutationFn: () => channelService.toggleSubscription(slug),
    onSuccess: () => {
      refetch()
    }
  })

  const handleToggleSubscribe = () => {
    if (profile) {
      mutate()
    } else {
      router.push(PUBLIC_PAGE.AUTH)
    }
  }

  return (
    <Button
      onClick={handleToggleSubscribe}
    >
      {profile?.subscriptions.some(sub => sub.slug === slug) ? 'Subscribed' : 'Subscribe'}
    </Button>
  )
}
