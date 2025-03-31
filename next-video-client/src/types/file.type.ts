import type { EnumVideoPlayerQuality } from './video-player.types';

export interface IFileResponse {
	url: string;
	name: string;
	maxResolution?: EnumVideoPlayerQuality;
}

export interface IVideoProgressProcessingResponse {
	fileName: string
	status: number
}