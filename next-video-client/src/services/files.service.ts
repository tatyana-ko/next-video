import { instance } from '@/api/axios';
import type { IFileResponse, IVideoProgressProcessingResponse } from '@/types/file.type';

class FileService {
	uploadFile(file: FormData, folder?: string) {
		return instance.post<IFileResponse[]>('/upload-file', file, {
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	}

	getProcessingStatus(fileName: string) {
		return instance.get<IVideoProgressProcessingResponse>(`upload-file/status/${fileName}`);
	}
}
export const fileService = new FileService();
