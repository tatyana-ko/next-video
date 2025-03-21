import { PUBLIC_PAGE } from '@/config/public-page.config';
import { authService } from '@/services/auth.service';
import type { IAuthData, IAuthForm } from '@/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRef, useTransition } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import type { SubmitHandler, UseFormReset } from 'react-hook-form';
import toast from 'react-hot-toast';

export function useAuthForm(type: 'login' | 'register', reset: UseFormReset<IAuthForm>) {
	const recaptchaRef = useRef<ReCAPTCHA>(null);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const { mutateAsync, isPending: isAuthPending } = useMutation({
		mutationKey: [type],
		mutationFn: (data: IAuthData) => authService.main(type, data, recaptchaRef.current?.getValue()),
	});

	const onSubmitForm: SubmitHandler<IAuthForm> = ({ email, password }) => {
		const token = recaptchaRef.current?.getValue();

		if (!token) {
			toast.error('Pass the captcha', {
				id: 'recaptcha',
			});
			return;
		}
		
		toast.promise(mutateAsync({ email, password }), {
			loading: 'Loading...',
			success: () => {
				startTransition(() => {
					reset();
					router.push(PUBLIC_PAGE.HOME_PAGE);
				});

				return 'Success';
			},
			error: e => {
				if (axios.isAxiosError(e)) {
					return e.response?.data?.message;
				}
			},
		});
	};

	const isLoading = isPending || isAuthPending;

	return { onSubmitForm, isLoading, recaptchaRef };
}
