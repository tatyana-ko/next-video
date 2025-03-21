import { fileService } from '@/services/files.service';
import { useMutation } from '@tanstack/react-query';
import { useCallback, type ChangeEvent } from 'react';
import toast from 'react-hot-toast';

type TUseUpload = (props: { onChange: (...event: unknown[]) => void; folder?: string }) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => void;
	isLoading: boolean;
};

export const useUpload: TUseUpload = ({ onChange, folder }) => {
	const { mutate, isPending } = useMutation({
		mutationKey: ['upload-file'],
		mutationFn: (data: FormData) => fileService.uploadFile(data, folder),
		onSuccess: ({ data }) => onChange(data[0].url),
		onError: e => toast.error(e.message),
	});

	const uploadFile = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files;

			if (!files) return;

			const formData = new FormData();
      formData.append('file', files[0])
			mutate(formData);
		},
		[mutate],
	);

	return { uploadFile, isLoading: isPending };
};
