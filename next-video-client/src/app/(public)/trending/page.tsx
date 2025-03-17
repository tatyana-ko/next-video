import { PUBLIC_PAGE } from '@/config/public-page.config';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Trending",
  description: "Trending videos",
  alternates: {
    canonical: PUBLIC_PAGE.TRENDING
  } 
};

export default function TrendingPage() {
  return <div>Trending Page</div>
}
