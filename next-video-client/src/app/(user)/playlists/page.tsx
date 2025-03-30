import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { PlaylistsPage } from './PlaylistsPage'

export const metadata: Metadata = {
  title: 'User playlists',
  ...NO_INDEX_PAGE
}

export default function Page() {
  return <PlaylistsPage />
}