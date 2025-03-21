'use client';

import { useEffect, useState, type PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import { Sidebar } from './sidebar/Sidebar';
import { Content } from './content/Content';
import styles from './sidebar/Sidebar.module.scss';
import { authService } from '@/services/auth.service';

export function ContentLayout({ children }: PropsWithChildren<unknown>) {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	useEffect(() => {
		authService.initialAuth()
	}, [])

	return (
		<div
			className={clsx(
				'flex min-h-screen',
				styles.initialSidebar,
				isSidebarOpen ? styles.showedSidebar : styles.hideSidebar,
			)}
		>
			<Sidebar toggleSidebar={toggleSidebar} />
			<Content>{children}</Content>
		</div>
	);
}
