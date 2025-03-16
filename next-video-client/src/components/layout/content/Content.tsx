import type { PropsWithChildren } from 'react'
import { Header } from './header/Header'

export function Content({ children }: PropsWithChildren<unknown>) {
  return <main>
    <Header />
    <section>
      {children}
    </section>
  </main>
}
