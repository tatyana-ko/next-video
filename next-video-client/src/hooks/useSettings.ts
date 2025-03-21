import { userService } from '@/services/user.service';
import type { ISettingsData } from '@/types/settings.types';
import { useMutation } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useProfile } from './useProfile';
import { useEffect } from 'react';

export function useSettings() {
	const form = useForm<ISettingsData>({
		mode: 'onChange',
	});

	const { profile, isSuccess, refetch } = useProfile();

	useEffect(() => {
		if (!isSuccess) return;

		const channel = profile?.channel
			? {
					avatarUrl: profile?.channel?.avatarUrl,
					bannerUrl: profile?.channel?.bannerUrl,
					description: profile?.channel?.description,
					slug: profile?.channel?.slug,
				}
			: {};

		form.reset({
			channel,
			email: profile?.email,
			name: profile?.name,
		});
	}, [profile, isSuccess, form]);

	const { mutate, isPending } = useMutation({
		mutationKey: ['update-profile'],
		mutationFn: (data: ISettingsData) => userService.updateProfile(data),
		onSuccess: () => refetch(),
	});

	const onSubmitSettings: SubmitHandler<ISettingsData> = data => {
		mutate(data);
	};

	return { form, onSubmitSettings, isPending };
}
