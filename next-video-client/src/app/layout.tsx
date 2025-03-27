import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

import { Providers } from '@/providers/Providers';

const openSans = Open_Sans({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		absolute: '>ideo',
		template: `%s | >ideo`,
	},
	description: 'Video viewing platform',
	metadataBase: new URL('http://localhost:3000/')
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${openSans.className} antialiased`}>
				<Providers>
				{children}
				</Providers>
			</body>
		</html>
	);
}
