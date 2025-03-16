import type { PropsWithChildren } from 'react'
import { Sidebar } from './sidebar/Sidebar'
import { Content } from './content/Content'

export function ContentLayout({ children }: PropsWithChildren<unknown>) {
  return <div>
    <Sidebar />
    <Content>
      {children}
    </Content>
  </div>
}
