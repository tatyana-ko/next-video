import Link from "next/link";
import Image from 'next/image';
import { STUDIO_PAGE } from "@/config/studio-page.config";
import { useProfile } from "@/hooks/useProfile";

export function HeaderAvatar() {
  const { profile, isLoading } = useProfile();

  return <div>
    {profile && <Link href={STUDIO_PAGE.HOME}>
      <Image
        src={profile?.channel?.avatarUrl || '/default-avatar.png'}
        alt='profile avatar'
        width={40}
        height={40}
        className='border border-gray-200 rounded-full'
      />
    </Link>}
  </div>
}

