import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Auth } from './Auth'

export const metadata: Metadata = {
  title: 'Authorization',
  ...NO_INDEX_PAGE
}

export default function Page() {
  return <Auth/>
}
