import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { StudioVideoList } from './StudioVideoList'

export const metadata: Metadata = {
  title: 'Studio page',
  ...NO_INDEX_PAGE
}

export default function StudioPage() {
  return <div>
    <h1 className='text-2xl mb-5'>Your videos</h1>
    <StudioVideoList />
  </div>
}