'use client'

import { useProfile } from "@/hooks/useProfile"
import { WatchHistoryItem } from "../history/WatchHistoryItem"

export function LikedVideoPage() {
  const { profile, isLoading } = useProfile()

  return <div>
    {isLoading && <div>Loading...</div>}
    <div className="w-full mb-10 px-4 py-5 bg-gray-800 rounded-md">
      <h2>Liked Videos</h2>
      {!!profile?.likes.length && <p className="text-sm text-gray-400">{profile?.likes.length} videos</p>}
    </div>

    {profile?.likes && profile?.likes.map(likedVideo => <WatchHistoryItem key={likedVideo.id} video={likedVideo.video} />)}
  </div>
}
