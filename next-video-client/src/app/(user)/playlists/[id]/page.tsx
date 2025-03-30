import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { PlaylistVideoPage } from './PlaylistVideoPage'

export const metadata: Metadata = {
  title: 'Playlist video',
  ...NO_INDEX_PAGE
}

export default function Page() {
  return <PlaylistVideoPage />
}
