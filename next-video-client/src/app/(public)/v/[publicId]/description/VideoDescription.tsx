'use client'

import { processHtmlContent } from '@/utils/process-html-content';
import parse from 'html-react-parser';
import { useState } from 'react';
import styles from './VideoDescription.module.scss'

export function VideoDescription({ description }: { description: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { initialContent, isShouldShowToggle } = processHtmlContent(description, 3)


  return (
    <div className='relative mb-4 px-2 bg-gray-800 rounded-xl'>
      <article className={styles.article}>
        {parse(isExpanded ? description : initialContent)}
      </article>

      {isShouldShowToggle && (
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className='text-sm text-gray-400 uppercase transition-colors hover:text-gray-200'
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Hide' : 'Show more'}
        </button>
      )}
    </div>
  )
}
