import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { StudioEditPage } from './StudioEditPage'

export const metadata: Metadata = {
  title: 'Edit video page',
  ...NO_INDEX_PAGE
}

export default function Page() {
  return <StudioEditPage />
}
