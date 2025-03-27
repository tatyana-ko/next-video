import { Volume1, Volume2, VolumeX } from "lucide-react";
import { clsx } from 'clsx';
import styles from './volume.module.scss'

interface IVolumeControllerProps {
  value: number
  isMuted: boolean
  changeVolume: (soundValue: number) => void
  toggleMute: () => void
}

export function VolumeController({ value, isMuted, changeVolume, toggleMute }: IVolumeControllerProps) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={toggleMute}>
        {isMuted ? <VolumeX /> : (value < 0.4) ? <Volume1 /> : <Volume2 />}
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step='0.05'
        value={value}
        onChange={e => changeVolume(parseFloat(e.target.value))}
        className={clsx(styles.volumeSlider, 'w-16 h-[0.2rem] bg-white rounded-2xl appearance-none')}
        style={{
					background: `linear-gradient(to right, white ${value * 100}%, rgba(255, 255, 255, 0.2) ${value * 100}%)`
				}}
      />
    </div>
  )
}
