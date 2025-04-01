export function PlayerProgressBar({ progress }: { progress: number }) {
  return (
    <div className='w-full bg-gray-200/50 rounded-md'>
      <div
        style={{
          width: `${progress}%`
        }}
        className='h-1 bg-red-500 relative rounded-md'
      >
      </div>
    </div>
  )
}
