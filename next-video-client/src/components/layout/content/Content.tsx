import type { PropsWithChildren } from 'react'
import { Header } from './header/Header'

export function Content({ children }: PropsWithChildren<unknown>) {
  return <main className='grow shrink basis-[0%] p-2'>
    <Header />
    <section>
      {children}
    </section>
  </main>
}
