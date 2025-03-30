import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { HistoryPage } from './HistoryPage'

export const metadata: Metadata = {
  title: 'Browsing history',
  ...NO_INDEX_PAGE
}

export default function Page() {
  return <div>
    <HistoryPage />
  </div>
}
