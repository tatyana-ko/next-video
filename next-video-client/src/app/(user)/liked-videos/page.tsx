import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { LikedVideoPage } from './LikedVideoPage'

export const metadata: Metadata = {
  title: 'Liked Videos',
  ...NO_INDEX_PAGE
}

export default function Page() {
  return <LikedVideoPage />
}
