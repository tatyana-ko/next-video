import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { UploadVideoPage } from './UploadVideoPage'

export const metadata: Metadata = {
  title: 'Upload video page',
  ...NO_INDEX_PAGE
}

export default function Page() {
  return <UploadVideoPage />
}
