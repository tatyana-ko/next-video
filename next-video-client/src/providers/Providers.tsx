'use client';

import { store } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient({
		defaultOptions: {
			queries: {
				retry: 1
			}
		}
	}));

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				{children}
				<Toaster
					position="top-right"
					toastOptions={
						{
							success: {
								duration: 3000,
							},
							error: {
								duration: 5000,
							}
						}
					}
				/>
			</Provider>
		</QueryClientProvider>);
}
