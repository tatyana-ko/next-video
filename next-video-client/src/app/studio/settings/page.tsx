import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { SettingsForm } from './SettingsForm'
import { Title } from '@/ui/title/Title'
import { Settings } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Settings page',
  ...NO_INDEX_PAGE
}

export default function SettingsPage() {
  return <div>
    <Title Icon={Settings}>Settings</Title>
    <SettingsForm />
  </div>
}
