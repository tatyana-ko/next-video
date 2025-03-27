import { EnumVideoPlayerQuality, type HTMLCustomVideoElement } from '@/types/video-player.types';
import { useEffect, useRef, useState } from 'react';

const SKIP_TIME_SECONDS = 10;

export function useVideoPlayer({ fileName }: { fileName: string }) {
	const playerRef = useRef<HTMLCustomVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [quality, setQuality] = useState(EnumVideoPlayerQuality['1080p']);
	const [currentTime, setCurrentTime] = useState<number>(0); //текущее время видео
	const [videoTime, setVideoTime] = useState(0); //общее время видео
	const [progress, setProgress] = useState(0);
	const [volume, setVolume] = useState(1);
	const [isMuted, setIsMuted] = useState(false);

	const changeVolume = (soundValue: number) => {
		if (!playerRef?.current) return;

		playerRef.current.volume = soundValue;
		setVolume(soundValue);
		setIsMuted(soundValue === 0);
	};

	const toggleMute = () => {
		if (!playerRef?.current) return;

		const muted = !playerRef.current.muted;

		playerRef.current.muted = muted;
		setIsMuted(muted);
	}

	const togglePlayPause = () => {
		if (isPlaying) {
			playerRef?.current?.pause();
		} else {
			playerRef?.current?.play();
		}

		setIsPlaying(!isPlaying);
	};

	const skipTime = (direction?: 'forward' | 'backward') => {
		if (!playerRef?.current?.currentTime) return;

		if (direction === 'forward') {
			playerRef.current.currentTime += SKIP_TIME_SECONDS;
		} else {
			playerRef.current.currentTime -= SKIP_TIME_SECONDS;
		}
	};

	const toggleFullScreen = () => {
		if (!playerRef?.current) return;

		if (playerRef?.current.requestFullscreen) {
			playerRef?.current.requestFullscreen();
		} else if (playerRef?.current.mozRequestFullScreen) {
			playerRef.current.mozRequestFullScreen();
		} else if (playerRef?.current.webkitRequestFullScreen) {
			playerRef?.current.webkitRequestFullScreen();
		} else if (playerRef?.current.msRequestFullScreen) {
			playerRef?.current.msRequestFullScreen();
		}
	};

	const changeQuality = (quality: EnumVideoPlayerQuality) => {
		if (!playerRef?.current) return;

		setQuality(quality);
		playerRef.current.src = `/uploads/videos/${quality}/${fileName}`;
		playerRef.current.currentTime = currentTime;
		playerRef.current.play();
		setIsPlaying(true);
	};

	useEffect(() => {
		const originalTime = playerRef.current?.duration;

		if (!originalTime) return;

		setVideoTime(originalTime);

		const currentTime = playerRef.current?.currentTime;

		if (currentTime) {
			setCurrentTime(currentTime);
			setProgress((currentTime / originalTime) * 100);
		}
	}, [playerRef.current?.duration]);

	useEffect(() => {
		const player = playerRef?.current;

		const updateProgress = () => {
			if (!player) return;

			const currentTime = player.currentTime;
			const duration = player.duration;

			if (currentTime) {
				setCurrentTime(currentTime);
				setProgress((currentTime / duration) * 100);
			}
		};

		player?.addEventListener('timeupdate', updateProgress);

		return () => player?.addEventListener('timeupdate', updateProgress);
	}, []);

	return {
		playerRef,
		isPlaying,
		quality,
		currentTime,
		videoTime,
		progress,
		volume,
		isMuted,
		togglePlayPause,
		skipTime,
		toggleFullScreen,
		changeQuality,
		changeVolume,
		toggleMute,
	};
}
