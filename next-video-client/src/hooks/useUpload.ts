import { fileService } from '@/services/files.service';
import type { IFileResponse } from '@/types/file.type';
import { validateFileSize } from '@/utils/validate-file-size';
import { useMutation } from '@tanstack/react-query';
import { useCallback, type ChangeEvent } from 'react';
import toast from 'react-hot-toast';

interface IUseUploadProps {
	onChange?: (...event: unknown[]) => void;
	folder?: string;
	onSuccess?: (data: IFileResponse[]) => void;
	onError?: () => void;
	maxFileSize?: number
}

type TUseUpload = (props: IUseUploadProps) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => void;
	isLoading: boolean;
};

export const useUpload: TUseUpload = ({ onChange, folder, onSuccess, onError, maxFileSize }) => {
	const { mutate, isPending } = useMutation({
		mutationKey: ['upload-file'],
		mutationFn: (data: FormData) => fileService.uploadFile(data, folder),
		onSuccess: ({ data }) => {
			if(onChange) {
				onChange(data[0].url)
			}
			if(onSuccess) {
				onSuccess(data)
			}
		},
		onError: e => {
			toast.error(e.message)
			if(onError) {
				onError()
			}
		},
	});

	const uploadFile = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files;

			if (!files) return;
			if(!validateFileSize(files[0], maxFileSize)) return;

			const formData = new FormData();
			formData.append('file', files[0]);
			mutate(formData);
		},
		[maxFileSize, mutate],
	);

	return { uploadFile, isLoading: isPending };
};
